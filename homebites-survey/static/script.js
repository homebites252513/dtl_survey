document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 0;

  const steps = document.querySelectorAll(".step");
  const bar = document.getElementById("bar");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const form = document.getElementById("surveyForm");

  // 🔗 Your Google Form action URL
  const GOOGLE_FORM_ACTION_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfmjdUe8BvpP1nnZOARAPcK7RJbSj0f0KXlUCHQe7mXhdz-qw/viewform?usp=header";
  // ⚠️ REPLACE THESE entry IDs with your actual Google Form entries
  const ENTRY = {
  comfort: "entry.167936367",
  ventilation: "entry.1814503071",
  discomfort: "entry.1512901872",
  temperature: "entry.1106749226",
  issues: "entry.1881675444",
  waste: "entry.1903300658",
  waste_where: "entry.1493350363",
  automation: "entry.274706038",
  control: "entry.1862869146",
  empty_usage: "entry.983563478",
  data: "entry.60962046",
  priority: "entry.346856527"
};

  function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle("active", i === index));

    prevBtn.style.display = index === 0 ? "none" : "block";
    nextBtn.innerText = index === steps.length - 1 ? "Submit" : "Next";

    bar.style.width = ((index + 1) / steps.length) * 100 + "%";
  }

  function validateStep() {
    const current = steps[currentStep];

    // required fields
    const requiredFields = current.querySelectorAll("[required]");
    for (const el of requiredFields) {
      if (!el.value) {
        el.focus();
        return false;
      }
    }

    // checkbox validation
    const checkboxGroups = ["issues", "waste_where"];
    for (const name of checkboxGroups) {
      const boxes = current.querySelectorAll(`input[name="${name}"]`);
      if (boxes.length > 0) {
        const anyChecked = Array.from(boxes).some(b => b.checked);
        if (!anyChecked) {
          alert("Please select at least one option 😄");
          return false;
        }
      }
    }

    return true;
  }

  function getCheckedValues(fieldName) {
    return Array.from(
      document.querySelectorAll(`input[name="${fieldName}"]:checked`)
    ).map(x => x.value);
  }

  showStep(currentStep);

  nextBtn.addEventListener("click", async () => {
    if (!validateStep()) return;

    // FINAL SUBMIT
    if (currentStep === steps.length - 1) {
      nextBtn.disabled = true;
      nextBtn.innerText = "Submitting...";

      const data = Object.fromEntries(new FormData(form).entries());

      const issues = getCheckedValues("issues");
      const wasteWhere = getCheckedValues("waste_where");

      const formData = new FormData();

      // normal fields
      formData.append(ENTRY.comfort, data.comfort || "");
      formData.append(ENTRY.ventilation, data.ventilation || "");
      formData.append(ENTRY.discomfort, data.discomfort || "");
      formData.append(ENTRY.temperature, data.temperature || "");
      formData.append(ENTRY.waste, data.waste || "");
      formData.append(ENTRY.automation, data.automation || "");
      formData.append(ENTRY.empty_usage, data.empty_usage || "");
      formData.append(ENTRY.data, data.data || "");
      formData.append(ENTRY.priority, data.priority || "");
      formData.append(ENTRY.rating, data.rating || "");

      // checkbox fields
      issues.forEach(v => formData.append(ENTRY.issues, v));
      wasteWhere.forEach(v => formData.append(ENTRY.waste_where, v));

      try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData
        });

        document.querySelector(".card").innerHTML = `
          <div style="text-align:center;padding:24px;">
            <div style="font-size:52px;">⚡</div>
            <h2 style="margin-top:10px;">Thank you!</h2>

            <div style="margin-top:14px;padding:12px;border-radius:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);">
              <p style="font-weight:800;color:#00ffa6;">
                You just helped improve campus energy 🌬️⚡
              </p>
              <p style="margin-top:6px;color:rgba(255,255,255,0.75);">
                Smart campus coming soon 😏
              </p>
            </div>

            <p style="margin-top:12px;color:rgba(255,255,255,0.65);font-size:13px;">
              You can close this page now 🙌
            </p>
          </div>
        `;
      } catch (e) {
        alert("Submission failed. Try again.");
        console.error(e);
        nextBtn.disabled = false;
        nextBtn.innerText = "Submit";
      }

      return;
    }

    currentStep++;
    showStep(currentStep);
  });

  prevBtn.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
  });
});