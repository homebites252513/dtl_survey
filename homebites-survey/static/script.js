function startSurvey() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("surveyForm").style.display = "block";
}

const form = document.getElementById("surveyForm");

const GOOGLE_FORM_ACTION_URL =
"https://docs.google.com/forms/d/e/1FAIpQLSfmjdUe8BvpP1nnZOARAPcK7RJbSj0f0KXlUCHQe7mXhdz-qw/formResponse";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  await fetch(GOOGLE_FORM_ACTION_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert("Submitted successfully 🚀");
});
