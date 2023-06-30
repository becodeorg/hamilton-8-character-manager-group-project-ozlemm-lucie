const postName = (new URLSearchParams(window.location.search)).get('id');
console.log(postName)
const nameHeroSingle = document.querySelector(".name_hero_single");
const shortDescription = document.querySelector(".short_description_single")
const description = document.querySelector(".description_single");


const single = fetch("https://character-database.becode.xyz/characters")
    .then((id) => id.json())
    .then((id) => {
        for (let elements of id ){
            if (elements.id === postName){
                nameHeroSingle.innerText = elements.name
                shortDescription.innerText = elements.shortDescription
                description.innerText = elements.description
            }
        }
    })