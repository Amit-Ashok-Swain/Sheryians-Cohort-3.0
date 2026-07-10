const Storage = {
  save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  load: (key, def) => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : def;
    } catch (e) {
      return def;
    }
  },
};

const showToast = (msg) => {
  const t = document.getElementById("toast-container");
  const m = document.getElementById("toast-message").querySelector("span");
  if (t && m) {
    m.textContent = msg;
    t.classList.remove("toast-exit");
    t.classList.add("toast-enter");
    setTimeout(() => {
      t.classList.remove("toast-enter");
      t.classList.add("toast-exit");
    }, 3000);
  }
};

const FocusAudio = (() => {
  let synth, reverb, loop;
  let isPlaying = false;
  const notes = ["C4", "D4", "E4", "G4", "A4", "C5"];

  const initAudio = () => {
    if (synth) return;
    try {
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 2, decay: 1, sustain: 0.8, release: 4 },
      });
      reverb = new Tone.Reverb({ decay: 8, wet: 0.6 });
      const filter = new Tone.Filter(1000, "lowpass");
      synth.chain(filter, reverb, Tone.Destination);

      loop = new Tone.Loop((time) => {
        const note1 = notes[Math.floor(Math.random() * notes.length)];
        const note2 = notes[Math.floor(Math.random() * notes.length)];
        synth.triggerAttackRelease([note1, note2], "2n", time, 0.15);
      }, "2m").start(0);

      Tone.Transport.bpm.value = 60;
    } catch (e) {
      console.error("Tone Audio init failed:", e);
    }
  };

  const toggle = async () => {
    try {
      if (!synth) initAudio();
      await Tone.start();
      if (isPlaying) {
        Tone.Transport.stop();
        isPlaying = false;
      } else {
        Tone.Transport.start();
        isPlaying = true;
      }
      return isPlaying;
    } catch (e) {
      console.error("Audio failed to start:", e);
      return false;
    }
  };
  return { toggle, isPlaying: () => isPlaying };
})();

const ThreeBG = (() => {
  let scene, camera, renderer;
  let stars,
    sun,
    planets = [];
  let mouseX = 0,
    mouseY = 0;
  let currentColor = new THREE.Color(0x818cf8);
  let targetColor = new THREE.Color(0x818cf8);

  const init = () => {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.z = 300;
    camera.position.y = 100;
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0x222222));

    const sunGeo = new THREE.SphereGeometry(15, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffaa00, 2, 800);
    scene.add(sunLight);

    const createPlanet = (radius, dist, speed, color, hasRing) => {
      const geo = new THREE.SphereGeometry(radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.7,
        metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      if (hasRing) {
        const ringGeo = new THREE.RingGeometry(radius * 1.4, radius * 2.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + 0.2;
        mesh.add(ring);
      }
      planets.push({ mesh, dist, speed, angle: Math.random() * Math.PI * 2 });
    };

    createPlanet(3, 40, 0.005, 0x4f46e5, false); // Inner
    createPlanet(6, 80, 0.003, 0xf59e0b, true); // Ringed
    createPlanet(4, 120, 0.002, 0xef4444, false); // Red
    createPlanet(8, 180, 0.001, 0x06b6d4, false); // Outer Ice

    const bgGeo = new THREE.BufferGeometry();
    const bgVerts = [];
    for (let i = 0; i < 4000; i++) {
      bgVerts.push(
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000),
      );
    }
    bgGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(bgVerts, 3),
    );
    const bgMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.8,
    });
    stars = new THREE.Points(bgGeo, bgMat);
    scene.add(stars);

    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.1;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
    });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    sun.rotation.y += 0.005;
    planets.forEach((p) => {
      p.angle += p.speed;
      p.mesh.position.x = Math.cos(p.angle) * p.dist;
      p.mesh.position.z = Math.sin(p.angle) * p.dist;
      p.mesh.rotation.y += 0.01;
    });
    stars.rotation.y += 0.0002;
    currentColor.lerp(targetColor, 0.02);
    sun.material.color.copy(currentColor);
    scene.children[1].color.copy(currentColor);
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (100 - mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  const updateColor = (hexColor) => {
    if (scene) targetColor.setHex(hexColor);
  };
  return { init, updateColor };
})();

const Confetti = (() => {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return { fire: () => {} };
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const fire = () => {
    particles = [];
    const colors = ["#10b981", "#34d399", "#6ee7b7", "#fbbf24", "#f59e0b"];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height,
        r: Math.random() * 6 + 2,
        dx: Math.random() * 10 - 5,
        dy: Math.random() * -15 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }
    if (animationId) cancelAnimationFrame(animationId);
    animate();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleInc;
      p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
      p.x += Math.sin(p.tiltAngle) * 2;
      p.dy += 0.1;
      p.y += p.dy;
      if (p.y <= canvas.height) active = true;
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      ctx.stroke();
    });
    if (active) animationId = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  return { fire };
})();

