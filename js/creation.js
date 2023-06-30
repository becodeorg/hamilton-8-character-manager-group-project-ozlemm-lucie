const card = document.querySelector(".card_single_creation");
const image = document.querySelector(".image_creation");
const uploadImage = document.querySelector(".upload_image");
const nameHero = document.querySelector(".input_name_hero");
const shortDescription = document.querySelector(".input_short_description");
const description = document.querySelector(".input_description");
const textUser = document.querySelector(".text_user");
const buttonDelete = document.querySelector(".delete_character");
const buttonSave = document.querySelector(".save_changes");









buttonDelete.addEventListener("click", () => {
    fetch("https://character-database.becode.xyz/characters/" + postName, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok){
            console.log("bien supprimé");
        }
        else{
            console.log("pas supprimé error");
        }
    })
    .catch(error => {
        console.error("erreur :", error);
    });
});



  
