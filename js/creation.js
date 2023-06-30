const card = document.querySelector(".card_single_creation");
const image = document.querySelector(".image_creation");
const uploadImage = document.querySelector(".upload_image");
const textUser = document.querySelector(".text_user");
const buttonDelete = document.querySelector(".delete_character");
let Api = "https://character-database.becode.xyz/";



document.querySelector('#save_changes').onclick=function(e)
{
    e.preventDefault();
    let block = false;
    let inputs =document.querySelectorAll('input');
    for (input of inputs)
    {
        if(input.value =="")
        {
         input.style.background = 'red';
         block = true;
        }
    }

    if(block == false)
    {
        const nameHero = document.querySelector(".input_name_hero").value;
        const shortDescription = document.querySelector(".input_short_description").value;
        const description = document.querySelector(".input_description").value;

        (async () => {
            const rawResponse = await fetch(Api+ "characters", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                name: nameHero,
                shortDescription:shortDescription,
                description : description
            }) 
            });
          })();

    }
}





  