const AppUI = (() => {
  const themeToggle = document.getElementById("theme-toggle");
  let isDark = Storage.load("isDark", true);

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", isDark);
    updateEnvironment();
  };

  const updateEnvironment = () => {
    const hr = new Date().getHours();
    let sunColor = 0x818cf8;
    if (hr >= 5 && hr < 12) sunColor = 0xfacc15;
    else if (hr >= 12 && hr < 17) sunColor = 0xffffff;
    else if (hr >= 17 && hr < 20) sunColor = 0xf43f5e;
    else sunColor = 0x818cf8;
    ThreeBG.updateColor(sunColor);
  };

  const updateClock = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const clockWidget = document.getElementById("clock-widget");
    if (clockWidget) clockWidget.textContent = timeStr;

    const clockHeader = document.getElementById("clock-widget-header");
    if (clockHeader) clockHeader.textContent = timeStr;
  };

  return {
    init: () => {
      applyTheme();
      updateClock();
      setInterval(updateClock, 1000);
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          isDark = !isDark;
          Storage.save("isDark", isDark);
          applyTheme();
        });
      }
    },
  };
})();

const Router = (() => {
  const hub = document.getElementById("dashboard-hub");
  const views = document.querySelectorAll(".feature-view");
  const triggers = document.querySelectorAll("[data-target]");
  const backBtns = document.querySelectorAll(".back-btn");
  const navBtn = document.getElementById("nav-hub-btn");

  const hideAll = () => {
    views.forEach((v) => {
      v.classList.add("hidden");
      v.classList.remove("opacity-100", "scale-100");
      v.classList.add("opacity-0", "scale-95");
    });
    if (hub) hub.classList.add("hidden");
  };

  const showView = (id) => {
    hideAll();
    const v = document.getElementById(id);
    if (v) {
      v.classList.remove("hidden");
      setTimeout(() => {
        v.classList.remove("opacity-0", "scale-95");
        v.classList.add("opacity-100", "scale-100");
      }, 10);
    }
  };

  const showHub = () => {
    hideAll();
    if (hub) {
      hub.classList.remove("hidden");
      setTimeout(() => {
        hub.classList.remove("opacity-0");
        if (window.Todo) Todo.updatePreview();
        if (window.Goals) Goals.updatePreview();
        if (window.Calendar) Calendar.updatePreview();
      }, 10);
    }
  };

  return {
    init: () => {
      triggers.forEach((t) =>
        t.addEventListener("click", () => showView(t.dataset.target)),
      );
      backBtns.forEach((b) => b.addEventListener("click", showHub));
      if (navBtn) navBtn.addEventListener("click", showHub);
    },
    showHub,
  };
})();

