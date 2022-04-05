window.onload = async function () {
  const arrayImages = [
    "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/623c83e61e8699c260fe8cde_train.svg",
    "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0e5db4a2394af922a51a_mail.svg",
    "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0e5db81c1e04e19e3424_laptop.svg",
    "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0f3879cf7742ff8e3078_socials.svg",
    "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0f3e7646a8334f683920_power.svg",
    "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c0f3e2dec4192dbb3e935_car.svg",
  ];
  // utils
  const steps_total = [0, 35, 367, 423, 1186, 2565, 4845];
  // step 1 => 4%
  // all other steps incremental 16.6%
  const fullStepPercentage = (step) => {
    if (step === 0) {
      // return 4%
      return 0;
    }
    if (step === 1) {
      // return 4%
      return 4 / 100;
    }
    return (4 + 16.6 * (step - 1)) / 100;
  };
  const getStepPercentage = (percentage) => {
    if (step === 0) {
      // return 4%
      return (percentage * 4) / 100;
    }
    return (percentage * 16.6) / 100;
  };

  const loader = document.getElementById("loader");
  const referral_code = new URLSearchParams(window.location.search).get(
    "referral_code"
  );
  const lang = Weglot.getCurrentLang();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-co2-challenge-lng": lang,
  };

  //lib
  const checkCurrentCO2 = async () => {
    const response = await fetch("https://api-co2.cubbit.io/saved");
    const data = await response.json();
    const { total_co2, green_step } = data;
    console.log(data);
    return { total_co2, green_step };
  };
  const getCo2ForUser = async (referral_code) => {
    const response = await fetch(
      `https://api-co2.cubbit.io/saved?email=${referral_code}`
    );
    const data = await response.json();
    const { total_co2: total_co2_user, green_step } = data;
    return { total_co2_user };
  };

  const generateTrees = (co2_user) => {
    if (co2_user > 20) co2_user = 20;
    let trees = "";
    // generate a tree for each co2 user
    for (let i = 0; i < co2_user; i++) {
      trees += `🌳`;
    }
    return trees;
  };

  // get the current co2 and green step
  const { total_co2, green_step: step } = await checkCurrentCO2();
  if (total_co2)
    // view the current co2 and green step
    document.querySelectorAll(".total_co2").forEach((t, o) => {
      t.innerHTML = total_co2;
    });
  // hide loader
  loader.style.display = "none";

  const colorDots = () => {
    const dots = document.querySelectorAll(".dot");
    // give class .completed to dots position < step
    dots.forEach((dot, index) => {
      if (index < step) {
        dot.classList.add("completed");
      }
      if (index == step) {
        dot.classList.add("load");
      }
    });
  };

  // set the progress bar width and steps
  if (step) {
    //change image
    document.querySelector(".hackathon-img").src = arrayImages[step];
    const grid_image = document.querySelectorAll(".hackton-grid-image");

    const array = [
      "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273dff47c67894b03b01_noun-train-1951016%202.svg",
      "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273dfdfe85eabfded048_noun-news-518193%201%20(1).svg",
      "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273dcbe2287aa77f7912_noun-laptop-1113563%201%20(1).svg",
      "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273d256b60c2275a8178_Vector%20(5).svg",
      "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273d21ad2318360f077a_Vector%20(6).svg",
      "https://uploads-ssl.webflow.com/611f84142709f0e312100b42/624c273d7fda693e5bd5ffc1_noun-car-1069217%201%20(1).svg]",
    ];

    // for every image in the grid, if under current step, change the image
    for (let i = 0; i < step; i++) {
      grid_image[i].src = array[i];
    }

    // get the current percentage completed
    colorDots();
    const getPercentage = () => {
      const differenceNextStep = steps_total[step + 1] - steps_total[step]; // grandezza dell'intervallo tra il prossimo step e il corrente -> 250
      const differenceCurrentStep = total_co2 - steps_total[step]; //50 - 35 // how much we have to complete the current step -> 15
      const percentageCurrentStep = differenceCurrentStep / differenceNextStep; // 15 / 250 = 0.06
      const percentageCompleted = getStepPercentage(percentageCurrentStep); // 0.06 * 4 = 0.24
      const total = fullStepPercentage(step) + percentageCompleted; // 0.24 + 0.4 = 0.64
      console.log(total);
      return total;
    };
    console.log(getPercentage());
    document.getElementById("co2_progress_bar").style.width = `${
      getPercentage() * 100
    }%`;
  }

  ////HOME PAGE
  // send form
  Webflow.push(() => {
    // if url is /
    if (
      window.location.pathname === "/removemyco2" ||
      window.location.pathname === "/it/removemyco2"
    ) {
      // referral code
      // const referral_code = window.location.search.split("=")[1];
      // get query named referral_code from url

      //constants
      const email = document.getElementById("email");
      const consent = document.getElementById("consent_check");
      const submit = document.getElementById("submit");
      const errorMsg = document.getElementById("errorMsg");
      if (!consent.checked) {
        submit.disabled = true;
      }
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
          referral_code: referral_code || "",
        };

        //post the form data to cubbit
        const response = await fetch("https://api-co2.cubbit.io/save", {
          method: "POST",
          body: JSON.stringify(formDataJson),
          headers,
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

        //redirect to thank you page
        window.location.href = `./removemyco2/cubbit-partners-with-treedom?referral_code=${data.referral_code}`;
      });
    }
  });

  ////THANK YOU PAGE
  Webflow.push(async () => {
    // if url is /thank-you
    if (
      window.location.pathname.indexOf("/cubbit-partners-with-treedom") !== -1
    ) {
      // get referral code from query string
      if (!referral_code) {
        window.location.href = "/removemyco2";
      }
      const { total_co2_user } = await getCo2ForUser(referral_code);
      const n_trees = generateTrees(total_co2_user);
      const subscribeLink = document.getElementById("link-subscribe");
      // add referal query param to subscribe link
      subscribeLink.href += `?referral_code=${referral_code}`;

      const text = `${n_trees.toString()} I've saved ${total_co2_user} kg of CO2. Help me complete all steps here https://cubbit.io/removemyco2?referral_code=${referral_code}`;

      document.getElementById("total_co2_user").innerHTML = total_co2_user;
      // facebook share link
      const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=https://cubbit.io/removemyco2?referral_code=${referral_code}&quote=${text}`;
      // twitter share link
      const twShareLink = `https://twitter.com/intent/tweet?text=${text}&url=https://cubbit.io/removemyco2?referral_code=${referral_code}`;
      // linkedin share link
      const liShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=https://cubbit.io/removemyco2?referral_code=${referral_code}&quote=${text}`;
      // reddit share link
      const reShareLink = `https://www.reddit.com/submit?url=https://cubbit.io/removemyco2?referral_code=${referral_code}&title=${text}`;
      // email share link
      const emailShareLink = `mailto:?body=${text}&subject="Save CO2 from the Environment`;
      // whatsapp share link
      const waShareLink = `https://wa.me/?text=${text}`;
      const shareLinks = {
        fbShareLink,
        twShareLink,
        liShareLink,
        reShareLink,
        waShareLink,
      };

      const getSocialPlatform = (linkName) => {
        switch (linkName) {
          case "fbShareLink":
            return "facebook";
          case "twShareLink":
            return "twitter";
          case "liShareLink":
            return "linkedin";
          case "reShareLink":
            return "reddit";
          case "emailShareLink":
            return "email";
          case "waShareLink":
            return "whatsapp";
          default:
            return "";
        }
      };

      const addPointForSharing = async (socialLinkName) => {
        const social_media = getSocialPlatform(socialLinkName);

        const response = await fetch(`https://api-co2.cubbit.io/save-social`, {
          method: "POST",
          body: JSON.stringify({
            email: referral_code,
            social_media,
            amount: 1,
          }),
          headers,
        });
        return "Sent";
      };

      //for each share link, add event listener
      Object.keys(shareLinks).forEach((key) => {
        document.getElementById(key).addEventListener("click", () => {
          window.open(shareLinks[key], "_blank");
          const share = addPointForSharing(key);
          if (share) {
            console.log(share);
          }
        });
      });

      // generate copy to clipboard link
      const copyToClipboard = () =>
        navigator.clipboard.writeText(
          `https://cubbit.io/removemyco2?referral_code=${referral_code}`
        );

      document.getElementById("copy_btn").addEventListener("click", () => {
        copyToClipboard();
        Toastify({
          text: "Copied to clipboard",
          position: "center",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          gravity: "bottom",
          duration: 1000,
        }).showToast();
      });
    }
  });
};
