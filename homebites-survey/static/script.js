let current = -1;
const steps = document.querySelectorAll(".step");
const intro = document.getElementById("intro");
const form = document.getElementById("surveyForm");

let answers = {};

function startSurvey() {
  intro.style.display = "none";
  form.style.display = "block";
  current = 0;
  showStep(current);
}

function showStep(i) {
  steps.forEach((s, idx) => {
    s.style.display = idx === i ? "block" : "none";
  });
}

document.querySelectorAll(".opt").forEach(opt => {
  opt.onclick = () => {
    const parent = opt.parentElement;
    const name = parent.dataset.name;

    parent.querySelectorAll(".opt").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");

    answers[name] = opt.innerText;
  };
});

function nextStep() {
  if (current < steps.length - 1) {
    current++;
    showStep(current);
  } else {
    submitForm();
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

async function submitForm() {
  const formData = new FormData();

  for (let key in answers) {
    formData.append(key, answers[key]);
  }

  await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfmjdUe8BvpP1nnZOARAPcK7RJbSj0f0KXlUCHQe7mXhdz-qw/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert("Submitted 🚀");
}