const Todo = (() => {
  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("todo-add-btn");
  const clearBtn = document.getElementById("todo-clear-btn");
  const list = document.getElementById("todo-list");
  const statsFull = document.getElementById("todo-stats-full");
  const barFull = document.getElementById("todo-progress-bar");

  const previewList = document.getElementById("todo-preview-list");
  const previewStats = document.getElementById("todo-preview-stats");
  const previewBar = document.getElementById("todo-preview-bar");

  let tasks = Storage.load("todos", []);
  if (!Array.isArray(tasks)) tasks = [];

  const updateProgressAndPreview = () => {
    const comp = tasks.filter((t) => t.completed).length;
    const pct = tasks.length ? Math.round((comp / tasks.length) * 100) : 0;

    if (barFull) barFull.style.width = `${pct}%`;
    if (statsFull) statsFull.textContent = `${pct}%`;

    if (previewBar) previewBar.style.width = `${pct}%`;
    if (previewStats) previewStats.textContent = `${comp}/${tasks.length}`;

    if (previewList) {
      const pending = tasks
        .filter((t) => !t.completed)
        .sort((a, b) => b.important - a.important);
      let html = "";
      if (pending.length === 0) {
        html = `<div class="text-slate-400 italic text-sm">Inbox Zero! Great job.</div>`;
      } else {
        pending.slice(0, 3).forEach((t) => {
          html += `<div class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 min-w-0"><i class="ph-bold ph-circle text-brand-500 shrink-0"></i><span class="truncate ${t.important ? "font-bold text-amber-500" : ""}">${t.text}</span></div>`;
        });
        if (pending.length > 3)
          html += `<div class="text-xs text-slate-400 mt-1 font-bold">+${pending.length - 3} more items</div>`;
      }
      previewList.innerHTML = html;
    }
  };

  const render = () => {
    if (!list) return;
    list.innerHTML = "";
    if (tasks.length === 0) {
      list.innerHTML =
        '<div class="text-center py-10 text-slate-500 glass rounded-3xl"><p class="text-base sm:text-lg font-bold">Inbox Zero!</p></div>';
    }

    tasks
      .sort((a, b) => a.completed - b.completed || b.important - a.important)
      .forEach((t) => {
        const li = document.createElement("li");
        li.className = `flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all shadow-sm gap-2 ${t.completed ? "bg-slate-100/50 dark:bg-slate-800/30 opacity-60" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"} ${t.important && !t.completed ? "border-l-4 border-l-amber-400" : ""}`;

        li.innerHTML = `
        <div class="flex items-center gap-3 sm:gap-4 flex-grow overflow-hidden cursor-pointer toggle-cb-wrap" data-id="${t.id}">
          <button class="toggle-cb w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${t.completed ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300 dark:border-slate-600"}" data-id="${t.id}">
            ${t.completed ? '<i class="ph-bold ph-check text-xs sm:text-sm"></i>' : ""}
          </button>
          <span class="text-base sm:text-lg min-w-0 break-words whitespace-normal transition-all ${t.completed ? "line-through text-slate-500" : "text-slate-800 dark:text-white"} ${t.important && !t.completed ? "font-bold text-amber-500" : "font-medium"}">${t.text}</span>
        </div>
        <div class="flex gap-1 ml-2 shrink-0">
          <button class="important-btn p-1.5 sm:p-2 rounded-xl transition-all ${t.important ? "text-amber-500 bg-amber-50 dark:bg-amber-900/30" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}" data-id="${t.id}"><i class="${t.important ? "ph-fill" : "ph"} ph-star text-lg sm:text-xl"></i></button>
          <button class="delete-btn p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-red-500 transition-all" data-id="${t.id}"><i class="ph-bold ph-trash"></i></button>
        </div>
      `;
        list.appendChild(li);
      });

    updateProgressAndPreview();
    Storage.save("todos", tasks);
  };

  const add = () => {
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    tasks.push({
      id: Date.now(),
      text: val,
      completed: false,
      important: false,
    });
    input.value = "";
    render();
  };

  return {
    init: () => {
      if (addBtn) addBtn.addEventListener("click", add);
      if (input)
        input.addEventListener("keypress", (e) => e.key === "Enter" && add());
      if (clearBtn)
        clearBtn.addEventListener("click", () => {
          tasks = tasks.filter((t) => !t.completed);
          render();
        });
      if (list) {
        list.addEventListener("click", (e) => {
          const btn = e.target.closest("button");
          const wrap = e.target.closest(".toggle-cb-wrap");
          if (btn) {
            const id = Number(btn.dataset.id);
            const task = tasks.find((t) => t.id === id);
            if (!task) return;
            if (btn.classList.contains("toggle-cb")) task.completed ^= true;
            else if (btn.classList.contains("important-btn"))
              task.important ^= true;
            else if (btn.classList.contains("delete-btn"))
              tasks = tasks.filter((t) => t.id !== id);
            render();
          } else if (wrap) {
            const task = tasks.find((t) => t.id === Number(wrap.dataset.id));
            if (task) task.completed ^= true;
            render();
          }
        });
      }
      render();
    },
    updatePreview: updateProgressAndPreview,
  };
})();

