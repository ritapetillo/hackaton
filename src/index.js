window.onload = async function () {
  const checkCurrentCO2 = async () => {
    const response = await fetch("https://api-co2.cubbit.io/saved");
    const data = await response.json();
    const { totlal_co2, green_step } = data;
    return { totlal_co2, green_step };
  };
  // get the current co2 and green step
  const { totlal_co2, green_step: step } = await checkCurrentCO2();

  // view the current co2 and green step
  document.getElementById("total_co2").innerText = totlal_co2;
  const colorDots = () => {
    const dots = document.querySelectorAll(".dot");
    // give class .completed to dots position < step
    dots.forEach((dot, index) => {
      if (index < step - 1) {
        dot.classList.add("completed");
      }
      if (index === step - 1) {
        dot.classList.add("load");
      }
    });
  };
  colorDots();

  // get the current percentage completed
  const getPercentage = () => {
    const percentage = (step / 7) * 100;
    return percentage;
  };
  // view the current percentage completed
  document.getElementById("co2_progress_bar").style.width = getPercentage();
};
