window.onload=async function(){const{total_co2:t,green_step:o}=await(async()=>{const t=await fetch("https://api-co2.cubbit.io/saved"),o=await t.json(),{total_co2:e,green_step:c}=o;return console.log(o),{total_co2:e,green_step:c}})();if(t&&document.querySelectorAll(".total_co2").forEach(((o,e)=>{o.innerHTML=t})),o){document.querySelectorAll(".dot").forEach(((t,e)=>{e<o&&t.classList.add("completed"),e===o&&t.classList.add("load")}));const t=()=>(o+.5)/7*100;document.getElementById("co2_progress_bar").style.width=t()}};