window.onload = async function () {
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

  ////HOME PAGE
  // send form
  Webflow.push(() => {
    // if url is /
    if (
      window.location.pathname === "/removemyco2" ||
      window.location.pathname === "/it/removemyco2"
    ) {
      // referral code
      const referral_code = window.location.search.split("=")[1];
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        //redirect to thank you page
        window.location.href = `/thank-you?referral_code=${data.referral_code}`;
      });
    }
  });

  ////THANK YOU PAGE
  Webflow.push(async () => {
    // if url is /thank-you
    if (window.location.pathname.indexOf("/thank-you") !== -1) {
      // get referral code from query string
      const referral_code = window.location.search.split("=")[1];
      console.log(referral_code);
      const { total_co2_user } = await getCo2ForUser(referral_code);
      const n_trees = generateTrees(total_co2_user);
      const subscribeLink = document.getElementById("link-subscribe");
      // add referal query param to subscribe link
      subscribeLink.href += `?referral_code=${referral_code}`;

      const text = `${n_trees.toString()} I've saved ${total_co2_user} kg of CO2. Help me complete all steps here removemyco2.com?referral_code=${referral_code}`;

      document.getElementById("total_co2_user").innerHTML = total_co2_user;
      // facebook share link
      const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=https://removemyco2.com?referral_code=${referral_code}&quote=${text}`;
      // twitter share link
      const twShareLink = `https://twitter.com/intent/tweet?text=${text}&url=https://removemyco2.com?referral_code=${referral_code}`;
      // linkedin share link
      const liShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=https://removemyco2.com?referral_code=${referral_code}&quote=${text}`;
      // reddit share link
      const reShareLink = `https://www.reddit.com/submit?url=https://removemyco2.com?referral_code=${referral_code}&title=${text}`;
      // email share link
      const emailShareLink = `mailto:?body=${text}&subject="Save CO2 from the Environment`;
      const shareLinks = {
        fbShareLink,
        twShareLink,
        liShareLink,
        reShareLink,
        emailShareLink,
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
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
          `https://removemyco2.com?referral_code=${referral_code}`
        );

      document.getElementById("copy_btn").addEventListener("click", () => {
        copyToClipboard();
      });
    }
  });
};
