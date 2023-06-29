const container_cards = document.querySelector(".container");

const cards = fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json())
    .then((cards =>{
        for (hero of cards){
            div_card = document.createElement("div");
            container_cards.appendChild(div_card);
            image = document.createElement("img");
            nameHero = document.createElement("div");
            description = document.createElement("p");
            see = document.createElement("a");
            see.innerText = 'See Character';
            div_card.appendChild(image);
            div_card.appendChild(nameHero);
            div_card.appendChild(description);
            div_card.appendChild(see);
            div_card.classList.add('card');
            image.classList.add("image");
            nameHero.classList.add("name_hero");
            nameHero.innerText = hero.name;
            description.classList.add("description");
            description.innerText = hero.description;
            see.classList.add("see");
            console.log(cards);
        }
    }))



    


