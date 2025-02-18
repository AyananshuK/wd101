const form = document.getElementById("registrationForm");
const dobInput = document.getElementById("dob");
const emailInput = document.getElementById("email");
const termsInput = document.getElementById("terms");
const entriesTable = document
  .getElementById("entriesTable")
  .getElementsByTagName("tbody")[0];

window.addEventListener("DOMContentLoaded", () => {
  loadEntriesFromLocalStorage();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dob = new Date(dobInput.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    const formattedDate = dob.toLocaleDateString("en-GB");
    const minAgeDate = new Date(
      today.getFullYear() - 55,
      today.getMonth(),
      today.getDate()
    ).toLocaleDateString("en-GB");
    const maxAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    ).toLocaleDateString("en-GB");
    dobInput.setCustomValidity(
      `Please select a date between ${minAgeDate} and ${maxAgeDate}.`
    );
    dobInput.reportValidity();
    return;
  } else {
    dobInput.setCustomValidity("");
  }

  const email = emailInput.value;
  if (!email.includes("@")) {
    emailInput.setCustomValidity(
      `Please include an '@' in the email address. '${email}' is missing an '@'.`
    );
    emailInput.reportValidity();
    return;
  } else {
    emailInput.setCustomValidity("");
  }

  if (!termsInput.checked) {
    termsInput.setCustomValidity(
      "Please tick this box if you want to proceed."
    );
    termsInput.reportValidity();
    return;
  } else {
    termsInput.setCustomValidity("");
  }

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const formattedDOB = dob.toLocaleDateString("en-GB");
  const termsAccepted = document.getElementById("terms").checked;

  const newRow = entriesTable.insertRow();
  const cells = [name, email, password, formattedDOB, termsAccepted];

  cells.forEach((cellText) => {
    const newCell = newRow.insertCell();
    newCell.textContent = cellText;
  });

  let formEntries =
    JSON.parse(localStorage.getItem("registrationEntries")) || [];
  formEntries.push(cells);
  localStorage.setItem("registrationEntries", JSON.stringify(formEntries));

  form.reset();
});

function loadEntriesFromLocalStorage() {
  const storedEntries = localStorage.getItem("registrationEntries");
  if (storedEntries) {
    const entries = JSON.parse(storedEntries);
    entries.forEach((entry) => {
      const newRow = entriesTable.insertRow();
      const cells = [entry[0], entry[1], entry[2], entry[3], entry[4]];
      cells.forEach((cellText) => {
        const newCell = newRow.insertCell();
        newCell.textContent = cellText;
      });
    });
  }
}
