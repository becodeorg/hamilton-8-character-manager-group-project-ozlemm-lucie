const postName = (new URLSearchParams(window.location.search)).get('id');
const nameHeroUpdate = document.querySelector(".input_name_hero_update");
const shortDescription = document.querySelector(".input_short_description_update")
const description = document.querySelector(".input_description_update");
const buttonEdit = document.querySelector(".button_edit")

document.querySelector('.uploadImage').onchange = function(e)
{
    loadFile(e);
}

let loadFile= function(e)
{
    let output = document.querySelector('.image_update');
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) 
      }
}


const update = fetch("https://character-database.becode.xyz/characters")
    .then((id) => id.json())
    .then((id) => {
        for (let elements of id ){
            if (elements.id === postName){
                nameHeroUpdate.value = elements.name
                shortDescription.value = elements.shortDescription
                description.value = elements.description
                imageUpdate.src=  'data:image/gif;base64,' + elements.image;
                image.classList.add("image_update");
            }
        }
    })


const card = document.querySelector(".card_update");
let inputImage;

const fileSelector = document.querySelector('.uploadImage');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  console.log(fileList);

  readImage(fileList[0]);
});

function readImage(file) {
  if (file.type && !file.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    inputImage = event.target.result.split(',')[1];;
  });

  reader.readAsDataURL(file);
}

buttonEdit.addEventListener("click", function (event) {

  event.preventDefault();
  let inputName = nameHeroUpdate.value;
  let inputShortDescription = shortDescription.value;
  let inputDescription = description.value;

  const newCharacter = {
    name: inputName,
    shortDescription: inputShortDescription,
    image: inputImage,
    description: inputDescription,
  }

  console.log(newCharacter) //ok
  fetch("https://character-database.becode.xyz/characters/" + postName, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })

    .then(response => response.json())
    .then(result => {
      console.log("Success:", result);
      window.location.href = "../index.html";
    })
 
    .catch(error => {
      console.error("Error:", error);
    });
})
