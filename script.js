const cat = document.getElementById("cat");

const finalGif =
  document.querySelector(".final-gif");

const finalQuestion =
  document.querySelector(".final-question");

const endingContent =
  document.querySelector(".ending-content");

const messageForm =
  document.getElementById("message-form");

const formspreeEndpoint =
  "https://formspree.io/f/moevvznj";

const messageStatus =
  document.getElementById("message-status");

if (messageForm) {

  messageForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
      messageForm.querySelector("button[type='submit']");

    submitButton.disabled = true;

    if (messageStatus) {

      messageStatus.textContent = "Sending...";
      messageStatus.className = "message-status";

    }

    try {

      const response = await fetch(formspreeEndpoint, {

        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: document
            .getElementById("visitor-message")
            .value
            .trim(),
          subject: "A message from your birthday surprise"
        })

      });

      if (!response.ok) {

        throw new Error("Message could not be sent");

      }

      messageForm.reset();

      if (messageStatus) {

        messageStatus.textContent = "Message sent successfully.";
        messageStatus.className = "message-status success";

      }

    }

    catch (error) {

      if (messageStatus) {

        messageStatus.textContent =
          "Message could not be sent. Please try again.";
        messageStatus.className = "message-status error";

      }

    }

    submitButton.disabled = false;

  });

}

const birthdayAudio =
  document.getElementById("birthday-audio");

if (
  birthdayAudio &&
  sessionStorage.getItem("birthday-audio-start") === "true"
) {

  birthdayAudio.play().catch(function () {
  });

  sessionStorage.removeItem("birthday-audio-start");

}


/* =========================================================
   CAT STATE
========================================================= */

let currentY = 24;

let targetY = 24;

let currentOpacity = 0;

let targetOpacity = 0;

let isAtPageEnd = false;



/* =========================================================
   UPDATE CAT POSITION
========================================================= */

function updateCatPosition() {

  const scrollTop = window.scrollY;


  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;


  /*
    Page scroll progress

    0 = top of page
    1 = bottom of page
  */

  const progress =
    documentHeight > 0
      ? scrollTop / documentHeight
      : 0;

  isAtPageEnd = progress >= 0.98;



  /* =======================================================
     CAT APPEARANCE
  ======================================================= */

  /*
    At the very top:
    cat is invisible.

    As soon as she starts scrolling:
    cat gently appears.
  */

  if (progress <= 0.015) {

    targetOpacity = 0;

  }

  else {

    targetOpacity = 1;

  }



  /* =======================================================
     CAT VERTICAL JOURNEY
  ======================================================= */

  /*
    IMPORTANT:

    The cat NEVER changes horizontal position.

    It stays on the LEFT.

    Only the Y position changes.
  */


  /*
    Start position.

    This is intentionally ABOVE the big
    birthday text on mobile.
  */

  const startY = 24;


  /*
    Final position.

    The cat reaches the lower portion
    of the screen near the end.
  */

  const endY = 88;


  targetY =
    startY +
    progress * (endY - startY);



  /* =======================================================
     FINAL FADE
  ======================================================= */

  /*
    Start fading during the last 15%
    of the page.
  */

  if (progress > 0.85) {

    const fadeProgress =
      (progress - 0.85) / 0.15;


    targetOpacity =
      1 - fadeProgress;

  }



  /*
    Completely invisible at the very end.
  */

  if (progress >= 0.98) {

    targetOpacity = 0;

  }

}



/* =========================================================
   SMOOTH CAT ANIMATION
========================================================= */

function animateCat() {


  /*
    Smooth vertical movement
  */

  currentY +=
    (targetY - currentY) * 0.055;


  /*
    Smooth fade
  */

  currentOpacity +=
    (targetOpacity - currentOpacity) * 0.08;


  if (
    finalGif &&
    isAtPageEnd &&
    targetOpacity === 0 &&
    currentOpacity < 0.02
  ) {

    finalGif.classList.add("visible");

    if (endingContent) {

      endingContent.classList.add("visible");

    }

    if (finalQuestion) {

      finalQuestion.classList.add("visible");

    }

    if (messageForm) {

      messageForm.classList.add("visible");

    }

  }



  /*
    ========================================================
    HORIZONTAL POSITION

    THIS NEVER CHANGES.

    Desktop:
    14%

    Mobile:
    CSS overrides this to 13%.
    ========================================================
  */

  cat.style.left = "14%";


  /*
    Only TOP changes.
  */

  cat.style.top =
    `${currentY}%`;


  /*
    Fade
  */

  cat.style.opacity =
    currentOpacity;



  requestAnimationFrame(
    animateCat
  );

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },

    {
      threshold: 0.15
    }

  );



revealElements.forEach(
  element => {

    observer.observe(
      element
    );

  }
);



/* =========================================================
   EVENTS
========================================================= */

window.addEventListener(
  "scroll",
  updateCatPosition,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  updateCatPosition
);



/* =========================================================
   INITIALIZE
========================================================= */

updateCatPosition();


requestAnimationFrame(
  animateCat
);

/* =========================================================
   BIRTHDAY INTRO
========================================================= */

const birthdayIntro =
  document.getElementById("birthday-intro");

const birthdayIntroButton =
  document.getElementById("birthday-intro-button");


/*
  LOCK PAGE SCROLLING
  only while the birthday intro is visible.
*/

if (birthdayIntro) {

  document.body.style.overflow = "hidden";

}


/* =========================================================
   ENTER WEBSITE
========================================================= */

function enterWebsite() {

  if (!birthdayIntro) return;


  /*
     Prevent the function from
     running multiple times.
  */

  if (
    birthdayIntro.classList.contains(
      "hide-intro"
    )
  ) {

    return;

  }


  /*
     Start fade-out.
  */

  birthdayIntro.classList.add(
    "hide-intro"
  );


  /*
     Unlock scrolling after
     the intro disappears.
  */

  setTimeout(() => {

    document.body.style.overflow = "";

  }, 1200);


  /*
     Remove intro from the page
     after the animation.
  */

  setTimeout(() => {

    birthdayIntro.remove();

  }, 1400);

}


/* =========================================================
   CLICK / TAP
========================================================= */

if (birthdayIntroButton) {

  birthdayIntroButton.addEventListener(
    "click",
    enterWebsite
  );

}