const Pomodoro = (() => {
  const display = document.getElementById("pomodoro-display");
  const startBtn = document.getElementById("pomodoro-start");
  const pauseBtn = document.getElementById("pomodoro-pause");
  const resetBtn = document.getElementById("pomodoro-reset");
  const label = document.getElementById("pomodoro-label");
  const ring = document.getElementById("pomodoro-ring");
  const modeWorkBtn = document.getElementById("mode-work");
  const modeBreakBtn = document.getElementById("mode-break");

  const settingsPanel = document.getElementById("pomodoro-settings");
  const openSettingsBtn = document.getElementById("open-settings-btn");
  const saveSettingsBtn = document.getElementById("save-settings-btn");
  const inputWork = document.getElementById("setting-work");
  const inputBreak = document.getElementById("setting-break");

  const audioBtn = document.getElementById("audio-toggle-btn");
  const audioStatus = document.querySelector(".audio-status");
  const audioIcon = document.querySelector(".audio-icon");
  const visualizer = document.getElementById("audio-visualizer-preview");

  const previewContent = document.getElementById("pomodoro-preview-content");

  const circumference = 2 * Math.PI * 130;
  let workMins = Storage.load("pomoWork", 25);
  let breakMins = Storage.load("pomoBreak", 5);

  let totalTime = workMins * 60;
  let timeLeft = totalTime;
  let interval = null;
  let isWork = true;

  const format = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  const updatePreview = () => {
    if (previewContent) {
      const colorClass = isWork ? "text-brand-500" : "text-emerald-500";
      previewContent.innerHTML = `
            <svg class="absolute inset-0 w-full h-full -z-10 opacity-20 p-2" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="4" class="${colorClass}"></circle>
            </svg>
            <div class="text-3xl sm:text-4xl font-mono font-black ${colorClass} drop-shadow-sm">${format(timeLeft)}</div>
         `;
    }
  };

  const updateUI = () => {
    if (display) display.textContent = format(timeLeft);
    if (ring) {
      const offset = circumference - (timeLeft / totalTime) * circumference;
      ring.style.strokeDashoffset = offset;
    }
    updatePreview();
  };

  const setMode = (workMode) => {
    isWork = workMode;
    totalTime = isWork ? workMins * 60 : breakMins * 60;
    timeLeft = totalTime;
    if (label) label.textContent = isWork ? "Focus" : "Break";

    if (modeWorkBtn && modeBreakBtn && ring) {
      if (isWork) {
        modeWorkBtn.className =
          "flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-brand-500 text-white shadow-md font-bold transition-all truncate";
        modeBreakBtn.className =
          "flex-1 sm:flex-none px-6 py-2.5 rounded-full text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 font-bold transition-all cursor-pointer truncate";
        ring.classList.replace("text-emerald-500", "text-brand-500");
      } else {
        modeBreakBtn.className =
          "flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-emerald-500 text-white shadow-md font-bold transition-all truncate";
        modeWorkBtn.className =
          "flex-1 sm:flex-none px-6 py-2.5 rounded-full text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 font-bold transition-all cursor-pointer truncate";
        ring.classList.replace("text-brand-500", "text-emerald-500");
      }
    }

    clearInterval(interval);
    interval = null;
    if (startBtn && pauseBtn) {
      startBtn.classList.remove("hidden");
      pauseBtn.classList.add("hidden");
    }
    updateUI();
  };

  const tick = () => {
    timeLeft--;
    updateUI();
    if (timeLeft <= 0) {
      clearInterval(interval);
      interval = null;
      if (startBtn && pauseBtn) {
        startBtn.classList.remove("hidden");
        pauseBtn.classList.add("hidden");
      }
      showToast(
        isWork
          ? "Session complete! Take a break."
          : "Break over! Back to focus.",
      );
      setMode(!isWork);
    }
  };

  return {
    init: () => {
      if (inputWork) inputWork.value = workMins;
      if (inputBreak) inputBreak.value = breakMins;
      if (ring) ring.style.strokeDasharray = circumference;
      updateUI();

      if (startBtn && pauseBtn) {
        startBtn.addEventListener("click", () => {
          interval = setInterval(tick, 1000);
          startBtn.classList.add("hidden");
          pauseBtn.classList.remove("hidden");
        });

        pauseBtn.addEventListener("click", () => {
          clearInterval(interval);
          interval = null;
          startBtn.classList.remove("hidden");
          pauseBtn.classList.add("hidden");
        });
      }

      if (resetBtn) resetBtn.addEventListener("click", () => setMode(isWork));
      if (modeWorkBtn)
        modeWorkBtn.addEventListener("click", () => setMode(true));
      if (modeBreakBtn)
        modeBreakBtn.addEventListener("click", () => setMode(false));

      if (openSettingsBtn && settingsPanel) {
        openSettingsBtn.addEventListener("click", () => {
          settingsPanel.classList.remove("hidden");
          setTimeout(() => settingsPanel.classList.remove("opacity-0"), 10);
        });
      }

      if (saveSettingsBtn && settingsPanel) {
        saveSettingsBtn.addEventListener("click", () => {
          workMins = Math.max(1, parseInt(inputWork.value) || 25);
          breakMins = Math.max(1, parseInt(inputBreak.value) || 5);
          Storage.save("pomoWork", workMins);
          Storage.save("pomoBreak", breakMins);
          settingsPanel.classList.add("opacity-0");
          setTimeout(() => settingsPanel.classList.add("hidden"), 300);
          setMode(isWork);
        });
      }

      if (audioBtn && audioStatus && audioIcon) {
        audioBtn.addEventListener("click", async () => {
          const playing = await FocusAudio.toggle();
          if (playing) {
            audioStatus.textContent = "On";
            audioIcon.classList.add("text-brand-500");
            if (visualizer) visualizer.classList.remove("hidden");
          } else {
            audioStatus.textContent = "Off";
            audioIcon.classList.remove("text-brand-500");
            if (visualizer) visualizer.classList.add("hidden");
          }
        });
      }
    },
    updatePreview,
  };
})();

