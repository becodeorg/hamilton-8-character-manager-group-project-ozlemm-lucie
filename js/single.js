// Récupération de l'ID du personnage à partir de l'URL
const postName = (new URLSearchParams(window.location.search)).get('id');

// Sélection des éléments du DOM
const nameHeroSingle = document.querySelector(".name_hero_single");
const shortDescription = document.querySelector(".short_description_single");
const description = document.querySelector(".description_single");
const imageSingle = document.querySelector(".image_single");
const buttonD = document.querySelector(".button_delete");

// Association de la fonction buttonDelete à l'événement onclick du bouton de suppression
buttonD.onclick = buttonDelete;

// Appel de la fonction pour afficher la carte du personnage
displayCardSingle();

// Fonction pour afficher la carte du personnage
function displayCardSingle() {
  // Effectue une requête GET pour récupérer les données des personnages
  fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json())
    .then(characters => {
      // Recherche le personnage correspondant à l'ID "postName" dans la liste des personnages
      const character = characters.find(char => char.id === postName);
      if (character) {
        // Sélectionne l'élément HTML avec la classe "button_update" et met à jour son attribut "href" pour rediriger vers la page de mise à jour avec l'ID du personnage
        const buttonUpdate = document.querySelector(".button_update");
        buttonUpdate.href = `../pages/update.html?id=${character.id}`;

        // Sélectionne les éléments HTML avec les classes correspondantes et met à jour leur contenu avec les données du personnage
        nameHeroSingle.innerText = character.name;
        shortDescription.innerText = character.shortDescription;
        description.innerText = character.description;

        // Met à jour la source de l'image avec les données de l'image du personnage
        imageSingle.src = `data:image/gif;base64,${character.image}`;

        // Ajoute la classe "image_single" à l'élément "imageSingle"
        imageSingle.classList.add("image_single");
      }
    });
}

// Fonction pour gérer le clic sur le bouton de suppression
function buttonDelete() {
  // Effectue une requête DELETE à l'URL spécifiée avec l'ID "postName" pour supprimer le personnage
  fetch("https://character-database.becode.xyz/characters/" + postName, {
    method: "DELETE",
  })
    .then(response => {
      if (response.ok) {
        console.log("bien supprimé");
      } else {
        console.log("pas supprimé error");
      }
    })
    .then(result => {
      console.log("Success:", result);

      // Redirection vers une autre page (à modifier)
      window.location.href = "../index.html";
    })
    .catch(error => {
      console.error("erreur :", error);
    });
}



