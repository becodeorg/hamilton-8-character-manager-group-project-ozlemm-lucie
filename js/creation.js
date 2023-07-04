const card = document.querySelector(".card_single_creation");
const buttonDelete = document.querySelector(".delete_character");
let api = "https://character-database.becode.xyz/";

document.querySelector(".uploadImage").onchange = function (e) {
  loadFile(e);
};

let loadFile = function (e) {
  let output = document.querySelector(".image_creation");
  output.src = URL.createObjectURL(e.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
};

let inputImage;

//Variable qui va chercher input type = file
const fileSelector = document.querySelector(".uploadImage");
//On écoute l'évènement change de fileSelector
fileSelector.addEventListener("change", (event) => {
  //Variable qui permet d'accéder aux fichiers capté par input type = file
  const fileList = event.target.files;
  //Log les metadata des fichiers
  console.log(fileList);

  readImage(fileList[0]);
});

function readImage(file) {
  // Vérifie que le fichier est une image.
  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image.", file.type, file);
    return;
  }

  const reader = new FileReader();

  //On écoute n'évènement load de reader
  reader.addEventListener("load", (event) => {
    inputImage = event.target.result.split(",")[1];
  });

  reader.readAsDataURL(file);
}

//Configurer le bouton permettant l'envoi des infos vers l'API
//Variable pour cibler le bouton
const creationButton = document.querySelector("#save_changes");

//Configurer le bouton pour faire que lorsqu'on clique dessus, cela envoi les données vers l'API
creationButton.addEventListener("click", function (event) {
  //Empêche le comportement par défaut du bouton, à savoir, recharger la page
  event.preventDefault();
  //Déclare l'adresse de l'API
  const url = "https://character-database.becode.xyz/characters";
  //Déclare des variables pour récupérer chaque élément (en l'occurence: input, sauf textearea)

  let name = document.querySelector(".input_name_hero");
  let shortDescription = document.querySelector(".short_description_creation");
  let contenu = tinymce.activeEditor.getContent();
  let contenuSansBalises = contenu.replace(/<[^>]+>/g, '');

  //Déclare des variables récupérant les données entrées par l'utilisateur

  let inputName = name.value;
  let inputShortDescription = shortDescription.value;
 

  //Construire l'objet avec les valeurs du formulaire, en accord avec le contrat de l'API (défini dans une doc)

  const newCharacter = {
    name: inputName,
    shortDescription: inputShortDescription,
    image: inputImage,
    description: contenuSansBalises
  };
  //Vérification que les étapes précédentes fonctionnent
  console.log(newCharacter); //ok
  //Fetch va chercher dans l'url définie par la variable
  fetch(url, {
    //POST car on va ajouter des données dans l'API, et c'est surtout ainsi que la documentation de l'API demande de le faire, c'est différent selon l'API
    method: "POST",
    //Le header défini que les données qu'on envoi seront en format JSON (metadata, complément d'information à destination de l'API)
    headers: {
      "Content-Type": "application/json",
    },
    //Transforme les données envoyées en string format JSON dans le body (qui est le corps de la requête, ce que j'envoi effectivement à l'API)
    body: JSON.stringify(newCharacter),
  })
    //Traitement de la réponse:
    //Then = le bloc précédent a répondu et on défini quoi faire ensuite
    //response = TOUTE la réponse du serveur, puis on spécifie qu'on ne veut que la partie JSON
    .then((response) => response.json())
    //Quand on a reçu les données JSON demandées, on demande de log le message "Success" et la réponse
    .then((result) => {
      console.log("Success:", result);

      // Redirection vers une autre page
      // TODO: la bonne page
      window.location.href = "../index.html";
    })
    //Catch intercepte une erreur s'il y en a
    .catch((error) => {
      // Puis log le message "ERROR" et une erreur résultant de mon fetch (404, pas de network, etc.)
      console.error("Error:", error);
    });
});

//---------------- competeur de lettres

//name

let textBx = document.querySelector(".textBx");
let counter = document.querySelector(".counter");

maxlength = textBx.getAttribute("maxlength");
textBx.onkeyup = () => {
  counter.innerText = maxlength - textBx.value.length;
};

//short description

let textBx2 = document.querySelector(".textBx2");
let counter2 = document.querySelector(".counter2");
let maxlength2 = textBx2.getAttribute("maxlength");

textBx2.onkeyup = () => {
  counter2.innerText = maxlength2 - textBx2.value.length;
};

// description

let textBx3 = document.querySelector(".textBx3");
let counter3 = document.querySelector(".counter3");
let maxlength3 = textBx3.getAttribute("maxlength");

textBx3.onkeyup = () => {
  counter3.innerText = maxlength3 - textBx3.value.length;
};


