window.onload=async function(){const e=[0,35,367,423,1186,2565,4845],t=document.getElementById("loader"),{total_co2:o,green_step:n}=await(async()=>{const e=await fetch("https://api-co2.cubbit.io/saved"),t=await e.json(),{total_co2:o,green_step:n}=t;return console.log(t),{total_co2:o,green_step:n}})();if(o&&document.querySelectorAll(".total_co2").forEach(((e,t)=>{e.innerHTML=o})),t.style.display="none",n){document.querySelectorAll(".dot").forEach(((e,t)=>{t<n&&e.classList.add("completed"),t===n&&e.classList.add("load")}));const t=()=>0===n?0:(n+(o-e[n])/(e[n+1]-e[n]))/(e.length-1)*100;document.getElementById("co2_progress_bar").style.width=`calc(${t()}% + 10px)`}Webflow.push((()=>{if("/removemyco2"===window.location.pathname||"/it/removemyco2"===window.location.pathname){const e=window.location.search.split("=")[1],t=document.getElementById("email"),o=document.getElementById("consent_check"),n=document.getElementById("submit"),r=document.getElementById("errorMsg");o.checked||(n.disabled=!0),o.addEventListener("change",(()=>{o.checked?n.disabled=!1:n.disabled=!0})),n.addEventListener("click",(async n=>{if(!o.value)return n.preventDefault(),void(r.innerHTML="Please accept the consent");if(!t.value)return n.preventDefault(),void(r.innerHTML="Please enter your email");const a={email:t.value,referral_code:e||""},c=await fetch("https://api-co2.cubbit.io/save",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json",Accept:"application/json"}}),i=await c.json();if(!i)throw r.innerHTML="Something went wrong",new Error(c.statusText);if(i?.error)throw r.innerHTML=i.message,new Error(i.error);window.location.href=`./removemyco2/thank-you?referral_code=${i.referral_code}`}))}})),Webflow.push((async()=>{if(-1!==window.location.pathname.indexOf("/thank-you")){const e=window.location.search.split("=")[1];e||(window.location.href="/removemyco2");const{total_co2_user:t}=await(async e=>{const t=await fetch(`https://api-co2.cubbit.io/saved?email=${e}`),o=await t.json(),{total_co2:n,green_step:r}=o;return{total_co2_user:n}})(e),o=(e=>{e>20&&(e=20);let t="";for(let o=0;o<e;o++)t+="🌳";return t})(t);document.getElementById("link-subscribe").href+=`?referral_code=${e}`;const n=`${o.toString()} I've saved ${t} kg of CO2. Help me complete all steps here https://cubbit.io/removemyco2?referral_code=${e}`;document.getElementById("total_co2_user").innerHTML=t;const r={fbShareLink:`https://www.facebook.com/sharer/sharer.php?u=https://cubbit.io/removemyco2?referral_code=${e}&quote=${n}`,twShareLink:`https://twitter.com/intent/tweet?text=${n}&url=https://cubbit.io/removemyco2?referral_code=${e}`,liShareLink:`https://www.linkedin.com/sharing/share-offsite/?url=https://cubbit.io/removemyco2?referral_code=${e}&quote=${n}`,reShareLink:`https://www.reddit.com/submit?url=https://cubbit.io/removemyco2?referral_code=${e}&title=${n}`,emailShareLink:`mailto:?body=${n}&subject="Save CO2 from the Environment`},a=e=>{switch(e){case"fbShareLink":return"facebook";case"twShareLink":return"twitter";case"liShareLink":return"linkedin";case"reShareLink":return"reddit";case"emailShareLink":return"email";default:return""}},c=async t=>{const o=a(t);return await fetch("https://api-co2.cubbit.io/save-social",{method:"POST",body:JSON.stringify({email:e,social_media:o,amount:1}),headers:{"Content-Type":"application/json",Accept:"application/json"}}),"Sent"};Object.keys(r).forEach((e=>{document.getElementById(e).addEventListener("click",(()=>{window.open(r[e],"_blank");const t=c(e);t&&console.log(t)}))}));const i=()=>navigator.clipboard.writeText(`https://cubbit.io/removemyco2?referral_code=${e}`);document.getElementById("copy_btn").addEventListener("click",(()=>{i()}))}}))};