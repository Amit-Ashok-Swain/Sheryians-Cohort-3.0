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

const DateManager = (() => {
  const getLocalISO = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  };

  let selectedDate = getLocalISO();

  return {
    getLocalISO,
    getDate: () => selectedDate,
    setDate: (newDate) => {
      selectedDate = newDate;
      if (window.Todo) window.Todo.reload();
      if (window.Planner) window.Planner.reload();
      if (window.Goals) window.Goals.reload();
      if (window.Calendar) {
        window.Calendar.updatePreview();
        window.Calendar.renderFull();
      }
    },
  };
})();

const MasterStore = (() => {
  let items = Storage.load("master_focus_items", []);

  const getVisible = (date, type) => {
    return items
      .filter(
        (i) =>
          i.type === type &&
          i.startDate <= date &&
          (!i.completedAt || i.completedAt >= date),
      )
      .map((i) => ({ ...i, completed: i.completedAt === date }));
  };

  const add = (text, type, startDate) => {
    items.push({
      id: Date.now(),
      text,
      type,
      startDate,
      completedAt: null,
      important: false,
    });
    Storage.save("master_focus_items", items);
  };

  const toggle = (id, viewDate) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (item.completedAt === viewDate) {
      item.completedAt = null;
    } else {
      item.completedAt = viewDate;
    }
    Storage.save("master_focus_items", items);
  };

  const toggleImportant = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      item.important = !item.important;
      Storage.save("master_focus_items", items);
    }
  };

  const remove = (id) => {
    items = items.filter((i) => i.id !== id);
    Storage.save("master_focus_items", items);
  };

  const clearDone = (date, type) => {
    items = items.filter((i) => !(i.type === type && i.completedAt === date));
    Storage.save("master_focus_items", items);
  };

  return { getVisible, add, toggle, toggleImportant, remove, clearDone };
})();

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
    sunLight,
    planets = [];
  let mouseX = 0,
    mouseY = 0;
  let currentColor = new THREE.Color(0x818cf8);
  let targetColor = new THREE.Color(0x818cf8);
  let currentFog = new THREE.Color(0x050505);
  let targetFog = new THREE.Color(0x050505);

  const init = () => {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(currentFog.getHex(), 0.0015);

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
      alpha: false,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0x222222));

    const sunGeo = new THREE.SphereGeometry(15, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    sunLight = new THREE.PointLight(0xffaa00, 2, 800);
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

    createPlanet(3, 40, 0.005, 0x4f46e5, false);
    createPlanet(6, 80, 0.003, 0xf59e0b, true);
    createPlanet(4, 120, 0.002, 0xef4444, false);
    createPlanet(8, 180, 0.001, 0x06b6d4, false);

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
    if (sun && sun.material) sun.material.color.copy(currentColor);
    if (sunLight) sunLight.color.copy(currentColor);
    currentFog.lerp(targetFog, 0.02);
    scene.fog.color.copy(currentFog);
    renderer.setClearColor(currentFog, 1);
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (100 - mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };
  const updateColor = (hexColor) => {
    if (scene) targetColor.setHex(hexColor);
  };
  const updateFog = (hexColor) => {
    if (scene) targetFog.setHex(hexColor);
  };

  return { init, updateColor, updateFog };
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

const CalendarModal = (() => {
  const modal = document.getElementById("calendar-modal");
  const content = document.getElementById("calendar-modal-content");
  const title = document.getElementById("calendar-modal-title");
  const closeBtn = document.getElementById("calendar-modal-close");
  let targetDate = "";

  const hide = () => {
    if (!modal) return;
    modal.classList.add("opacity-0");
    content.classList.replace("scale-100", "scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
  };

  const show = (dateStr) => {
    if (!modal) return;
    targetDate = dateStr;
    const [y, m, d] = dateStr.split("-");
    const displayDate = new Date(y, parseInt(m) - 1, d).toLocaleDateString(
      "en-US",
      { weekday: "short", month: "short", day: "numeric" },
    );
    if (title) title.textContent = `Actions for ${displayDate}`;
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      content.classList.replace("scale-95", "scale-100");
    }, 10);
  };

  const routeTo = (viewId) => {
    DateManager.setDate(targetDate);
    hide();
    if (window.Router) window.Router.showView(viewId);
  };

  return {
    init: () => {
      if (!modal) return;
      closeBtn.addEventListener("click", hide);
      document
        .getElementById("btn-nav-schedule")
        ?.addEventListener("click", () => routeTo("planner-view"));
      document
        .getElementById("btn-nav-todo")
        ?.addEventListener("click", () => routeTo("todo-view"));
      document
        .getElementById("btn-nav-goals")
        ?.addEventListener("click", () => routeTo("goals-view"));
    },
    show,
    hide,
  };
})();

