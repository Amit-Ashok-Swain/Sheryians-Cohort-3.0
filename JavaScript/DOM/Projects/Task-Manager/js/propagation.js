const bubblingGrandparent =
  document.querySelector(
    ".bubbling-grandparent"
  );

const bubblingParent =
  document.querySelector(
    ".bubbling-parent"
  );

const bubblingChild =
  document.querySelector(
    ".bubbling-child"
  );

const captureGrandparent =
  document.querySelector(
    ".capture-grandparent"
  );

const captureParent =
  document.querySelector(
    ".capture-parent"
  );

const captureChild =
  document.querySelector(
    ".capture-child"
  );
function highlightElement(
  element
) {

  if (
    !element
  ) {
    return;
  }

  element.style.transform =
    "scale(1.05)";

  element.style.boxShadow =
    "0 0 25px rgba(139,92,246,.35)";

  setTimeout(
    () => {

      element.style.transform =
        "scale(1)";

      element.style.boxShadow =
        "none";

    },
    250
  );
}

if (
  bubblingGrandparent &&
  bubblingParent &&
  bubblingChild
) {

  bubblingGrandparent.addEventListener(
    "click",
    () => {

      console.log(
        "Bubbling → Grandparent"
      );

      highlightElement(
        bubblingGrandparent
      );

    }
  );

  bubblingParent.addEventListener(
    "click",
    () => {

      console.log(
        "Bubbling → Parent"
      );

      highlightElement(
        bubblingParent
      );

    }
  );

  bubblingChild.addEventListener(
    "click",
    () => {

      console.log(
        "Bubbling → Child"
      );

      highlightElement(
        bubblingChild
      );

    }
  );

}

if (
  captureGrandparent &&
  captureParent &&
  captureChild
) {

  captureGrandparent.addEventListener(
    "click",
    () => {

      console.log(
        "Capturing → Grandparent"
      );

      highlightElement(
        captureGrandparent
      );

    },
    true
  );

  captureParent.addEventListener(
    "click",
    () => {

      console.log(
        "Capturing → Parent"
      );

      highlightElement(
        captureParent
      );

    },
    true
  );

  captureChild.addEventListener(
    "click",
    () => {

      console.log(
        "Capturing → Child"
      );

      highlightElement(
        captureChild
      );

    },
    true
  );

}

console.log(
  "=================================="
);

console.log(
  "EVENT PROPAGATION DEMO"
);

console.log(
  "=================================="
);

console.log(
  "Bubbling Order:"
);

console.log(
  "Child → Parent → Grandparent"
);

console.log(
  "----------------------------------"
);

console.log(
  "Capturing Order:"
);

console.log(
  "Grandparent → Parent → Child"
);

console.log(
  "=================================="
);

console.log(
  "Propagation Module Loaded"
);