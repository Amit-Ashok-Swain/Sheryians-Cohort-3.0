const themeToggle =
  document.querySelector(
    "#theme-toggle"
  );

const body =
  document.body;

function updateThemeToggle(
  theme
) {

  if (
    !themeToggle
  ) {
    return;
  }

  themeToggle.checked =
    theme === "dark";
}

function applyTheme(
  theme
) {


  body.dataset.theme =
    theme;


  body.setAttribute(
    "data-theme",
    theme
  );

  updateThemeToggle(
    theme
  );
}

function loadTheme() {

  const savedTheme =
    loadThemeFromStorage();

  applyTheme(
    savedTheme
  );

  console.log(
    "Theme Loaded:",
    savedTheme
  );
}

function toggleTheme() {

  const currentTheme =
    body.dataset.theme;

  const newTheme =

    currentTheme === "dark"

      ? "light"

      : "dark";

  applyTheme(
    newTheme
  );

  saveThemeToStorage(
    newTheme
  );

  /*
    GET ATTRIBUTE DEMO
  */

  console.log(
    "Current Theme:",
    body.getAttribute(
      "data-theme"
    )
  );
}

if (
  themeToggle
) {

  themeToggle.addEventListener(
    "change",
    toggleTheme
  );
}

function themeAttributeDemo() {

  body.setAttribute(
    "data-demo",
    "theme-demo"
  );

  console.log(
    "getAttribute():",
    body.getAttribute(
      "data-demo"
    )
  );

  console.log(
    "hasAttribute():",
    body.hasAttribute(
      "data-demo"
    )
  );

  console.log(
    "dataset:",
    body.dataset.theme
  );

  body.removeAttribute(
    "data-demo"
  );

  console.log(
    "removeAttribute() executed"
  );
}

loadTheme();

themeAttributeDemo();

console.log(
  "Theme Module Loaded"
);