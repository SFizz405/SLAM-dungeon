window.addEventListener("message", (e) => {
  document.body.innerHTML = "";

  const threeJS = document.createElement("script");

  threeJS.src = "preview.js";
  threeJS.type = "module";

  document.body.appendChild(threeJS);

  window.pgmObject = e.data;
});
