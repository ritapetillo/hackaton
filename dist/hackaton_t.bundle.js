window.onload=async function(){const e=[0,35,367,423,1186,2565,4845],t=document.getElementById("loader"),o=new URLSearchParams(window.location.search).get("referral_code"),r={"Content-Type":"application/json",Accept:"application/json","x-co2-challenge-lng":Weglot.getCurrentLang()},{total_co2:n,green_step:a}=await(async()=>{const e=await fetch("https://api-co2.cubbit.io/saved"),t=await e.json(),{total_co2:o,green_step:r}=t;return console.log(t),{total_co2:o,green_step:r}})();if(n&&document.querySelectorAll(".total_co2").forEach(((e,t)=>{e.innerHTML=n})),t.style.display="none",a){document.querySelectorAll(".dot").forEach(((e,t)=>{t<a&&e.classList.add("completed"),t===a&&e.classList.add("load")}));const t=()=>{const t=(n-e[a])/(e[a]-e[a+1]),o=(e=>0===e?0:1===e?.04:(4+16.6*(e-1))/100)(a)+t;return o};console.log(t()),document.getElementById("co2_progress_bar").style.width=`${t()}%`}Webflow.push((()=>{if("/removemyco2"===window.location.pathname||"/it/removemyco2"===window.location.pathname){const e=document.getElementById("email"),t=document.getElementById("consent_check"),n=document.getElementById("submit"),a=document.getElementById("errorMsg");t.checked||(n.disabled=!0),t.addEventListener("change",(()=>{t.checked?n.disabled=!1:n.disabled=!0})),n.addEventListener("click",(async n=>{if(!t.value)return n.preventDefault(),void(a.innerHTML="Please accept the consent");if(!e.value)return n.preventDefault(),void(a.innerHTML="Please enter your email");const c={email:e.value,referral_code:o||""},i=await fetch("https://api-co2.cubbit.io/save",{method:"POST",body:JSON.stringify(c),headers:r}),s=await i.json();if(!s)throw a.innerHTML="Something went wrong",new Error(i.statusText);if(s?.error)throw a.innerHTML=s.message,new Error(s.error);window.location.href=`./removemyco2/thank-you?referral_code=${s.referral_code}`}))}})),Webflow.push((async()=>{if(-1!==window.location.pathname.indexOf("/thank-you")){o||(window.location.href="/removemyco2");const{total_co2_user:e}=await(async e=>{const t=await fetch(`https://api-co2.cubbit.io/saved?email=${e}`),o=await t.json(),{total_co2:r,green_step:n}=o;return{total_co2_user:r}})(o),t=(e=>{e>20&&(e=20);let t="";for(let o=0;o<e;o++)t+="🌳";return t})(e);document.getElementById("link-subscribe").href+=`?referral_code=${o}`;const n=`${t.toString()} I've saved ${e} kg of CO2. Help me complete all steps here https://cubbit.io/removemyco2?referral_code=${o}`;document.getElementById("total_co2_user").innerHTML=e;const a={fbShareLink:`https://www.facebook.com/sharer/sharer.php?u=https://cubbit.io/removemyco2?referral_code=${o}&quote=${n}`,twShareLink:`https://twitter.com/intent/tweet?text=${n}&url=https://cubbit.io/removemyco2?referral_code=${o}`,liShareLink:`https://www.linkedin.com/sharing/share-offsite/?url=https://cubbit.io/removemyco2?referral_code=${o}&quote=${n}`,reShareLink:`https://www.reddit.com/submit?url=https://cubbit.io/removemyco2?referral_code=${o}&title=${n}`,waShareLink:`https://wa.me/?text=${n}`},c=e=>{switch(e){case"fbShareLink":return"facebook";case"twShareLink":return"twitter";case"liShareLink":return"linkedin";case"reShareLink":return"reddit";case"emailShareLink":return"email";case"waShareLink":return"whatsapp";default:return""}},i=async e=>{const t=c(e);return await fetch("https://api-co2.cubbit.io/save-social",{method:"POST",body:JSON.stringify({email:o,social_media:t,amount:1}),headers:r}),"Sent"};Object.keys(a).forEach((e=>{document.getElementById(e).addEventListener("click",(()=>{window.open(a[e],"_blank");const t=i(e);t&&console.log(t)}))}));const s=()=>navigator.clipboard.writeText(`https://cubbit.io/removemyco2?referral_code=${o}`);document.getElementById("copy_btn").addEventListener("click",(()=>{s(),Toastify({text:"Copied to clipboard",position:"bottom-center",backgroundColor:"linear-gradient(to right, #00b09b, #96c93d)",gravity:"top",duration:1e3}).showToast()}))}}))};