const AppUI = (() => {
  const themeToggle = document.getElementById("theme-toggle");
  const todayBtn = document.getElementById("today-nav-btn");
  let isDark = Storage.load("isDark", true);
  let lastHour = -1;
  let weatherCode = 0;

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", isDark);
    updateEnvironment();
  };
  const setWeatherCondition = (code) => {
    weatherCode = code;
    updateEnvironment();
  };

  const updateEnvironment = () => {
    const hr = new Date().getHours();
    const overlay = document.getElementById("ambient-overlay");
    const isDark = document.documentElement.classList.contains("dark");
    let sunColor, fogColor, overlayColor;

    if (hr >= 5 && hr < 12) {
      sunColor = 0xfacc15;
      fogColor = 0x87ceeb;
      overlayColor = isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.1)";
    } else if (hr >= 12 && hr < 17) {
      sunColor = 0xffffff;
      fogColor = 0x38bdf8;
      overlayColor = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.1)";
    } else if (hr >= 17 && hr < 20) {
      sunColor = 0xf43f5e;
      fogColor = 0xfb923c;
      overlayColor = isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.1)";
    } else {
      sunColor = 0x818cf8;
      fogColor = 0x050510;
      overlayColor = isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(49, 46, 129, 0.3)";
    }

    if (hr >= 5 && hr < 20) {
      if (weatherCode >= 3 && weatherCode <= 45) {
        fogColor = 0x64748b;
        sunColor = 0xe2e8f0;
      } else if (weatherCode >= 51 && weatherCode <= 61) {
        fogColor = 0x475569;
        sunColor = 0x94a3b8;
      } else if (weatherCode >= 71) {
        fogColor = 0x334155;
        sunColor = 0x64748b;
      }
    }
    if (overlay) {
      overlay.className =
        "fixed inset-0 transition-all duration-[2000ms] -z-10 backdrop-blur-[2px]";
      overlay.style.backgroundColor = overlayColor;
    }
    if (ThreeBG.updateColor) ThreeBG.updateColor(sunColor);
    if (ThreeBG.updateFog) ThreeBG.updateFog(fogColor);
  };

  const updateClock = () => {
    const now = new Date();
    if (now.getHours() !== lastHour) {
      lastHour = now.getHours();
      updateEnvironment();
    }
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const clockHeader = document.getElementById("clock-widget-header");
    if (clockHeader) clockHeader.textContent = `${dateStr} | ${timeStr}`;
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
      if (todayBtn) {
        todayBtn.addEventListener("click", () => {
          DateManager.setDate(DateManager.getLocalISO());
        });
      }
    },
    setWeatherCondition,
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
    showView,
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

  let tasks = [];

  const reload = () => {
    tasks = MasterStore.getVisible(DateManager.getDate(), "todo");
    render();
  };

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
          <button class="toggle-cb w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${t.completed ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300 dark:border-slate-600"}" data-id="${t.id}">${t.completed ? '<i class="ph-bold ph-check text-xs sm:text-sm"></i>' : ""}</button>
          <span class="text-base sm:text-lg min-w-0 break-words whitespace-normal transition-all ${t.completed ? "line-through text-slate-500" : "text-slate-800 dark:text-white"} ${t.important && !t.completed ? "font-bold text-amber-500" : "font-medium"}">${t.text}</span>
        </div>
        <div class="flex gap-1 ml-2 shrink-0">
          <button class="important-btn p-1.5 sm:p-2 rounded-xl transition-all ${t.important ? "text-amber-500 bg-amber-50 dark:bg-amber-900/30" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}" data-id="${t.id}"><i class="${t.important ? "ph-fill" : "ph"} ph-star text-lg sm:text-xl"></i></button>
          <button class="delete-btn p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-red-500 transition-all" data-id="${t.id}"><i class="ph-bold ph-trash"></i></button>
        </div>`;
        list.appendChild(li);
      });
    updateProgressAndPreview();
  };

  const add = () => {
    if (!input || !input.value.trim()) return;
    MasterStore.add(input.value.trim(), "todo", DateManager.getDate());
    input.value = "";
    reload();
  };

  return {
    init: () => {
      if (addBtn) addBtn.addEventListener("click", add);
      if (input)
        input.addEventListener("keypress", (e) => e.key === "Enter" && add());
      if (clearBtn)
        clearBtn.addEventListener("click", () => {
          MasterStore.clearDone(DateManager.getDate(), "todo");
          reload();
        });
      if (list) {
        list.addEventListener("click", (e) => {
          const btn = e.target.closest("button");
          const wrap = e.target.closest(".toggle-cb-wrap");
          if (btn) {
            const id = Number(btn.dataset.id);
            if (btn.classList.contains("toggle-cb"))
              MasterStore.toggle(id, DateManager.getDate());
            else if (btn.classList.contains("important-btn"))
              MasterStore.toggleImportant(id);
            else if (btn.classList.contains("delete-btn"))
              MasterStore.remove(id);
            reload();
          } else if (wrap) {
            MasterStore.toggle(Number(wrap.dataset.id), DateManager.getDate());
            reload();
          }
        });
      }
      reload();
    },
    reload,
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
  let totalTime = workMins * 60,
    timeLeft = totalTime,
    interval = null,
    isWork = true;

  const format = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  const updatePreview = () => {
    if (previewContent) {
      const colorClass = isWork ? "text-brand-500" : "text-emerald-500";
      previewContent.innerHTML = `<svg class="absolute inset-0 w-full h-full -z-10 opacity-20 p-2" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="4" class="${colorClass}"></circle></svg><div class="text-3xl sm:text-4xl font-mono font-black ${colorClass} drop-shadow-sm">${format(timeLeft)}</div>`;
    }
  };

  const updateUI = () => {
    if (display) display.textContent = format(timeLeft);
    if (ring)
      ring.style.strokeDashoffset =
        circumference - (timeLeft / totalTime) * circumference;
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
  let plans = {};

  const reload = () => {
    plans = Storage.load(`planner_${DateManager.getDate()}`, {});
    if (typeof plans !== "object" || plans === null) plans = {};
    render();
  };
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
            indicator.style.top = `${slotWrapper.offsetTop + (now.getMinutes() / 60) * slotWrapper.offsetHeight}px`;
          }
        }
      } else {
        indicator.style.display = "none";
      }
    }
    if (previewContent) {
      const currPlan = plans[currentHr],
        nextPlan = plans[currentHr + 1];
      let html = "";
      if (currPlan) {
        html += `<div class="min-w-0"><div class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> NOW</div><div class="text-sm font-semibold truncate w-full">${currPlan}</div></div>`;
      }
      if (nextPlan) {
        html += `<div class="min-w-0 ${currPlan ? "opacity-60" : ""}"><div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">UP NEXT</div><div class="text-sm font-semibold truncate w-full">${nextPlan}</div></div>`;
      }
      if (!currPlan && !nextPlan) {
        html = `<div class="my-auto min-w-0"><div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">STATUS</div><div class="text-sm font-semibold italic text-slate-500">Free time block</div></div>`;
      }
      previewContent.innerHTML = html;
    }
  };

  const render = () => {
    if (!container) return;
    const currentHr = new Date().getHours();
    container.innerHTML = "";
    for (let i = 6; i <= 22; i++) {
      const isPast = i < currentHr,
        isCurr = i === currentHr;
      const slot = document.createElement("div");
      slot.className = `flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all shadow-sm ${isCurr ? "bg-amber-50/80 dark:bg-amber-900/30 border border-amber-400 transform scale-[1.02] z-10" : isPast ? "opacity-40 bg-white/20 dark:bg-slate-800/20 grayscale-[50%]" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"}`;
      slot.innerHTML = `<div class="flex items-center sm:w-28 shrink-0 font-bold ${isCurr ? "text-amber-600 dark:text-amber-400 text-lg" : "text-slate-500"}">${isCurr ? '<i class="ph-fill ph-clock-countdown mr-2 animate-pulse"></i>' : ""} ${formatHr(i)}</div><input type="text" data-hr="${i}" value="${plans[i] || ""}" placeholder="${isCurr ? "What are you doing right now?" : "Plan block..."}" class="planner-input flex-grow min-w-0 w-full bg-transparent border-none focus:ring-0 px-2 py-1 outline-none text-slate-800 dark:text-white font-medium ${isPast ? "line-through decoration-slate-400" : ""} placeholder-slate-400">`;
      container.appendChild(slot);
    }
    updateTimelineAndPreview();
  };

  return {
    init: () => {
      reload();
      if (container) {
        container.addEventListener("change", (e) => {
          if (e.target.tagName === "INPUT") {
            const hr = e.target.dataset.hr,
              val = e.target.value.trim();
            if (val) plans[hr] = val;
            else delete plans[hr];
            Storage.save(`planner_${DateManager.getDate()}`, plans);
            updateTimelineAndPreview();
          }
        });
      }
      setInterval(render, 60000);
    },
    reload,
  };
})();

