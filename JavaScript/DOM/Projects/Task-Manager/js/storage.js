const STORAGE_KEY =
  "domExplorerTasks";

const THEME_KEY =
  "domExplorerTheme";


function saveTasksToStorage(
  tasks
) {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );

  } catch (error) {

    console.error(
      "Failed To Save Tasks:",
      error
    );
  }
}

function loadTasksFromStorage() {

  try {

    const storedTasks =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (
      !storedTasks
    ) {

      return [];
    }

    const parsedTasks =
      JSON.parse(
        storedTasks
      );

    return Array.isArray(
      parsedTasks
    )
      ? parsedTasks
      : [];

  } catch (error) {

    console.error(
      "Failed To Load Tasks:",
      error
    );

    return [];
  }
}

function clearTasksFromStorage() {

  try {

    localStorage.removeItem(
      STORAGE_KEY
    );

  } catch (error) {

    console.error(
      "Failed To Clear Tasks:",
      error
    );
  }
}

function saveThemeToStorage(
  theme
) {

  try {

    localStorage.setItem(
      THEME_KEY,
      theme
    );

  } catch (error) {

    console.error(
      "Failed To Save Theme:",
      error
    );
  }
}

function loadThemeFromStorage() {

  try {

    return (
      localStorage.getItem(
        THEME_KEY
      ) || "dark"
    );

  } catch (error) {

    console.error(
      "Failed To Load Theme:",
      error
    );

    return "dark";
  }
}

function clearThemeFromStorage() {

  try {

    localStorage.removeItem(
      THEME_KEY
    );

  } catch (error) {

    console.error(
      "Failed To Clear Theme:",
      error
    );
  }
}

function storageAvailable() {

  try {

    const testKey =
      "__storage_test__";

    localStorage.setItem(
      testKey,
      "test"
    );

    localStorage.removeItem(
      testKey
    );

    return true;

  } catch {

    return false;
  }
}

function resetApplication() {

  try {

    clearTasksFromStorage();

    clearThemeFromStorage();

    location.reload();

  } catch (error) {

    console.error(
      "Reset Failed:",
      error
    );
  }
}

console.log(
  "Storage Available:",
  storageAvailable()
);

console.log(
  "Storage Module Loaded"
);