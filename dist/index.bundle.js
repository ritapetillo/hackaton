window.onload=async function(){console.log(1),document.querySelectorAll(".dot").forEach(((o,d)=>{d<1&&o.classList.add("completed"),1===d&&o.classList.add("load")}))};