const Planner = (() => {
  const container = document.getElementById("planner-container");
  const indicator = document.getElementById("timeline-indicator");
  const previewContent = document.getElementById("planner-preview-content");
  let plans = Storage.load("planner", {});
  if (typeof plans !== "object" || plans === null) plans = {};

  const formatHr = (h) => `${h % 12 || 12}:00 ${h >= 12 ? "PM" : "AM"}`;

  const updateTimelineAndPreview = () => {
    const now = new Date();
    const currentHr = now.getHours();

    if (indicator) {
      if (currentHr >= 6 && currentHr <= 22) {
        indicator.style.display = "block";
        const activeInput = document.querySelector(
          `.planner-input[data-hr="${currentHr}"]`,
        );
        if (activeInput) {
          const slotWrapper = activeInput.closest(".flex");
          if (slotWrapper) {
            const topPos =
              slotWrapper.offsetTop +
              (now.getMinutes() / 60) * slotWrapper.offsetHeight;
            indicator.style.top = `${topPos}px`;
          }
        }
      } else {
        indicator.style.display = "none";
      }
    }

    if (previewContent) {
      const currPlan = plans[currentHr];
      const nextPlan = plans[currentHr + 1];

      let html = "";
      if (currPlan) {
        html += `
            <div class="min-w-0">
              <div class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> NOW</div>
              <div class="text-sm font-semibold truncate w-full">${currPlan}</div>
            </div>`;
      }
      if (nextPlan) {
        html += `
            <div class="min-w-0 ${currPlan ? "opacity-60" : ""}">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">UP NEXT</div>
              <div class="text-sm font-semibold truncate w-full">${nextPlan}</div>
            </div>`;
      }

      if (!currPlan && !nextPlan) {
        html = `
            <div class="my-auto min-w-0">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">STATUS</div>
              <div class="text-sm font-semibold italic text-slate-500">Free time block</div>
            </div>`;
      }

      previewContent.innerHTML = html;
    }
  };

  const render = () => {
    if (!container) return;
    const currentHr = new Date().getHours();
    container.innerHTML = "";

    for (let i = 6; i <= 22; i++) {
      const isPast = i < currentHr;
      const isCurr = i === currentHr;

      const slot = document.createElement("div");
      slot.className = `flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all shadow-sm ${
        isCurr
          ? "bg-amber-50/80 dark:bg-amber-900/30 border border-amber-400 transform scale-[1.02] z-10"
          : isPast
            ? "opacity-40 bg-white/20 dark:bg-slate-800/20 grayscale-[50%]"
            : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
      }`;

      slot.innerHTML = `
        <div class="flex items-center sm:w-28 shrink-0 font-bold ${isCurr ? "text-amber-600 dark:text-amber-400 text-lg" : "text-slate-500"}">
          ${isCurr ? '<i class="ph-fill ph-clock-countdown mr-2 animate-pulse"></i>' : ""} ${formatHr(i)}
        </div>
        <input type="text" data-hr="${i}" value="${plans[i] || ""}" placeholder="${isCurr ? "What are you doing right now?" : "Plan block..."}" class="planner-input flex-grow min-w-0 w-full bg-transparent border-none focus:ring-0 px-2 py-1 outline-none text-slate-800 dark:text-white font-medium ${isPast ? "line-through decoration-slate-400" : ""} placeholder-slate-400">
      `;
      container.appendChild(slot);
    }
    updateTimelineAndPreview();
  };

  return {
    init: () => {
      render();
      if (container) {
        container.addEventListener("change", (e) => {
          if (e.target.tagName === "INPUT") {
            const hr = e.target.dataset.hr;
            const val = e.target.value.trim();
            if (val) plans[hr] = val;
            else delete plans[hr];
            Storage.save("planner", plans);
            updateTimelineAndPreview();
          }
        });
      }
      setInterval(() => {
        render();
      }, 60000);
    },
  };
})();

const Goals = (() => {
  const list = document.getElementById("goals-list-full");
  const input = document.getElementById("goal-input");
  const btn = document.getElementById("goal-add-btn");
  const barFull = document.getElementById("goals-progress-bar-full");
  const textFull = document.getElementById("goals-progress-text-full");

  const previewFill = document.getElementById("goals-preview-fill");
  const previewPct = document.getElementById("goals-preview-pct");

  let goals = Storage.load("goals", []);
  if (!Array.isArray(goals)) goals = [];
  let confettiFired = false;

  const updateProgressAndPreview = () => {
    const comp = goals.filter((g) => g.completed).length;
    const pct = goals.length ? Math.round((comp / goals.length) * 100) : 0;

    if (barFull) barFull.style.width = `${pct}%`;
    if (textFull) textFull.textContent = `${pct}%`;
    if (previewFill) {
      previewFill.style.height = `${pct}%`;
      if (previewPct) previewPct.textContent = `${pct}%`;
    }

    if (pct === 100 && goals.length > 0) {
      if (!confettiFired) {
        Confetti.fire();
        showToast("Objective complete! 🎉");
        confettiFired = true;
      }
    } else {
      confettiFired = false;
    }
  };

  const render = () => {
    if (!list) return;
    list.innerHTML = "";
    if (goals.length === 0) {
      list.innerHTML =
        '<div class="text-center py-6 text-slate-500 italic border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">No milestones set.</div>';
    } else {
      goals.forEach((g) => {
        const li = document.createElement("li");
        li.className = `flex items-center justify-between p-4 sm:p-5 rounded-2xl transition-all cursor-pointer shadow-sm gap-2 ${
          g.completed
            ? "border border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
            : "border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 hover:border-emerald-300"
        }`;
        li.innerHTML = `
            <div class="flex items-center gap-3 sm:gap-4 flex-grow overflow-hidden goal-toggle" data-id="${g.id}">
              <div class="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${g.completed ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}">
                ${g.completed ? '<i class="ph-bold ph-check text-xs sm:text-base"></i>' : ""}
              </div>
              <span class="text-base sm:text-lg min-w-0 break-words whitespace-normal font-bold ${g.completed ? "text-emerald-700 dark:text-emerald-400 line-through opacity-70" : "text-slate-800 dark:text-white"}">${g.text}</span>
            </div>
            <button class="goal-del shrink-0 text-slate-400 hover:text-red-500 p-1.5 sm:p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" data-id="${g.id}"><i class="ph-bold ph-trash text-lg"></i></button>
          `;
        list.appendChild(li);
      });
    }
    updateProgressAndPreview();
    Storage.save("goals", goals);
  };

  const add = () => {
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    goals.push({ id: Date.now(), text: val, completed: false });
    input.value = "";
    render();
  };

  return {
    init: () => {
      if (btn) btn.addEventListener("click", add);
      if (input)
        input.addEventListener("keypress", (e) => e.key === "Enter" && add());
      if (list) {
        list.addEventListener("click", (e) => {
          const tg = e.target.closest(".goal-toggle");
          const del = e.target.closest(".goal-del");
          if (tg) {
            const targetGoal = goals.find((g) => g.id == tg.dataset.id);
            if (targetGoal) targetGoal.completed ^= true;
            render();
          }
          if (del) {
            goals = goals.filter((g) => g.id != del.dataset.id);
            render();
          }
        });
      }
      render();
    },
    updatePreview: updateProgressAndPreview,
  };
})();

