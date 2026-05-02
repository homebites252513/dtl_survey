let current = -1;

const steps = document.querySelectorAll(".step");
const intro = document.getElementById("intro");
const form = document.getElementById("surveyForm");
const nav = document.querySelector(".nav");

let answers = {};

/* START SURVEY */
function startSurvey() {
  intro.style.display = "none";
  form.style.display = "block";

  // SHOW BUTTONS
  nav.style.display = "flex";

  current = 0;
  showStep(current);
}

/* SHOW STEP */
function showStep(i) {
  steps.forEach((step, index) => {
    step.style.display = index === i ? "block" : "none";
  });
}

/* OPTION CLICK */
document.querySelectorAll(".options").forEach(group => {
  const name = group.getAttribute("data-name");

  group.querySelectorAll(".opt").forEach(option => {
    option.addEventListener("click", () => {

      // remove previous selection
      group.querySelectorAll(".opt").forEach(o => o.classList.remove("active"));

      // mark selected
      option.classList.add("active");

      // store answer
      answers[name] = option.innerText;
    });
  });
});

/* NEXT */
function nextStep() {

  // force selection before moving
  const currentStep = steps[current];
  const selected = currentStep.querySelector(".opt.active");

  if (!selected) {
    alert("Select an option 😤");
    return;
  }

  if (current < steps.length - 1) {
    current++;
    showStep(current);
  } else {
    submitForm();
  }
}

/* BACK */
function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

/* SUBMIT TO GOOGLE FORM */
function submitForm() {

  let baseURL = "https://docs.google.com/forms/d/e/1FAIpQLSfmjdUe8BvpP1nnZOARAPcK7RJbSj0f0KXlUCHQe7mXhdz-qw/formResponse?";

  let params = [];

  for (let key in answers) {
    let value = encodeURIComponent(answers[key]);
    params.push(`${key}=${value}`);
  }

  let finalURL = baseURL + params.join("&");

  // 🔥 THIS LINE ACTUALLY SUBMITS TO GOOGLE FORM
  window.location.href = finalURL;
}
