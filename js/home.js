const container_cards = document.querySelector(".container");
const search = document.querySelector("#site-search");

fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json())
    .then(cards => {
        const originalCards = cards; // Conservez une copie des cartes originales

        // Fonction de filtrage basée sur le nom du héros
        const filterCards = searchTerm => {
            const filteredCards = originalCards.filter(hero =>
                hero.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Supprimer les cartes existantes du conteneur
            while (container_cards.firstChild) {
                container_cards.removeChild(container_cards.firstChild);
            }

            // Ajouter les nouvelles cartes filtrées au conteneur
            for (const hero of filteredCards) {
                const div_card = document.createElement("div");
                container_cards.appendChild(div_card);
                const image = document.createElement("img");
                image.src = 'data:image/gif;base64,' + hero.image;
                image.classList.add("image");
                const nameHero = document.createElement("div");
                const description = document.createElement("p");
                div_card.appendChild(image);
                div_card.appendChild(nameHero);
                div_card.appendChild(description);
                div_card.classList.add('card');
                nameHero.classList.add("name_hero");
                description.classList.add("description");
                nameHero.innerText = hero.name;
                description.innerText = hero.description;
                const see = document.createElement("a");
                see.innerText = 'See Character';
                see.classList.add("see");
                div_card.appendChild(see);
                see.href = "../pages/single.html?id=" + hero['id'];
            }
        };

        // Événement d'écoute sur l'entrée dans le champ de recherche
        search.addEventListener("input", event => {
            const searchTerm = event.target.value;
            filterCards(searchTerm);
        });

        // Afficher toutes les cartes initiales au chargement de la page
        filterCards("");
    });




    