const Calendar = (() => {
  const previewDate = document.getElementById("calendar-preview-date");
  const previewMini = document.getElementById("calendar-preview-mini");
  const grid = document.getElementById("calendar-grid");
  const monthYearLabel = document.getElementById("cal-month-year");
  const prevBtn = document.getElementById("cal-prev");
  const nextBtn = document.getElementById("cal-next");

  let navDate = new Date();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y, m) => new Date(y, m, 1).getDay();

  const renderPreview = () => {
    const today = new Date();
    if (previewDate) {
      const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
      const monthName = today.toLocaleDateString("en-US", { month: "short" });
      const dateNum = today.getDate();
      previewDate.innerHTML = `
          <div class="text-3xl md:text-4xl font-black text-rose-500 drop-shadow-sm leading-none">${dateNum}</div>
          <div class="text-lg md:text-xl font-bold tracking-wide">${dayName}</div>
          <div class="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest">${monthName} ${today.getFullYear()}</div>
       `;
    }

    if (previewMini) {
      const y = today.getFullYear();
      const m = today.getMonth();
      const days = getDaysInMonth(y, m);
      const firstDay = getFirstDay(y, m);

      let html = "";
      for (let i = 0; i < firstDay; i++) html += "<div></div>";
      for (let i = 1; i <= days; i++) {
        const isToday = i === today.getDate();
        html += `<div class="w-3 h-3 flex items-center justify-center rounded-sm ${isToday ? "bg-rose-500 text-white font-bold" : "text-slate-400 bg-slate-200/50 dark:bg-slate-700/50"}">${i}</div>`;
      }
      previewMini.innerHTML = html;
    }
  };

  const renderFull = () => {
    if (!grid || !monthYearLabel) return;

    const y = navDate.getFullYear();
    const m = navDate.getMonth();
    const today = new Date();

    monthYearLabel.textContent = navDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const days = getDaysInMonth(y, m);
    const firstDay = getFirstDay(y, m);

    let html = "";
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="aspect-square rounded-2xl bg-white/5 dark:bg-slate-800/10 border border-slate-100/50 dark:border-slate-700/20"></div>`;
    }

    for (let i = 1; i <= days; i++) {
      const isToday =
        i === today.getDate() &&
        m === today.getMonth() &&
        y === today.getFullYear();
      html += `
          <div class="aspect-square flex items-center justify-center rounded-xl sm:rounded-2xl transition-all font-bold text-sm sm:text-lg cursor-pointer ${
            isToday
              ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105 z-10"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md"
          }">${i}</div>
        `;
    }
    grid.innerHTML = html;
  };

  return {
    init: () => {
      renderPreview();
      renderFull();
      if (prevBtn)
        prevBtn.addEventListener("click", () => {
          navDate.setMonth(navDate.getMonth() - 1);
          renderFull();
        });
      if (nextBtn)
        nextBtn.addEventListener("click", () => {
          navDate.setMonth(navDate.getMonth() + 1);
          renderFull();
        });
    },
    updatePreview: renderPreview,
  };
})();

const Quotes = (() => {
  const flipCard = document.getElementById("quote-flip-card");
  const cFront = document.getElementById("quote-content-front");
  const aFront = document.getElementById("quote-author-front");
  const cBack = document.getElementById("quote-content-back");
  const aBack = document.getElementById("quote-author-back");
  const btn = document.getElementById("new-quote-btn");
  const previewContent = document.getElementById("quotes-preview-content");

  let currentQuoteText =
    "Focus on being productive instead of busy. - Tim Ferriss";
  let isFlipped = false;

  const fetchQuote = async () => {
    if (btn)
      btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i> Thinking...`;
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();
      currentQuoteText = `"${data.quote}" - ${data.author}`;

      if (isFlipped) {
        if (cFront) cFront.innerHTML = `"${data.quote}"`;
        if (aFront) aFront.textContent = `- ${data.author}`;
      } else {
        if (cBack) cBack.innerHTML = `"${data.quote}"`;
        if (aBack) aBack.textContent = `- ${data.author}`;
      }

      if (previewContent) {
        const div = previewContent.querySelector("div");
        const auth = previewContent.querySelector(".author-preview");
        if (div) div.textContent = `"${data.quote}"`;
        if (auth) auth.textContent = `- ${data.author}`;
      }

      isFlipped = !isFlipped;
      if (flipCard) {
        if (isFlipped) flipCard.classList.add("is-flipped");
        else flipCard.classList.remove("is-flipped");
      }
    } catch (e) {
      showToast("Using offline quote fallback.");
    } finally {
      if (btn)
        btn.innerHTML = `<i class="ph-bold ph-arrows-clockwise text-xl sm:text-2xl"></i> Inspire Me`;
    }
  };

  return {
    init: () => {
      if (cFront)
        cFront.innerHTML = `"Focus on being productive instead of busy."`;
      if (aFront) aFront.textContent = `- Tim Ferriss`;
      if (previewContent) {
        const div = previewContent.querySelector("div");
        const auth = previewContent.querySelector(".author-preview");
        if (div)
          div.textContent = `"Focus on being productive instead of busy."`;
        if (auth) auth.textContent = `- Tim Ferriss`;
      }
      setTimeout(fetchQuote, 1000);
      if (btn) btn.addEventListener("click", fetchQuote);

      const copyBtn = document.getElementById("quote-copy-btn");
      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          const temp = document.createElement("textarea");
          temp.value = currentQuoteText;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          showToast("Quote secured! ✨");
        });
      }
    },
  };
})();