const Goals = (() => {
  const list = document.getElementById("goals-list-full");
  const input = document.getElementById("goal-input");
  const btn = document.getElementById("goal-add-btn");
  const clearBtn = document.getElementById("goal-clear-btn");
  const barFull = document.getElementById("goals-progress-bar-full");
  const textFull = document.getElementById("goals-progress-text-full");
  const previewFill = document.getElementById("goals-preview-fill");
  const previewPct = document.getElementById("goals-preview-pct");

  let goals = [];
  let confettiFired = false;

  const reload = () => {
    goals = MasterStore.getVisible(DateManager.getDate(), "goal");
    render();
  };

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
        li.className = `flex items-center justify-between p-4 sm:p-5 rounded-2xl transition-all cursor-pointer shadow-sm gap-2 ${g.completed ? "border border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]" : "border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 hover:border-emerald-300"}`;
        li.innerHTML = `
            <div class="flex items-center gap-3 sm:gap-4 flex-grow overflow-hidden goal-toggle" data-id="${g.id}">
              <div class="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${g.completed ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}">${g.completed ? '<i class="ph-bold ph-check text-xs sm:text-base"></i>' : ""}</div>
              <span class="text-base sm:text-lg min-w-0 break-words whitespace-normal font-bold ${g.completed ? "text-emerald-700 dark:text-emerald-400 line-through opacity-70" : "text-slate-800 dark:text-white"}">${g.text}</span>
            </div>
            <button class="goal-del shrink-0 text-slate-400 hover:text-red-500 p-1.5 sm:p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" data-id="${g.id}"><i class="ph-bold ph-trash text-lg"></i></button>`;
        list.appendChild(li);
      });
    }
    updateProgressAndPreview();
  };

  const add = () => {
    if (!input || !input.value.trim()) return;
    MasterStore.add(input.value.trim(), "goal", DateManager.getDate());
    input.value = "";
    reload();
  };

  return {
    init: () => {
      if (btn) btn.addEventListener("click", add);
      if (input)
        input.addEventListener("keypress", (e) => e.key === "Enter" && add());
      if (clearBtn)
        clearBtn.addEventListener("click", () => {
          MasterStore.clearDone(DateManager.getDate(), "goal");
          reload();
        });
      if (list) {
        list.addEventListener("click", (e) => {
          const tg = e.target.closest(".goal-toggle");
          const del = e.target.closest(".goal-del");
          if (tg) {
            MasterStore.toggle(Number(tg.dataset.id), DateManager.getDate());
            reload();
          }
          if (del) {
            MasterStore.remove(Number(del.dataset.id));
            reload();
          }
        });
      }
      reload();
    },
    reload,
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
    const selDateStr = DateManager.getDate();
    const [yStr, mStr, dStr] = selDateStr.split("-");
    const selDate = new Date(yStr, parseInt(mStr) - 1, dStr);

    navDate = new Date(yStr, parseInt(mStr) - 1, dStr);

    if (previewDate) {
      const dayName = selDate.toLocaleDateString("en-US", { weekday: "long" });
      const monthName = selDate.toLocaleDateString("en-US", { month: "short" });
      const dateNum = selDate.getDate();
      previewDate.innerHTML = `<div class="text-3xl md:text-4xl font-black text-rose-500 drop-shadow-sm leading-none">${dateNum}</div><div class="text-lg md:text-xl font-bold tracking-wide">${dayName}</div><div class="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest">${monthName} ${selDate.getFullYear()}</div>`;
    }
    if (previewMini) {
      const y = selDate.getFullYear(),
        m = selDate.getMonth();
      const days = getDaysInMonth(y, m),
        firstDay = getFirstDay(y, m);
      let html = "";
      for (let i = 0; i < firstDay; i++) html += "<div></div>";
      for (let i = 1; i <= days; i++) {
        const isSelected = i === selDate.getDate();
        html += `<div class="w-3 h-3 flex items-center justify-center rounded-sm ${isSelected ? "bg-rose-500 text-white font-bold" : "text-slate-400 bg-slate-200/50 dark:bg-slate-700/50"}">${i}</div>`;
      }
      previewMini.innerHTML = html;
    }
  };

  const renderFull = () => {
    if (!grid || !monthYearLabel) return;
    const y = navDate.getFullYear(),
      m = navDate.getMonth();
    monthYearLabel.textContent = navDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const days = getDaysInMonth(y, m),
      firstDay = getFirstDay(y, m);
    let html = "";
    for (let i = 0; i < firstDay; i++)
      html += `<div class="aspect-square rounded-2xl bg-white/5 dark:bg-slate-800/10 border border-slate-100/50 dark:border-slate-700/20"></div>`;
    for (let i = 1; i <= days; i++) {
      const cellDateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isSelected = cellDateStr === DateManager.getDate();
      html += `<div data-date="${cellDateStr}" class="calendar-day aspect-square flex items-center justify-center rounded-xl sm:rounded-2xl transition-all font-bold text-sm sm:text-lg cursor-pointer ${isSelected ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105 z-10" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md"}">${i}</div>`;
    }
    grid.innerHTML = html;
    grid.querySelectorAll(".calendar-day").forEach((el) =>
      el.addEventListener("click", (e) => {
        if (window.CalendarModal)
          window.CalendarModal.show(e.target.dataset.date);
      }),
    );
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
    renderFull,
  };
})();

