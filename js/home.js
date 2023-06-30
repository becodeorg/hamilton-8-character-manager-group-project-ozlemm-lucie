const container_cards = document.querySelector(".container");


const cards = fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json())
    .then((cards => {
        for (hero of cards){
            div_card = document.createElement("div");
            container_cards.appendChild(div_card);
            image = document.createElement("img");
            image.src=  'data:image/gif;base64,' + hero.image;
            image.classList.add("image");
            nameHero = document.createElement("div");
            description = document.createElement("p");
            div_card.appendChild(image);
            div_card.appendChild(nameHero);
            div_card.appendChild(description);
            div_card.classList.add('card');
            nameHero.classList.add("name_hero");
            description.classList.add("description");
            nameHero.innerText = hero.name;
            description.innerText = hero.description;
            see = document.createElement("a");
            see.innerText = 'See Character';
            see.classList.add("see");
            div_card.appendChild(see)
            see.href = "../pages/single.html?id=" + hero['id'];
        }
    }))




    


