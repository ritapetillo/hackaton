window.onload = async function () {
  const checkCurrentCO2 = async () => {
    const response = await fetch("https://api-co2.cubbit.io/saved");
    const data = await response.json();
    const { total_co2, green_step } = data;
    console.log(data);
    return { total_co2, green_step };
  };
  // get the current co2 and green step
  const { total_co2, green_step: step } = await checkCurrentCO2();
  if (total_co2)
    // view the current co2 and green step
    document.querySelectorAll(".total_co2").forEach((t, o) => {
      t.innerHTML = total_co2;
    });

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
  if (step) {
    // get the current percentage completed
    colorDots();
    const getPercentage = () => {
      const percentage = ((step + 0.5) / 7) * 100;
      return percentage;
    };
    document.getElementById("co2_progress_bar").style.width = getPercentage();
  }
  // view the current percentage completed
};
