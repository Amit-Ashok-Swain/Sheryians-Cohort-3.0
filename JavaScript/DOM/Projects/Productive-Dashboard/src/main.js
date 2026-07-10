import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    activeView: "dashboard",
    todos: JSON.parse(localStorage.getItem("ops_todos")) || [],
    planner: JSON.parse(localStorage.getItem("ops_planner")) || {},
    goals: JSON.parse(localStorage.getItem("ops_goals")) || [],
    theme: localStorage.getItem("ops_theme") || "dark",
    todoFilter: "all",
    todoNextStarred: false,
  };

  // Sound Synth Core Engine (Low-latency Audio Feedback Pipeline)
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  function playNotificationSound(
    freq = 523.25,
    waveForm = "sine",
    duration = 0.25,
  ) {
    try {
      if (audioContext.state === "suspended") audioContext.resume();
      const osc = audioContext.createOscillator();
      const envelope = audioContext.createGain();
      osc.type = waveForm;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      envelope.gain.setValueAtTime(0.1, audioContext.currentTime);
      envelope.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration,
      );
      osc.connect(envelope);
      envelope.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (err) {
      console.warn(
        "Audio feedback context blocked until first hardware interaction gesture.",
      );
    }
  }

  // Pomodoro Performance Timer Constraints
  let pomoInterval = null;
  const TIME_WORK = 25 * 60;
  const TIME_BREAK = 5 * 60;
  let pomoSecondsRemaining = TIME_WORK;
  let pomoActiveSession = "work";

  const DOM = {
    dashboard: document.getElementById("dashboard-view"),
    featureContainer: document.getElementById("feature-container"),
    backToDashboardBtn: document.getElementById("back-to-dashboard"),
    sidebarLinks: document.querySelectorAll(".floating-sidebar [data-target]"),
    cards: document.querySelectorAll("#dashboard-view [data-target]"),
    views: document.querySelectorAll(".feature-view"),
    themeToggle: document.getElementById("theme-toggle"),
    appBg: document.getElementById("app-bg"),

    // Chronicle Top Widgets
    liveTime: document.getElementById("live-time"),
    liveDate: document.getElementById("live-date"),

    // Weather Metrics
    dashWeatherIcon: document.getElementById("dash-weather-icon"),
    dashWeatherTemp: document.getElementById("dash-weather-temp"),
    dashWeatherDesc: document.getElementById("dash-weather-desc"),
    expandedWeatherIcon: document.getElementById("expanded-weather-icon"),
    expandedWeatherTemp: document.getElementById("expanded-weather-temp"),
    expandedWeatherDesc: document.getElementById("expanded-weather-desc"),
    weatherDetailWind: document.getElementById("weather-detail-wind"),
    weatherDetailLat: document.getElementById("weather-detail-lat"),
    weatherDetailLon: document.getElementById("weather-detail-lon"),

    // Task Elements
    todoForm: document.getElementById("todo-form"),
    todoInput: document.getElementById("todo-input"),
    todoStarToggle: document.getElementById("todo-star-toggle"),
    todoList: document.getElementById("todo-list"),
    filterAll: document.getElementById("todo-filter-all"),
    filterActive: document.getElementById("todo-filter-active"),
    filterStarred: document.getElementById("todo-filter-starred"),

    // Timeline Planner Elements
    plannerSlots: document.getElementById("planner-slots"),
    plannerClearAll: document.getElementById("planner-clear-all"),

    // Progress Metrics Elements
    goalsForm: document.getElementById("goals-form"),
    goalsInput: document.getElementById("goals-input"),
    goalsList: document.getElementById("goals-list"),
    goalsProgress: document.getElementById("goals-progress"),
    goalsProgressBar: document.getElementById("goals-progress-bar"),

    // Pomodoro Timer Elements
    pomoStatus: document.getElementById("pomo-status"),
    pomoDisplay: document.getElementById("pomo-display"),
    pomoProgressRing: document.getElementById("pomo-progress-ring"),
    pomoStart: document.getElementById("pomo-start"),
    pomoPause: document.getElementById("pomo-pause"),
    pomoReset: document.getElementById("pomo-reset"),

    // Motivation Philosophy Elements
    quoteText: document.getElementById("quote-text"),
    quoteAuthor: document.getElementById("quote-author"),
    quoteRefresh: document.getElementById("quote-refresh"),
    quoteLoading: document.getElementById("quote-loading"),
  };

  function switchWorkspaceView(targetRoute) {
    if (targetRoute === "dashboard") {
      DOM.featureContainer.style.transition =
        "opacity 0.2s ease-out, transform 0.2s ease-out";
      DOM.featureContainer.style.opacity = "0";
      DOM.featureContainer.style.transform = "scale(0.97)";

      setTimeout(() => {
        DOM.featureContainer.classList.add("hidden");
        DOM.dashboard.classList.remove("hidden");
        setTimeout(() => {
          DOM.dashboard.style.opacity = "1";
        }, 20);
      }, 200);
      state.activeView = "dashboard";
    } else {
      DOM.dashboard.style.opacity = "0";
      setTimeout(() => {
        DOM.dashboard.classList.add("hidden");
        DOM.views.forEach((v) => v.classList.add("hidden"));

        const targetPanel = document.getElementById(`view-${targetRoute}`);
        if (targetPanel) {
          targetPanel.classList.remove("hidden");
          DOM.featureContainer.classList.remove("hidden");
          setTimeout(() => {
            DOM.featureContainer.style.transition =
              "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
            DOM.featureContainer.style.opacity = "1";
            DOM.featureContainer.style.transform = "scale(1)";
          }, 20);
          state.activeView = targetRoute;
        }
      }, 180);
    }
  }

  [...DOM.cards, ...DOM.sidebarLinks].forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const route = trigger.getAttribute("data-target");
      if (route) switchWorkspaceView(route);
    });
  });

  DOM.backToDashboardBtn.addEventListener("click", () =>
    switchWorkspaceView("dashboard"),
  );
  DOM.dashboard.style.transition = "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
  setTimeout(() => {
    DOM.dashboard.style.opacity = "1";
  }, 40);

  function commitThemeChange(assignedTheme) {
    if (assignedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("ops_theme", assignedTheme);
  }

  DOM.themeToggle.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    commitThemeChange(next);
  });
  commitThemeChange(state.theme);

  function processChronographTick() {
    const dateInstance = new Date();
    DOM.liveTime.textContent = dateInstance.toTimeString().split(" ")[0];
    DOM.liveDate.textContent = dateInstance.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Dynamic Sun asset vs Night Moon asset mapping boundary rules
    const currentHour = dateInstance.getHours();
    let imageSource = "";

    if (currentHour >= 5 && currentHour < 18) {
      // Dynamic Day Sun Panoramic Photo
      imageSource =
        "url('https://images.unsplash.com/photo-1444333509402-a2ccd433900f?auto=format&fit=crop&w=1600&q=80')";
    } else {
      // Dynamic Night Moon Panoramic Photo
      imageSource =
        "url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80')";
    }

    if (DOM.appBg.style.backgroundImage !== imageSource) {
      DOM.appBg.style.backgroundImage = imageSource;
    }
  }
  setInterval(processChronographTick, 1000);
  processChronographTick();

  function pullCurrentMeteorologicalData() {
    if (!navigator.geolocation) {
      updateWeatherUIFault("Unsupported Browser Engine");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const apiResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
          );
          if (!apiResponse.ok) throw new Error();

          const file = await apiResponse.json();
          const data = file.current_weather;

          const tempString = `${Math.round(data.temperature)}°C`;
          const windString = `${data.windspeed} km/h`;

          let conditionIcon = "☁️";
          let conditionDesc = "Overcast Clouds";

          const code = data.weathercode;
          if (code === 0) {
            conditionIcon = "☀️";
            conditionDesc = "Clear Blue Skies";
          } else if (code >= 1 && code <= 3) {
            conditionIcon = "⛅";
            conditionDesc = "Partly Cloudy";
          } else if (code >= 51 && code <= 67) {
            conditionIcon = "🌧️";
            conditionDesc = "Precipitation Rain";
          }

          // Update Dashboard Widget
          DOM.dashWeatherIcon.textContent = conditionIcon;
          DOM.dashWeatherTemp.textContent = tempString;
          DOM.dashWeatherDesc.textContent = conditionDesc;

          // Update Dedicated Focus Screen Monitor Panel Content
          DOM.expandedWeatherIcon.textContent = conditionIcon;
          DOM.expandedWeatherTemp.textContent = tempString;
          DOM.expandedWeatherDesc.textContent = conditionDesc;
          DOM.weatherDetailWind.textContent = windString;
          DOM.weatherDetailLat.textContent = latitude.toFixed(4);
          DOM.weatherDetailLon.textContent = longitude.toFixed(4);
        } catch (err) {
          updateWeatherUIFault("Server Timeout");
        }
      },
      () => {
        updateWeatherUIFault("Access Denied");
      },
      { timeout: 7000 },
    );
  }

  function updateWeatherUIFault(reason) {
    DOM.dashWeatherTemp.textContent = "Offline";
    DOM.dashWeatherDesc.textContent = reason;
    DOM.dashWeatherIcon.textContent = "⚠️";
    DOM.expandedWeatherTemp.textContent = "Offline";
    DOM.expandedWeatherDesc.textContent = reason;
    DOM.expandedWeatherIcon.textContent = "⚠️";
  }
  pullCurrentMeteorologicalData();

  function commitTasksToCache() {
    localStorage.setItem("ops_todos", JSON.stringify(state.todos));
  }

  DOM.todoStarToggle.addEventListener("click", () => {
    state.todoNextStarred = !state.todoNextStarred;
    DOM.todoStarToggle.style.opacity = state.todoNextStarred ? "1" : "0.3";
  });

  function renderTodoContainerList() {
    DOM.todoList.innerHTML = "";
    const renderingArray = state.todos.filter((todo) => {
      if (state.todoFilter === "active") return !todo.completed;
      if (state.todoFilter === "starred") return todo.starred;
      return true;
    });

    if (!renderingArray.length) {
      DOM.todoList.innerHTML = `<p class="text-center py-6 text-sm opacity-40 italic font-semibold">No tasks found matching filter choice.</p>`;
      return;
    }

    renderingArray.forEach((task) => {
      const liNode = document.createElement("li");
      liNode.className = `group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all duration-200 ${task.completed ? "opacity-40" : ""}`;
      liNode.innerHTML = `
        <div class="flex items-center gap-4 flex-grow truncate">
          <button data-id="${task.id}" data-action="toggle" class="w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${task.completed ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 dark:border-slate-700 hover:border-indigo-500"}">
            ${task.completed ? "✓" : ""}
          </button>
          <span class="text-sm font-semibold tracking-tight truncate ${task.completed ? "line-through text-slate-400 dark:text-slate-600" : ""} ${task.starred && !task.completed ? "text-indigo-600 dark:text-indigo-400 font-black" : ""}">
            ${task.text}
          </span>
        </div>
        <div class="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity pl-2">
          <button data-id="${task.id}" data-action="star" class="p-2 text-sm ${task.starred ? "opacity-100" : "opacity-30"}">⭐</button>
          <button data-id="${task.id}" data-action="delete" class="p-2 text-sm text-red-500">❌</button>
        </div>
      `;
      DOM.todoList.appendChild(liNode);
    });
  }

  DOM.todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cleanStr = DOM.todoInput.value
      .trim()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    if (!cleanStr) return;

    state.todos.push({
      id: "task_id_" + Date.now(),
      text: cleanStr,
      completed: false,
      starred: state.todoNextStarred,
    });

    commitTasksToCache();
    renderTodoContainerList();
    DOM.todoInput.value = "";
    state.todoNextStarred = false;
    DOM.todoStarToggle.style.opacity = "0.3";
    playNotificationSound(440, "triangle", 0.15);
  });

  DOM.todoList.addEventListener("click", (e) => {
    const operationNodeButton = e.target.closest("button");
    if (!operationNodeButton) return;

    const id = operationNodeButton.getAttribute("data-id");
    const action = operationNodeButton.getAttribute("data-action");
    const referenceIndex = state.todos.findIndex((t) => t.id === id);
    if (referenceIndex === -1) return;

    if (action === "toggle") {
      state.todos[referenceIndex].completed =
        !state.todos[referenceIndex].completed;
      if (state.todos[referenceIndex].completed)
        playNotificationSound(587.33, "sine", 0.1);
    } else if (action === "star") {
      state.todos[referenceIndex].starred =
        !state.todos[referenceIndex].starred;
    } else if (action === "delete") {
      state.todos.splice(referenceIndex, 1);
    }
    commitTasksToCache();
    renderTodoContainerList();
  });

  const wireFilterAction = (elementNode, scope) => {
    elementNode.addEventListener("click", (e) => {
      [DOM.filterAll, DOM.filterActive, DOM.filterStarred].forEach(
        (b) => (b.className = "px-3 py-1.5 rounded-lg text-slate-500"),
      );
      e.target.className =
        "px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400";
      state.todoFilter = scope;
      renderTodoContainerList();
    });
  };
  wireFilterAction(DOM.filterAll, "all");
  wireFilterAction(DOM.filterActive, "active");
  wireFilterAction(DOM.filterStarred, "starred");
  renderTodoContainerList();

  function generateAgendaTimelineSlots() {
    DOM.plannerSlots.innerHTML = "";
    for (let indexHour = 7; indexHour <= 21; indexHour++) {
      const clockLabel =
        indexHour > 12
          ? `${indexHour - 12} PM`
          : indexHour === 12
            ? "12 PM"
            : `${indexHour} AM`;
      const arraySlotIndexKey = `slot_index_${indexHour}`;
      const cacheValueStr = state.planner[arraySlotIndexKey] || "";

      const timelineRowBlock = document.createElement("div");
      timelineRowBlock.className =
        "flex items-center gap-4 p-2 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all duration-300";
      timelineRowBlock.innerHTML = `
        <span class="w-16 text-right text-xs font-black tracking-tight text-slate-400 select-none">${clockLabel}</span>
        <input type="text" data-key="${arraySlotIndexKey}" value="${cacheValueStr}" placeholder="No commitments established..." class="timeline-slot-input flex-grow p-2.5 text-sm bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none transition-all">
      `;
      DOM.plannerSlots.appendChild(timelineRowBlock);
    }

    document.querySelectorAll(".timeline-slot-input").forEach((input) => {
      input.addEventListener("blur", () => {
        const structuralKey = input.getAttribute("data-key");
        const refinedString = input.value
          .trim()
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        if (refinedString) {
          state.planner[structuralKey] = refinedString;
        } else {
          delete state.planner[structuralKey];
        }
        localStorage.setItem("ops_planner", JSON.stringify(state.planner));
      });
    });
  }

  DOM.plannerClearAll.addEventListener("click", () => {
    if (confirm("Reset layout timelines?")) {
      state.planner = {};
      localStorage.setItem("ops_planner", JSON.stringify(state.planner));
      generateAgendaTimelineSlots();
    }
  });
  generateAgendaTimelineSlots();

  function commitGoalsToDisk() {
    localStorage.setItem("ops_goals", JSON.stringify(state.goals));
  }

  function renderPerformanceMetricsView() {
    DOM.goalsList.innerHTML = "";
    let metricCompletedCounter = 0;

    state.goals.forEach((goal) => {
      if (goal.completed) metricCompletedCounter++;
      const itemElementLi = document.createElement("li");
      itemElementLi.className =
        "flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 group transition-all duration-300";
      itemElementLi.innerHTML = `
        <div class="flex items-center gap-4 flex-grow truncate">
          <input type="checkbox" data-id="${goal.id}" ${goal.completed ? "checked" : ""} class="target-node-check w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer">
          <span class="text-sm font-semibold truncate ${goal.completed ? "line-through text-slate-400 dark:text-slate-600" : ""}">${goal.text}</span>
        </div>
        <button data-id="${goal.id}" class="target-node-remove opacity-0 group-hover:opacity-100 text-xs font-bold text-red-500 px-2 transition-opacity">❌</button>
      `;
      DOM.goalsList.appendChild(itemElementLi);
    });

    const aggregateLength = state.goals.length;
    DOM.goalsProgress.textContent = `${metricCompletedCounter} / ${aggregateLength} Completed`;
    DOM.goalsProgressBar.style.width = `${aggregateLength > 0 ? (metricCompletedCounter / aggregateLength) * 100 : 0}%`;
  }

  DOM.goalsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const verifiedValueText = DOM.goalsInput.value
      .trim()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    if (!verifiedValueText) return;

    state.goals.push({
      id: "goal_id_" + Date.now(),
      text: verifiedValueText,
      completed: false,
    });
    commitGoalsToDisk();
    renderPerformanceMetricsView();
    DOM.goalsInput.value = "";
    playNotificationSound(523.25, "sine", 0.12);
  });

  DOM.goalsList.addEventListener("click", (e) => {
    const targetNode = e.target;
    const identifierId = targetNode.getAttribute("data-id");
    if (!identifierId) return;
    const matchIndex = state.goals.findIndex((g) => g.id === identifierId);
    if (matchIndex === -1) return;

    if (targetNode.classList.contains("target-node-check")) {
      state.goals[matchIndex].completed = targetNode.checked;
      if (targetNode.checked) playNotificationSound(783.99, "sine", 0.15);
    } else if (targetNode.classList.contains("target-node-remove")) {
      state.goals.splice(matchIndex, 1);
    }
    commitGoalsToDisk();
    renderPerformanceMetricsView();
  });
  renderPerformanceMetricsView();

  function paintPomodoroCanvas() {
    const operationalMinutes = Math.floor(pomoSecondsRemaining / 60);
    const operationalSeconds = pomoSecondsRemaining % 60;
    DOM.pomoDisplay.textContent = `${operationalMinutes.toString().padStart(2, "0")}:${operationalSeconds.toString().padStart(2, "0")}`;

    const operationalSessionCeiling =
      pomoActiveSession === "work" ? TIME_WORK : TIME_BREAK;
    DOM.pomoProgressRing.style.strokeDashoffset =
      276.46 *
      ((operationalSessionCeiling - pomoSecondsRemaining) /
        operationalSessionCeiling);
  }

  function triggerPomoCountdownLoop() {
    if (pomoInterval) return;
    pomoInterval = setInterval(() => {
      if (pomoSecondsRemaining > 0) {
        pomoSecondsRemaining--;
        paintPomodoroCanvas();
      } else {
        clearInterval(pomoInterval);
        pomoInterval = null;

        if (pomoActiveSession === "work") {
          playNotificationSound(880, "sawtooth", 0.5);
          pomoActiveSession = "break";
          pomoSecondsRemaining = TIME_BREAK;
          DOM.pomoStatus.textContent = "Break Rest Interval Active";
          DOM.pomoStatus.className =
            "uppercase tracking-widest text-xs font-black text-emerald-600 bg-emerald-500/10 dark:bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20";
          DOM.pomoProgressRing.classList.replace(
            "stroke-rose-500",
            "stroke-emerald-500",
          );
        } else {
          playNotificationSound(659.25, "sine", 0.5);
          pomoActiveSession = "work";
          pomoSecondsRemaining = TIME_WORK;
          DOM.pomoStatus.textContent = "Deep Focus Engine Active";
          DOM.pomoStatus.className =
            "uppercase tracking-widest text-xs font-black text-rose-600 bg-rose-500/10 dark:bg-rose-500/20 px-4 py-2 rounded-full border border-rose-500/20";
          DOM.pomoProgressRing.classList.replace(
            "stroke-emerald-500",
            "stroke-rose-500",
          );
        }
        paintPomodoroCanvas();
        triggerPomoCountdownLoop();
      }
    }, 1000);
  }

  DOM.pomoStart.addEventListener("click", triggerPomoCountdownLoop);
  DOM.pomoPause.addEventListener("click", () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
  });
  DOM.pomoReset.addEventListener("click", () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
    pomoActiveSession = "work";
    pomoSecondsRemaining = TIME_WORK;
    DOM.pomoStatus.textContent = "Focus Block Idle";
    DOM.pomoProgressRing.classList.remove("stroke-emerald-500");
    DOM.pomoProgressRing.classList.add("stroke-rose-500");
    paintPomodoroCanvas();
  });
  paintPomodoroCanvas();

  async function streamMotivationalAxiomMetrics() {
    DOM.quoteLoading.classList.remove("hidden");
    DOM.quoteText.style.opacity = "0";
    DOM.quoteAuthor.style.opacity = "0";
    try {
      const fetchRequestResponse = await fetch(
        "https://dummyjson.com/quotes/random",
      );
      if (!fetchRequestResponse.ok) throw new Error();
      const parsedPayload = await fetchRequestResponse.json();

      DOM.quoteText.textContent = `"${parsedPayload.quote}"`;
      DOM.quoteAuthor.textContent = `— ${parsedPayload.author}`;
    } catch (e) {
      DOM.quoteText.textContent =
        '"Action creates clarity. Continuous production resolves logistical dilemmas."';
      DOM.quoteAuthor.textContent = "— System Workspace Metric Engine";
    } finally {
      DOM.quoteLoading.classList.add("hidden");
      DOM.quoteText.style.transition = "opacity 0.4s";
      DOM.quoteAuthor.style.transition = "opacity 0.4s";
      DOM.quoteText.style.opacity = "1";
      DOM.quoteAuthor.style.opacity = "0.6";
    }
  }
  DOM.quoteRefresh.addEventListener("click", streamMotivationalAxiomMetrics);
  streamMotivationalAxiomMetrics();
});
