const card = document.querySelector(".card_single_creation");
const buttonDelete = document.querySelector(".delete_character");
document.querySelector(".uploadImage").onchange = function (e) {
  // Appelle la fonction "loadFile" en passant l'événement "e" en argument
  loadFile(e);
};

// Définition de la fonction "loadFile" avec l'argument "e"
function loadFile(e) {
  // Sélectionne l'élément HTML avec la classe "image_creation" et le stocke dans la variable "output"
  let output = document.querySelector(".image_creation");
  // Définit la source de l'image de sortie en utilisant l'URL de l'objet cible du fichier sélectionné
  output.src = URL.createObjectURL(e.target.files[0]);
  // Ajoute un gestionnaire d'événements "onload" à l'élément "output"
  output.onload = function () {
    // Révoque l'URL de l'objet source pour libérer la mémoire
    URL.revokeObjectURL(output.src);
  };
}

const fileSelector = document.querySelector(".uploadImage");
fileSelector.addEventListener("change", (event) => {
  // Récupère la liste des fichiers sélectionnés dans l'événement
  const fileList = event.target.files;
  console.log(fileList);
  // Appelle la fonction "readImage" en passant le premier fichier de la liste en argument
  readImage(fileList[0]);
});

// Définition de la fonction "readImage" avec l'argument "file"
function readImage(file) {
  // Vérifie si le type de fichier n'est pas une image
  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image.", file.type, file);
    return;
  }

  // Crée une nouvelle instance de FileReader
  const reader = new FileReader();

  // Ajoute un écouteur d'événements "load" au lecteur FileReader
  reader.addEventListener("load", (event) => {
    // Divise la résultat de lecture en utilisant la virgule comme séparateur et récupère la deuxième partie (base64 de l'image)
    inputImage = event.target.result.split(",")[1];
  });

  // Lit le contenu du fichier en tant que données URL
  reader.readAsDataURL(file);
}

// Sélectionne l'élément HTML avec l'ID "save_changes" et le stocke dans la variable "creationButton"
const creationButton = document.querySelector("#save_changes");


creationButton.addEventListener("click", function (event) {
  // Empêche le comportement par défaut de l'événement (dans ce cas, soumettre un formulaire)
  event.preventDefault();

  const url = "https://character-database.becode.xyz/characters";
  let name = document.querySelector(".input_name_hero");
  let shortDescription = document.querySelector(".short_description_creation");
  let description = document.querySelector(".input_description");

  // Récupère les valeurs des champs de saisie
  let inputName = name.value;
  let inputShortDescription = shortDescription.value;
  let inputDescription = description.value;

  // Crée un nouvel objet "newCharacter" avec les propriétés spécifiées
  const newCharacter = {
    name: inputName,
    shortDescription: inputShortDescription,
    image: inputImage, // Cette variable doit être définie ailleurs dans le code
    description: inputDescription,
  };

  console.log(newCharacter);

  // Envoie une requête POST à l'URL spécifiée avec les données de "newCharacter" en tant que corps de la requête
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json()) 
    .then((result) => {
      console.log("Success:", result);
      // Redirige l'utilisateur vers "../index.html" après avoir enregistré avec succès le personnage
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Définition de la fonction "setupCounter" avec les arguments "textBx" et "counter"
function setupCounter(textBx, counter) {
  // Récupère la valeur de l'attribut "maxlength" de l'élément "textBx" et la stocke dans la variable "maxlength"
  const maxlength = textBx.getAttribute("maxlength");

  // Associe une fonction à l'événement "onkeyup" de l'élément "textBx"
  textBx.onkeyup = () => {
    // Calcule la différence entre la longueur de la valeur saisie et la valeur maximale autorisée
    counter.innerText = maxlength - textBx.value.length;
  };
}

const textBx = document.querySelector(".textBx");
const counter = document.querySelector(".counter");

// Appelle la fonction "setupCounter" en passant les éléments "textBx" et "counter" en arguments
setupCounter(textBx, counter);

const textBx2 = document.querySelector(".textBx2");
const counter2 = document.querySelector(".counter2");

// Appelle la fonction "setupCounter" en passant les éléments "textBx2" et "counter2" en arguments
setupCounter(textBx2, counter2);

const textBx3 = document.querySelector(".textBx3");
const counter3 = document.querySelector(".counter3");

// Appelle la fonction "setupCounter" en passant les éléments "textBx3" et "counter3" en arguments
setupCounter(textBx3, counter3);

