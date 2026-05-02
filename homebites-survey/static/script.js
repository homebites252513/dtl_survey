let current = -1;

const steps = document.querySelectorAll(".step");
const intro = document.getElementById("intro");
const form = document.getElementById("surveyForm");

window.onload = () => {
  steps.forEach(s => s.style.display = "none");
};

function startSurvey() {
  intro.style.display = "none";
  form.style.display = "block";
  current = 0;
  showStep(current);
}

function showStep(i) {
  steps.forEach((s, index) => {
    s.style.display = index === i ? "block" : "none";
  });

  document.getElementById("nextBtn").innerText =
    i === steps.length - 1 ? "Submit" : "Next";
}

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
  const formData = new FormData(form);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSfmjdUe8BvpP1nnZOARAPcK7RJbSj0f0KXlUCHQe7mXhdz-qw/formResponse",
    {
      method: "POST",
      mode: "no-cors",
      body: formData
    }
  );

  alert("Submitted 🚀");
}