const Weather = (() => {
  const card = document.getElementById("weather-card");
  const mini = document.getElementById("weather-mini");
  const previewText = document.getElementById("weather-preview-text");
  const previewIcon = document.getElementById("weather-preview-icon");

  const WMO = {
    0: { t: "Clear Sky", i: "ph-sun", c: "from-sky-400 to-blue-600" },
    1: { t: "Mostly Clear", i: "ph-sun-dim", c: "from-sky-400 to-blue-600" },
    2: {
      t: "Partly Cloudy",
      i: "ph-cloud-sun",
      c: "from-slate-400 to-slate-600",
    },
    3: { t: "Overcast", i: "ph-cloud", c: "from-slate-500 to-slate-700" },
    45: { t: "Foggy", i: "ph-cloud-fog", c: "from-slate-400 to-slate-500" },
    51: { t: "Drizzle", i: "ph-cloud-rain", c: "from-blue-400 to-slate-600" },
    61: { t: "Rain", i: "ph-cloud-rain", c: "from-blue-500 to-indigo-600" },
    71: { t: "Snow", i: "ph-snowflake", c: "from-cyan-300 to-blue-500" },
    95: {
      t: "Storm",
      i: "ph-cloud-lightning",
      c: "from-slate-800 to-indigo-950",
    },
  };

  const render = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
      );
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();

      let city = "Location";
      try {
        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          city = geoData?.city || geoData?.locality || "Location";
        }
      } catch (e) {}

      const c = data.current;
      const w = WMO[c.weather_code] || WMO[0];

      let forecastHTML = "";
      for (let i = 1; i <= 3; i++) {
        const date = new Date(data.daily.time[i]).toLocaleDateString("en-US", {
          weekday: "short",
        });
        const fw = WMO[data.daily.weather_code[i]] || WMO[0];
        forecastHTML += `
              <div class="flex flex-col items-center bg-black/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md w-full border border-white/10 overflow-hidden min-w-0">
                  <span class="text-[10px] sm:text-sm font-bold mb-1 sm:mb-2 uppercase tracking-widest text-slate-200 truncate w-full text-center">${date}</span>
                  <i class="ph-fill ${fw.i} text-3xl sm:text-4xl mb-1 sm:mb-2 drop-shadow-md"></i>
                  <div class="text-sm sm:text-base font-bold">${Math.round(data.daily.temperature_2m_max[i])}° <span class="opacity-50 text-xs">${Math.round(data.daily.temperature_2m_min[i])}°</span></div>
              </div>
          `;
      }

      if (card) {
        card.className = `flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-br ${w.c} rounded-[2.5rem] text-white shadow-3d min-h-[400px] sm:min-h-[450px] w-full relative overflow-hidden transition-all border border-white/20`;
        card.innerHTML = `
            <div class="w-full flex justify-between items-center mb-6 sm:mb-8 z-10 relative">
                <span class="text-xl sm:text-2xl font-extrabold flex items-center gap-2 drop-shadow-md min-w-0"><i class="ph-fill ph-map-pin text-white/80 shrink-0"></i> <span class="truncate">${city}</span></span>
            </div>
            <div class="flex flex-col items-center z-10 relative mb-8 sm:mb-10 w-full">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 w-full">
                   <i class="ph-fill ${w.i} text-7xl sm:text-[8rem] drop-shadow-2xl"></i>
                   <div class="flex items-start">
                     <h3 class="text-6xl sm:text-[6rem] leading-none font-black tracking-tighter drop-shadow-lg">${Math.round(c.temperature_2m)}</h3><span class="text-4xl sm:text-5xl mt-1 sm:mt-2 font-bold opacity-80">°</span>
                   </div>
                </div>
                <p class="text-2xl sm:text-3xl font-bold opacity-90 capitalize tracking-wide mt-2 drop-shadow-md text-center">${w.t}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-8 sm:mb-10 z-10 relative text-center">
                <div class="bg-black/20 p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/10">
                    <i class="ph-fill ph-thermometer text-2xl sm:text-3xl mb-1 text-amber-300"></i><div class="text-[10px] sm:text-[11px] opacity-70 uppercase tracking-widest font-bold mb-1">Feels</div><div class="font-black text-lg sm:text-xl">${Math.round(c.apparent_temperature)}°</div>
                </div>
                <div class="bg-black/20 p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/10">
                    <i class="ph-fill ph-drop text-2xl sm:text-3xl mb-1 text-blue-300"></i><div class="text-[10px] sm:text-[11px] opacity-70 uppercase tracking-widest font-bold mb-1">Humidity</div><div class="font-black text-lg sm:text-xl">${c.relative_humidity_2m}%</div>
                </div>
                <div class="bg-black/20 p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/10">
                    <i class="ph-fill ph-wind text-2xl sm:text-3xl mb-1 text-teal-300"></i><div class="text-[10px] sm:text-[11px] opacity-70 uppercase tracking-widest font-bold mb-1">Wind</div><div class="font-black text-lg sm:text-xl">${Math.round(c.wind_speed_10m)} <span class="text-[10px] sm:text-xs opacity-70">km/h</span></div>
                </div>
            </div>
            <div class="flex flex-row justify-between gap-2 sm:gap-4 w-full z-10 relative">${forecastHTML}</div>
          `;
      }

      if (mini)
        mini.innerHTML = `<i class="ph-fill ${w.i} text-xl text-sky-500 drop-shadow-sm"></i> ${Math.round(c.temperature_2m)}°`;

      if (previewText && previewIcon) {
        const todayMax =
          data.daily && data.daily.temperature_2m_max
            ? Math.round(data.daily.temperature_2m_max[0])
            : "--";
        const todayMin =
          data.daily && data.daily.temperature_2m_min
            ? Math.round(data.daily.temperature_2m_min[0])
            : "--";

        previewText.innerHTML = `
           <div class="text-4xl font-black mb-1">${Math.round(c.temperature_2m)}°</div>
           <div class="text-sm font-bold text-sky-400 mb-1 tracking-wide">${w.t}</div>
           <div class="text-xs font-bold text-slate-500 uppercase tracking-widest truncate w-full mb-3 min-w-0"><i class="ph-fill ph-map-pin"></i> ${city}</div>
           <div class="text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md inline-block shadow-inner shrink-0">
             H: ${todayMax}° &bull; L: ${todayMin}°
           </div>
         `;
        previewIcon.innerHTML = `<i class="ph-fill ${w.i} text-5xl md:text-[4rem]"></i>`;

        previewText.classList.remove("mt-auto");
        previewText.classList.add("mt-4");
      }
    } catch (err) {
      if (card) {
        card.innerHTML = `<div class="text-2xl font-bold bg-black/20 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center"><i class="ph-fill ph-warning-circle text-6xl mb-4 text-amber-400"></i>Offline Mode</div>`;
      }
    }
  };

  return {
    init: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => render(pos.coords.latitude, pos.coords.longitude),
          () => render(51.5074, -0.1278),
        );
      } else {
        render(51.5074, -0.1278);
      }
    },
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const safeInit = (module, name) => {
    try {
      if (module && module.init) module.init();
    } catch (e) {
      console.error(`Failed to load ${name}:`, e);
    }
  };

  window.Router = Router;
  window.Todo = Todo;
  window.Goals = Goals;
  window.Calendar = Calendar;

  safeInit(ThreeBG, "ThreeBG");
  safeInit(AppUI, "AppUI");
  safeInit(Router, "Router");
  safeInit(Todo, "Todo");
  safeInit(Pomodoro, "Pomodoro");
  safeInit(Planner, "Planner");
  safeInit(Goals, "Goals");
  safeInit(Calendar, "Calendar");
  safeInit(Quotes, "Quotes");
  safeInit(Weather, "Weather");
});
