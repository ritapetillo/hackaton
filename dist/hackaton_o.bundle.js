window.onload=async function(){const t=document.querySelector("#hackathon-form"),e=[0,35,367,423,1186,2565,4845],{total_co2:o,green_step:c}=await(async()=>{const t=await fetch("https://api-co2.cubbit.io/saved"),e=await t.json(),{total_co2:o,green_step:c}=e;return console.log(e),{total_co2:o,green_step:c}})();if(o&&document.querySelectorAll(".total_co2").forEach(((t,e)=>{t.innerHTML=o})),c){document.querySelectorAll(".dot").forEach(((t,e)=>{e<c&&t.classList.add("completed"),e===c&&t.classList.add("load")}));const t=()=>0===c?0:(c+(o-e[c])/(e[c+1]-e[c]))/(e.length-1)*100;document.getElementById("co2_progress_bar").style.width=`calc(${t()}% + 10px)`}t.addEventListener("submit",(async e=>{e.preventDefault();const o=new FormData(t),c={};o.forEach(((t,e)=>{c[e]=t})),console.log(c)}))};