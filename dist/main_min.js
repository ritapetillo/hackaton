window.onload=async function(){const e=["https://uploads-ssl.webflow.com/611f84142709f0e312100b42/623c83e61e8699c260fe8cde_train.svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0e5db4a2394af922a51a_mail.svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0e5db81c1e04e19e3424_laptop.svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0f3879cf7742ff8e3078_socials.svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0f3e7646a8334f683920_power.svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0f3e2dec4192dbb3e935_car.svg"],t=[0,35,367,423,1186,2565,4845],o=document.getElementById("loader"),a=new URLSearchParams(window.location.search).get("referral_code"),c={"Content-Type":"application/json",Accept:"application/json","x-co2-challenge-lng":Weglot.getCurrentLang()},{total_co2:r,green_step:n}=await(async()=>{const e=await fetch("https://api-co2.cubbit.io/saved"),t=await e.json(),{total_co2:o,green_step:a}=t;return console.log(t),{total_co2:o,green_step:a}})();if(r&&document.querySelectorAll(".total_co2").forEach(((e,t)=>{e.innerHTML=r})),o.style.display="none",n){document.querySelector(".hackathon-img").src=e[n];const o=document.querySelectorAll(".hackton-grid-image"),a=["https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273dff47c67894b03b01_noun-train-1951016%202.svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273dfdfe85eabfded048_noun-news-518193%201%20(1).svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273dcbe2287aa77f7912_noun-laptop-1113563%201%20(1).svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273d256b60c2275a8178_Vector%20(5).svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273d21ad2318360f077a_Vector%20(6).svg","https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273d7fda693e5bd5ffc1_noun-car-1069217%201%20(1).svg]"];for(let e=0;e<n;e++)o[e].src=a[e];document.querySelectorAll(".dot").forEach(((e,t)=>{t<n&&e.classList.add("completed"),t==n&&e.classList.add("load")}));const c=()=>{const e=(o=(r-t[n])/(t[n+1]-t[n]),0===n?4*o/100:16.6*o/100);var o;const a=(e=>0===e?0:1===e?.04:(4+16.6*(e-1))/100)(n)+e;return console.log(a),a};console.log(c()),document.getElementById("co2_progress_bar").style.width=100*c()+"%"}Webflow.push((()=>{if("/removemyco2"===window.location.pathname||"/it/removemyco2"===window.location.pathname){const e=document.getElementById("email"),t=document.getElementById("consent_check"),o=document.getElementById("submit"),r=document.getElementById("errorMsg");t.checked||(o.disabled=!0),t.addEventListener("change",(()=>{t.checked?o.disabled=!1:o.disabled=!0}));const n=async o=>{if(!t.value)return o.preventDefault(),void(r.innerHTML="Please accept the consent");if(!e.value)return o.preventDefault(),void(r.innerHTML="Please enter your email");const n={email:e.value,referral_code:a||""},s=await fetch("https://api-co2.cubbit.io/save",{method:"POST",body:JSON.stringify(n),headers:c}),i=await s.json();if(!i)throw r.innerHTML="Something went wrong",new Error(s.statusText);if(i?.error)throw r.innerHTML=i.message,new Error(i.error);window.location.href=`./removemyco2/cubbit-partners-with-treedom?referral_code=${i.referral_code}`};e.addEventListener("keyup",n),o.addEventListener("click",n)}})),Webflow.push((async()=>{if(-1!==window.location.pathname.indexOf("/cubbit-partners-with-treedom")){a||(window.location.href="/removemyco2");const{total_co2_user:e}=await(async e=>{const t=await fetch(`https://api-co2.cubbit.io/saved?email=${e}`),o=await t.json(),{total_co2:a,green_step:c}=o;return{total_co2_user:a}})(a),t=(e=>{e>20&&(e=20);let t="";for(let o=0;o<e;o++)t+="🌳";return t})(e);document.getElementById("link-subscribe").href+=`?referral_code=${a}`;const o=`${t.toString()} I've saved ${e} kg of CO2. Help me complete all steps here https://cubbit.io/removemyco2?referral_code=${a}`;document.getElementById("total_co2_user").innerHTML=e;const r={fbShareLink:`https://www.facebook.com/sharer/sharer.php?u=https://cubbit.io/removemyco2?referral_code=${a}&quote=${o}`,twShareLink:`https://twitter.com/intent/tweet?text=${o}&url=https://cubbit.io/removemyco2?referral_code=${a}`,liShareLink:`https://www.linkedin.com/sharing/share-offsite/?url=https://cubbit.io/removemyco2?referral_code=${a}&quote=${o}`,reShareLink:`https://www.reddit.com/submit?url=https://cubbit.io/removemyco2?referral_code=${a}&title=${o}`,waShareLink:`https://wa.me/?text=${o}`},n=e=>{switch(e){case"fbShareLink":return"facebook";case"twShareLink":return"twitter";case"liShareLink":return"linkedin";case"reShareLink":return"reddit";case"emailShareLink":return"email";case"waShareLink":return"whatsapp";default:return""}},s=async e=>{const t=n(e);return await fetch("https://api-co2.cubbit.io/save-social",{method:"POST",body:JSON.stringify({email:a,social_media:t,amount:1}),headers:c}),"Sent"};Object.keys(r).forEach((e=>{document.getElementById(e).addEventListener("click",(()=>{window.open(r[e],"_blank");const t=s(e);t&&console.log(t)}))}));const i=()=>navigator.clipboard.writeText(`https://cubbit.io/removemyco2?referral_code=${a}`);document.getElementById("copy_btn").addEventListener("click",(()=>{i(),Toastify({text:"Copied to clipboard",position:"center",backgroundColor:"linear-gradient(to right, #00b09b, #96c93d)",gravity:"bottom",duration:1e3}).showToast()}))}}))};