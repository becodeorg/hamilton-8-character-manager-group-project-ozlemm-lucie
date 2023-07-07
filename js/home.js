// Sélection des éléments du DOM
const container_cards = document.querySelector(".container");
const search = document.querySelector("#site-search");

// Tableau pour stocker les cartes originales
let originalCards = [];

// Fonction pour effectuer la requête et obtenir les données des cartes
function fetchCardsData() {
  return fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json());
}

// Fonction de filtrage des cartes en fonction du terme de recherche
function filterCards(searchTerm) {
  const filteredCards = originalCards.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Supprimer les cartes existantes du conteneur
  container_cards.innerHTML = "";

  // Ajouter les nouvelles cartes filtrées au conteneur
  filteredCards.forEach(hero => {
    const div_card = createCardElement(hero);
    container_cards.appendChild(div_card);
  });
}

// Fonction pour créer un élément de carte à partir des données d'un héros
function createCardElement(hero) {
  const div_card = document.createElement("div");
  div_card.classList.add('card');

  const image = document.createElement("img");
  image.classList.add("image");
  image.src = `data:image/gif;base64,${hero.image}`;

  const nameHero = document.createElement("div");
  nameHero.classList.add("name_hero");
  nameHero.innerText = hero.name;

  const description = document.createElement("p");
  description.classList.add("description");
  description.innerText = hero.description;

  const see = document.createElement("a");
  see.classList.add("see");
  see.innerText = 'See Character';
  see.href = `../pages/single.html?id=${hero.id}`;

  div_card.append(image, nameHero, description, see);
  return div_card;
}

// Fonction pour gérer l'événement d'entrée dans le champ de recherche
function handleSearchInput(event) {
  const searchTerm = event.target.value;
  filterCards(searchTerm);
}

// Écoute de l'événement d'entrée dans le champ de recherche
search.addEventListener("input", handleSearchInput);

// Fonction pour afficher toutes les cartes initiales au chargement de la page
function displayAllCards() {
  filterCards("");
}

// Appel de la fonction pour récupérer les données des cartes et afficher toutes les cartes initiales
fetchCardsData()
  .then(cards => {
    originalCards = cards;
    displayAllCards();
  });
