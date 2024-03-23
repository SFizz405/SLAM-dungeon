const submitButton = document.getElementById("submit");
const fileInput = document.getElementById("input");
const filename = document.getElementById("filename");
const form = document.getElementById("form");

const handleJSON = (json) => {
  if (!json.error) {
    form.removeChild(document.getElementById("uploadIcon"));
    form.removeChild(filename.parentElement);

    const threeJS = document.createElement("script");
    const name = document.createElement("input");
    const description = document.createElement("input");

    threeJS.src = "preview.js";
    threeJS.type = "module";

    name.type = "text";
    name.name = "name";
    name.placeholder = "マップの名前";

    description.type = "text";
    description.name = "description";
    description.placeholder = "マップの説明";

    document.body.appendChild(threeJS);
    form.prepend(description);
    form.prepend(name);

    submitButton.type = "submit";
    submitButton.textContent = "共有";
    submitButton.onclick = () => {};

    submitButton.style.width = "100%";

    form.style.backgroundColor = "rgb(20, 20, 20)";
    form.style.padding = "1em";
    form.style.borderRadius = "1em";

    document.body.style.alignItems = "start";
    document.body.style.justifyContent = "start";
  } else {
    form.style.color = "red";
    form.textContent = `Error: ${json.error} `;
  }

  const reselect = document.createElement("button");

  reselect.onclick = () => location.reload();
  reselect.type = "button";
  reselect.textContent = "再選択";

  reselect.classList.add("outline");
  reselect.style.fontSize = "1vw";
  reselect.style.width = "100%";

  form.appendChild(reselect);

  window.pgmObject = json;
};

submitButton.onclick = () => {
  if (fileInput.files[0]) {
    const formData = new FormData();

    formData.append("pgm", fileInput.files[0]);

    fetch("/readPgm", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => handleJSON(json));
  }
};

fileInput.onchange = () => {
  filename.textContent = fileInput.files[0].name;
};
