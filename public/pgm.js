const submitButton = document.getElementById("submit");
const fileInput = document.getElementById("input");
const form = document.getElementById("form");

const handleJSON = (json) => {
  if (!json.error) {
    const threeJS = document.createElement("script");
    const name = document.createElement("input");
    const description = document.createElement("input");

    threeJS.src = "preview.js";
    threeJS.type = "module";

    name.type = "text";
    name.name = "name";

    description.type = "text";
    description.name = "description";

    document.body.appendChild(threeJS);
    form.prepend(description);
    form.prepend(name);

    submitButton.type = "submit";
    submitButton.textContent = "送信";
    submitButton.onclick = () => {};

    form.style.background = "white";
  } else {
    form.style.color = "red";
    form.textContent = `Error: ${json.error} `;
  }

  const reselect = document.createElement("button");

  reselect.onclick = () => location.reload();
  reselect.type = "button";
  reselect.textContent = "再選択";

  form.appendChild(reselect);

  window.pgmObject = json;
};

submitButton.onclick = () => {
  const formData = new FormData();

  formData.append("pgm", fileInput.files[0]);

  fetch("/readPgm", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => handleJSON(json));
};