const Quotes = (() => {
  const flipCard = document.getElementById("quote-flip-card");
  const cFront = document.getElementById("quote-content-front"),
    aFront = document.getElementById("quote-author-front");
  const cBack = document.getElementById("quote-content-back"),
    aBack = document.getElementById("quote-author-back");
  const btn = document.getElementById("new-quote-btn"),
    previewContent = document.getElementById("quotes-preview-content");

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
        const div = previewContent.querySelector("div"),
          auth = previewContent.querySelector(".author-preview");
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
        const div = previewContent.querySelector("div"),
          auth = previewContent.querySelector(".author-preview");
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
  const card = document.getElementById("weather-card"),
    mini = document.getElementById("weather-mini");
  const previewText = document.getElementById("weather-preview-text"),
    previewIcon = document.getElementById("weather-preview-icon");

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

  const formatTime = (isoString) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const render = async (
    lat,
    lon,
    isFallback = false,
    customCityName = null,
  ) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,visibility,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`,
      );
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();

      let city = customCityName || "Location";
      if (!customCityName) {
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            city = geoData?.city || geoData?.locality || "Location";
          }
        } catch (e) {}
      }

      const c = data.current,
        w = WMO[c.weather_code] || WMO[0];
      if (window.AppUI && window.AppUI.setWeatherCondition)
        window.AppUI.setWeatherCondition(c.weather_code);

      let alertBannerHTML = "";
      if (isFallback) {
        alertBannerHTML = `<div class="w-full bg-rose-500/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center justify-center gap-2 mb-3 text-[11px] sm:text-xs font-bold text-white border border-rose-500/40 text-center shadow-sm"><i class="ph-bold ph-warning-circle text-base text-rose-300 shrink-0"></i> Location denied. Showing default weather.</div>`;
      } else if (
        [3, 51, 61, 95].includes(c.weather_code) ||
        c.relative_humidity_2m > 85
      ) {
        alertBannerHTML = `<div class="w-full bg-white/20 dark:bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center justify-center gap-2 mb-3 text-xs sm:text-sm font-bold border border-white/20 shadow-sm animate-pulse text-white"><i class="ph-fill ph-umbrella text-lg text-amber-300"></i> Precipitation Risk: Carry an umbrella with you!</div>`;
      } else {
        alertBannerHTML = `<div class="w-full bg-white/10 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center justify-center gap-2 mb-3 text-xs font-semibold text-white/90"><i class="ph-bold ph-sun text-base text-amber-200"></i> Atmospheric parameters stable. No umbrella needed.</div>`;
      }

      let forecastHTML = "";
      for (let i = 1; i <= 3; i++) {
        const date = new Date(data.daily.time[i]).toLocaleDateString("en-US", {
          weekday: "short",
        });
        const fw = WMO[data.daily.weather_code[i]] || WMO[0];
        forecastHTML += `<div class="flex flex-col items-center bg-black/15 dark:bg-black/30 rounded-xl p-2 backdrop-blur-md w-full border border-white/5 min-w-0"><span class="text-[10px] font-bold mb-1 uppercase tracking-wider text-slate-100/90 truncate w-full text-center">${date}</span><i class="ph-fill ${fw.i} text-2xl mb-1 drop-shadow-md"></i><div class="text-xs font-bold">${Math.round(data.daily.temperature_2m_max[i])}° <span class="opacity-40 text-[10px]">${Math.round(data.daily.temperature_2m_min[i])}°</span></div></div>`;
      }

      const searchHTML = `
          <div class="w-full flex justify-between items-center mb-4 z-20 relative bg-black/20 dark:bg-black/40 p-1 rounded-2xl border border-white/20 backdrop-blur-md shadow-inner">
              <input type="text" id="weather-search-input" placeholder="Search any city..." class="bg-transparent border-none outline-none text-white placeholder-white/60 px-3 py-1.5 w-full text-sm font-semibold">
              <button id="weather-search-btn" class="bg-white/20 hover:bg-white/30 text-white rounded-xl px-3 py-1.5 transition-all flex items-center justify-center"><i class="ph-bold ph-magnifying-glass"></i></button>
          </div>
      `;

      if (card) {
        card.className = `flex flex-col items-center justify-start p-4 sm:p-5 bg-gradient-to-br ${w.c} rounded-[2rem] text-white shadow-3d w-full relative overflow-y-auto no-scrollbar transition-all border border-white/20`;
        card.innerHTML = `
            ${searchHTML}
            <div class="w-full flex justify-between items-center mb-2 z-10 relative">
                <span class="text-lg font-extrabold flex items-center gap-1.5 drop-shadow-md min-w-0"><i class="ph-fill ph-map-pin text-white/80 shrink-0"></i> <span class="truncate">${city}</span></span>
            </div>
            
            <div class="flex flex-col items-center z-10 relative mb-3 w-full">
                <div class="flex flex-row items-center justify-center gap-4 w-full">
                   <i class="ph-fill ${w.i} text-6xl drop-shadow-2xl"></i>
                   <div class="flex items-start">
                     <h3 class="text-5xl leading-none font-black tracking-tighter drop-shadow-lg">${Math.round(c.temperature_2m)}</h3><span class="text-2xl font-bold opacity-80">°</span>
                   </div>
                </div>
                <p class="text-lg font-bold opacity-90 capitalize tracking-wide mt-1 drop-shadow-md text-center">${w.t}</p>
            </div>
            ${alertBannerHTML}
            
            <!-- Advanced Details Grid -->
            <div class="grid grid-cols-3 gap-2 w-full mb-2 z-10 relative text-center">
                <div class="bg-black/15 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5 flex flex-col items-center justify-center">
                    <i class="ph-fill ph-thermometer text-lg sm:text-xl mb-0.5 text-amber-300"></i><div class="text-[9px] opacity-60 uppercase tracking-wider font-bold">Feels</div><div class="font-black text-xs sm:text-sm">${Math.round(c.apparent_temperature)}°</div>
                </div>
                <div class="bg-black/15 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5 flex flex-col items-center justify-center">
                    <i class="ph-fill ph-drop text-lg sm:text-xl mb-0.5 text-blue-300"></i><div class="text-[9px] opacity-60 uppercase tracking-wider font-bold">Humidity</div><div class="font-black text-xs sm:text-sm">${c.relative_humidity_2m}%</div>
                </div>
                <div class="bg-black/15 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5 flex flex-col items-center justify-center">
                    <i class="ph-fill ph-wind text-lg sm:text-xl mb-0.5 text-teal-300"></i><div class="text-[9px] opacity-60 uppercase tracking-wider font-bold">Wind</div><div class="font-black text-xs sm:text-sm">${Math.round(c.wind_speed_10m)} <span class="text-[9px] font-normal opacity-60">km/h</span></div>
                </div>
                <div class="bg-black/15 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5 flex flex-col items-center justify-center">
                    <i class="ph-fill ph-sun text-lg sm:text-xl mb-0.5 text-yellow-400"></i><div class="text-[9px] opacity-60 uppercase tracking-wider font-bold">UV Index</div><div class="font-black text-xs sm:text-sm">${c.uv_index || 0}</div>
                </div>
                <div class="bg-black/15 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5 flex flex-col items-center justify-center">
                    <i class="ph-fill ph-eye text-lg sm:text-xl mb-0.5 text-indigo-300"></i><div class="text-[9px] opacity-60 uppercase tracking-wider font-bold">Visibility</div><div class="font-black text-xs sm:text-sm">${c.visibility ? (c.visibility / 1000).toFixed(1) : "--"} <span class="text-[9px] font-normal opacity-60">km</span></div>
                </div>
                <div class="bg-black/15 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5 flex flex-col items-center justify-center">
                    <i class="ph-fill ph-gauge text-lg sm:text-xl mb-0.5 text-emerald-300"></i><div class="text-[9px] opacity-60 uppercase tracking-wider font-bold">Pressure</div><div class="font-black text-xs sm:text-sm">${Math.round(c.surface_pressure || 0)} <span class="text-[9px] font-normal opacity-60">hPa</span></div>
                </div>
            </div>

            <div class="flex justify-between w-full z-10 relative mb-3 bg-black/15 dark:bg-black/20 rounded-xl p-2 px-4 backdrop-blur-md border border-white/5 text-xs font-bold">
                <div class="flex items-center gap-2"><i class="ph-fill ph-sunrise text-amber-400 text-lg"></i> ${formatTime(data.daily.sunrise?.[0])}</div>
                <div class="flex items-center gap-2">${formatTime(data.daily.sunset?.[0])} <i class="ph-fill ph-sunset text-orange-500 text-lg"></i></div>
            </div>

            <div class="flex flex-row justify-between gap-2 w-full z-10 relative mb-1">${forecastHTML}</div>
            
            <div class="text-[9px] opacity-40 font-mono tracking-tight text-center z-10 w-full select-none border-t border-white/10 pt-1.5 mt-1">
              Live ECMWF/GFS High-Res Dynamic Model Integration
            </div>
          `;

        const searchInput = document.getElementById("weather-search-input");
        const searchBtn = document.getElementById("weather-search-btn");
        const handleSearch = async () => {
          const query = searchInput.value.trim();
          if (!query) return;
          searchBtn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
          try {
            const geoRes = await fetch(
              `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`,
            );
            const geoData = await geoRes.json();
            if (geoData.results && geoData.results.length > 0) {
              const loc = geoData.results[0];
              render(
                loc.latitude,
                loc.longitude,
                false,
                `${loc.name}, ${loc.country_code}`,
              );
            } else {
              showToast("City not found.");
              searchBtn.innerHTML = `<i class="ph-bold ph-magnifying-glass"></i>`;
            }
          } catch (err) {
            showToast("Search failed.");
            searchBtn.innerHTML = `<i class="ph-bold ph-magnifying-glass"></i>`;
          }
        };
        searchBtn.addEventListener("click", handleSearch);
        searchInput.addEventListener(
          "keypress",
          (e) => e.key === "Enter" && handleSearch(),
        );
      }

      if (mini)
        mini.innerHTML = `<i class="ph-fill ${w.i} text-xl text-sky-500 drop-shadow-sm"></i> ${Math.round(c.temperature_2m)}°`;

      if (previewText && previewIcon) {
        const todayMax =
            data.daily && data.daily.temperature_2m_max
              ? Math.round(data.daily.temperature_2m_max[0])
              : "--",
          todayMin =
            data.daily && data.daily.temperature_2m_min
              ? Math.round(data.daily.temperature_2m_min[0])
              : "--";

        let miniAlert = "";
        if (
          [3, 51, 61, 95].includes(c.weather_code) ||
          c.relative_humidity_2m > 85
        )
          miniAlert = `<span class="text-amber-600 dark:text-amber-400 animate-pulse"><i class="ph-fill ph-umbrella"></i> Pack an umbrella</span>`;
        else
          miniAlert = `<span class="text-emerald-600 dark:text-emerald-400"><i class="ph-bold ph-sun"></i> No umbrella needed</span>`;

        previewText.innerHTML = `
            <div class="flex items-end gap-2 mb-1">
              <div class="text-3xl font-black leading-none">${Math.round(c.temperature_2m)}°</div>
              <div class="text-[9px] font-bold text-slate-500 bg-slate-200/50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded shadow-inner">
                H: ${todayMax}° &bull; L: ${todayMin}°
              </div>
            </div>
            <div class="text-xs font-bold text-sky-500 dark:text-sky-400 mb-0.5 tracking-wide">${w.t}</div>
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate w-full mb-1 min-w-0">
               <i class="ph-fill ph-map-pin"></i> ${city}
            </div>
            ${isFallback ? `<div class="text-[9px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-1.5 py-1 rounded mb-1 w-full leading-tight">Location denied. Showing default weather.</div>` : ""}
            <div class="text-[9px] font-bold bg-white/50 dark:bg-slate-800/80 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm mb-1 inline-block w-fit">
              ${miniAlert}
            </div>
            <div class="text-[8px] font-mono text-slate-400/70 dark:text-slate-500/70 tracking-tight">LIVE ECMWF/GFS MODEL</div>
        `;
        previewIcon.innerHTML = `<i class="ph-fill ${w.i} text-5xl md:text-6xl"></i>`;
        previewText.classList.remove("mt-auto");
        previewText.classList.add("mt-1");
      }
    } catch (err) {
      if (card)
        card.innerHTML = `<div class="text-2xl font-bold bg-black/20 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center"><i class="ph-fill ph-warning-circle text-6xl mb-4 text-amber-400"></i>Offline Mode</div>`;
    }
  };

  return {
    init: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => render(pos.coords.latitude, pos.coords.longitude, false),
          (err) => {
            if (err.code === err.PERMISSION_DENIED)
              showToast("Location denied. Showing default weather.");
            else showToast("Location error. Using fallback.");
            render(20.2961, 85.8245, true);
          },
          { timeout: 10000 },
        );
      } else {
        render(20.2961, 85.8245, true);
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
  window.Planner = Planner;
  window.Goals = Goals;
  window.Calendar = Calendar;
  window.CalendarModal = CalendarModal;

  safeInit(DateManager, "DateManager");
  safeInit(CalendarModal, "CalendarModal");
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
