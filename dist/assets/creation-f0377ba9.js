import"./modulepreload-polyfill-3cfb730f.js";import"./main-7fde7c6c.js";document.querySelector(".card_single_creation");document.querySelector(".delete_character");document.querySelector(".uploadImage").onchange=function(e){d(e)};function d(e){let t=document.querySelector(".image_creation");t.src=URL.createObjectURL(e.target.files[0]),t.onload=function(){URL.revokeObjectURL(t.src)}}const m=document.querySelector(".uploadImage");m.addEventListener("change",e=>{const t=e.target.files;console.log(t),p(t[0])});function p(e){if(e.type&&!e.type.startsWith("image/")){console.log("File is not an image.",e.type,e);return}const t=new FileReader;t.addEventListener("load",o=>{inputImage=o.target.result.split(",")[1]}),t.readAsDataURL(e)}const g=document.querySelector("#save_changes");g.addEventListener("click",function(e){e.preventDefault();const t="https://character-database.becode.xyz/characters";let o=document.querySelector(".input_name_hero"),u=document.querySelector(".short_description_creation"),a=document.querySelector(".input_description"),i=o.value,l=u.value,s=a.value;const r={name:i,shortDescription:l,image:inputImage,description:s};console.log(r),fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(n=>n.json()).then(n=>{console.log("Success:",n),window.location.href="../index.html"}).catch(n=>{console.error("Error:",n)})});function c(e,t){const o=e.getAttribute("maxlength");e.onkeyup=()=>{t.innerText=o-e.value.length}}const h=document.querySelector(".textBx"),y=document.querySelector(".counter");c(h,y);const S=document.querySelector(".textBx2"),q=document.querySelector(".counter2");c(S,q);const x=document.querySelector(".textBx3"),f=document.querySelector(".counter3");c(x,f);