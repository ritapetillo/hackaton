window.onload=async function(){consent.checked||(submit.disabled=!0);const e=[0,35,367,423,1186,2565,4845],{total_co2:t,green_step:n}=await(async()=>{const e=await fetch("https://api-co2.cubbit.io/saved"),t=await e.json(),{total_co2:n,green_step:o}=t;return console.log(t),{total_co2:n,green_step:o}})();if(t&&document.querySelectorAll(".total_co2").forEach(((e,n)=>{e.innerHTML=t})),n){document.querySelectorAll(".dot").forEach(((e,t)=>{t<n&&e.classList.add("completed"),t===n&&e.classList.add("load")}));const o=()=>0===n?0:(n+(t-e[n])/(e[n+1]-e[n]))/(e.length-1)*100;document.getElementById("co2_progress_bar").style.width=`calc(${o()}% + 10px)`}Webflow.push((()=>{if("/"===window.location.pathname||"/it"===window.location.pathname){const e=document.getElementById("email"),t=document.getElementById("consent_check"),n=document.getElementById("submit"),o=document.getElementById("errorMsg");t.addEventListener("change",(()=>{t.checked?n.disabled=!1:n.disabled=!0})),n.addEventListener("click",(async n=>{if(!t.value)return n.preventDefault(),void(o.innerHTML="Please accept the consent");if(!e.value)return n.preventDefault(),void(o.innerHTML="Please enter your email");const a={email:e.value,referral_code:""},c=await fetch("https://api-co2.cubbit.io/save",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json",Accept:"application/json"}}),i=await c.json();if(!i)throw o.innerHTML="Something went wrong",new Error(c.statusText);if(i?.error)throw o.innerHTML=i.message,new Error(i.error);window.location.href=`/thank-you?referral_code=${i.referral_code}`}))}})),Webflow.push((()=>{-1!==window.location.pathname.indexOf("/thank-you")&&SocialShareKit.init()}))};