window.onload = async function () {
  //constants
  const email = document.getElementById("email");
  const consent = document.getElementById("consent_check");
  const submit = document.getElementById("submit");
  const errorMsg = document.getElementById("errorMsg");

  // utils
  const steps_total = [0, 35, 367, 423, 1186, 2565, 4845];

  //lib
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

  // set the progress bar width and steps
  if (step) {
    // get the current percentage completed
    colorDots();
    const getPercentage = () => {
      if (step === 0) {
        return 0;
      }
      const differenceNextStep = steps_total[step + 1] - steps_total[step];
      const differenceCurrentStep = total_co2 - steps_total[step];
      const percentageCurrentStep = differenceCurrentStep / differenceNextStep;
      const totalCompletitionPercenage =
        ((step + percentageCurrentStep) / (steps_total.length - 1)) * 100;
      return totalCompletitionPercenage;
    };
    document.getElementById(
      "co2_progress_bar"
    ).style.width = `calc(${getPercentage()}% + 10px)`;
  }

  // send form
  Webflow.push(() => {
    // if consent is checked, enable submit button
    consent.addEventListener("change", () => {
      if (consent.checked) {
        submit.disabled = false;
      } else {
        submit.disabled = true;
      }
    });

    // on form submit
    submit.addEventListener("click", async (e) => {
      if (!consent.value) {
        e.preventDefault();
        errorMsg.innerHTML = "Please accept the consent";
        return;
      }
      if (!email.value) {
        e.preventDefault();
        errorMsg.innerHTML = "Please enter your email";
        return;
      }
      const formDataJson = {
        email: email.value,
        amount: 1,
        signup: true,
        referral_code: "",
      };

      //post the form data to cubbit
      const response = await fetch("https://api-co2.cubbit.io/save", {
        method: "POST",
        body: JSON.stringify(formDataJson),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // if there is an error, throw error
      if (!data) {
        errorMsg.innerHTML = "Something went wrong";
        throw new Error(response.statusText);
      }
      if (data?.error) {
        errorMsg.innerHTML = data.message;
        throw new Error(data.error);
      }
      console.log(data);
      // redirect to thank you page
      window.location.href = `/thank-you?referral_code=${data}`;
    });
  });
};
