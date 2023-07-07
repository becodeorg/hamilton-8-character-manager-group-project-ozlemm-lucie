import { salut } from './salut.js';
salut()

const postName = (new URLSearchParams(window.location.search)).get('id');
const nameHeroUpdate = document.querySelector(".input_name_hero_update");
const shortDescription = document.querySelector(".input_short_description_update")
const description = document.querySelector(".input_description_update");
const buttonEdit = document.querySelector(".button_edit");
const fileSelector = document.querySelector('.uploadImage');
const card = document.querySelector(".card_update");
let inputImage;

fileSelector.addEventListener('change', handleFileChange);
buttonEdit.addEventListener('click', handleButtonEditClick);

fetchCharacterData();

function handleFileChange(event) {
  const fileList = event.target.files;
  console.log(fileList);

  readImage(fileList[0]);
}

function handleButtonEditClick(event) {
  event.preventDefault(); // Empêche le comportement par défaut du bouton

  // Récupération des valeurs des champs de saisie
  const inputName = nameHeroUpdate.value;
  const inputShortDescription = shortDescription.value;
  const inputDescription = description.value;

  // Création d'un nouvel objet character avec les valeurs saisies
  const newCharacter = {
    name: inputName,
    shortDescription: inputShortDescription,
    image: inputImage,
    description: inputDescription,
  };

  console.log(newCharacter); // Affiche le nouvel objet character dans la console

  updateCharacter(newCharacter); // Appelle la fonction updateCharacter avec le nouvel objet character en argument
}

function fetchCharacterData() {
  // Récupération des données des personnages depuis une API
  fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(characters => {
      const character = characters.find(element => element.id === postName); // Recherche le personnage correspondant à postName

      if (character) {
        displayCharacterData(character); // Affiche les données du personnage trouvé
      }
    })
    .catch(error => {
      console.error("Error:", error); // Affiche une erreur en cas de problème avec la requête
    });
}

function displayCharacterData(character) {
  // Affiche les données du personnage dans les champs de saisie
  nameHeroUpdate.value = character.name;
  shortDescription.value = character.shortDescription;
  description.value = character.description;

  const imageUpdate = document.createElement('img');
  imageUpdate.src = 'data:image/gif;base64,' + character.image;
  imageUpdate.classList.add("image_update");

  const existingImage = card.querySelector('.image_update');
  if (existingImage) {
    card.replaceChild(imageUpdate, existingImage); // Remplace l'image existante par la nouvelle image
  } else {
    card.appendChild(imageUpdate); // Ajoute l'image à la carte
  }
}

function readImage(file) {
  if (file.type && !file.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    inputImage = event.target.result.split(',')[1]; // Lit le contenu de l'image et extrait les données encodées en base64
  });

  reader.readAsDataURL(file); // Lit le fichier en tant que données URL
}

function updateCharacter(character) {
  // Met à jour les données du personnage en faisant une requête PUT à l'API
  fetch("https://character-database.becode.xyz/characters/" + postName, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character), // Convertit l'objet character en JSON et l'envoie dans le corps de la requête
  })
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(result => {
      console.log("Success:", result); // Affiche la réponse en cas de succès
      window.location.href = "../index.html"; // Redirige vers la page d'accueil
    })
    .catch(error => {
      console.error("Error:", error); // Affiche une erreur en cas de problème avec la requête
    });
}