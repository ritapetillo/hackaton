window.onload=async function(){const e=document.getElementById("email"),t=document.getElementById("consent_check"),n=document.getElementById("submit"),o=document.getElementById("errorMsg");t.checked||(n.disabled=!0);const a=[0,35,367,423,1186,2565,4845],{total_co2:c,green_step:r}=await(async()=>{const e=await fetch("https://api-co2.cubbit.io/saved"),t=await e.json(),{total_co2:n,green_step:o}=t;return console.log(t),{total_co2:n,green_step:o}})();if(c&&document.querySelectorAll(".total_co2").forEach(((e,t)=>{e.innerHTML=c})),r){document.querySelectorAll(".dot").forEach(((e,t)=>{t<r&&e.classList.add("completed"),t===r&&e.classList.add("load")}));const e=()=>0===r?0:(r+(c-a[r])/(a[r+1]-a[r]))/(a.length-1)*100;document.getElementById("co2_progress_bar").style.width=`calc(${e()}% + 10px)`}Webflow.push((()=>{t.addEventListener("change",(()=>{t.checked?n.disabled=!1:n.disabled=!0})),n.addEventListener("click",(async n=>{if(!t.value)return n.preventDefault(),void(o.innerHTML="Please accept the consent");if(!e.value)return n.preventDefault(),void(o.innerHTML="Please enter your email");const a={email:e.value,referral_code:""},c=await fetch("https://api-co2.cubbit.io/save",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json",Accept:"application/json"}}),r=await c.json();if(console.log(r),!r)throw o.innerHTML="Something went wrong",new Error(c.statusText);if(r?.error)throw o.innerHTML=r.message,new Error(r.error)}))}))};