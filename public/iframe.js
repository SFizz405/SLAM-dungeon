const savedData = sessionStorage.getItem("savedPgmObject");

if (savedData) {
  window.pgmObject = JSON.parse(savedData);

  const threeJS = document.createElement("script");

  threeJS.src = "preview.js";
  threeJS.type = "module";

  document.body.appendChild(threeJS);

  sessionStorage.removeItem("savedPgmObject");
}

window.addEventListener("message", (e) => {
  sessionStorage.setItem("savedPgmObject", JSON.stringify(e.data));

  window.location.reload();
});
