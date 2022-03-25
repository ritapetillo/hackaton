window.onload = async function () {
  const step = 1;
  console.log(step);

  // get all co2
  // api url https://api-co2.cubbit.io/saved
  const co2 = await fetch("https://api-co2.cubbit.io/saved");
  const co2Json = await co2.json();
  console.log(co2Json);

  const colorDots = () => {
    const dots = document.querySelectorAll(".dot");
    // give class .completed to dots position < step
    dots.forEach((dot, index) => {
      if (index < step) {
        dot.classList.add("completed");
      }
      if (index === step) {
        dot.classList.add("load");
      }
    });
  };

  colorDots();
};
