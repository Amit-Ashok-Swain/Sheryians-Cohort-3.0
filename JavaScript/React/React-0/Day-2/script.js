// import React from "react";

const h1 = React.createElement("h1",{},"This is from React");

const selectRootDiv = document.querySelector("#root");

ReactDOM.createRoot(selectRootDiv).render(h1);