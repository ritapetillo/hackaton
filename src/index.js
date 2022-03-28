window.onload = async function () {
  const steps_total = [0, 35, 367, 423, 1186, 2565, 4845];
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
      const differenceNextStep = steps_total[step + 1] - steps_total[step];
      const differenceCurrentStep = total_co2 - steps_total[step];
      const percentageCurrentStep = differenceCurrentStep / differenceNextStep;
      const totalCompletitionPercenage =
        ((step + percentageCurrentStep) / (steps_total.length - 1)) * 100;
      return totalCompletitionPercenage;
    };
    document.getElementById("co2_progress_bar").style.width =
      getPercentage() + "%";
  }
  // view the current percentage completed
};
