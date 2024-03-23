const savedData = sessionStorage.getItem("savedPgmObject");

if (savedData) {
  window.pgmObject = JSON.parse(savedData);

  const threeJS = document.createElement("script");

  threeJS.src = "preview.js";
  threeJS.type = "module";

  document.body.appendChild(threeJS);

  sessionStorage.removeItem("savedPgmObject");
}

window.addEventListener("message", (event) => {
  sessionStorage.setItem("savedPgmObject", JSON.stringify(event.data));

  window.location.reload();
});
