// Add event listeners to prevent non-numeric input
document.getElementById("day").addEventListener("input", restrictNonNumeric);
document.getElementById("month").addEventListener("input", restrictNonNumeric);
document.getElementById("year").addEventListener("input", restrictNonNumeric);

// Event listener to trigger calculation when arrow icon is clicked
document.querySelector(".arrow-icon").addEventListener("click", validateInputs);

// Function to restrict non-numeric input
function restrictNonNumeric(e) {
    const input = e.target.value;
    e.target.value = input.replace(/[^0-9]/g, ""); // Replace non-numeric characters with an empty string
}

function validateInputs() {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    // Get values as numbers
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const currentYear = new Date().getFullYear(); // Dynamically get the current year

    // Reset error styles
    resetErrorStyles();

    let isValid = true;

    // Validate day input (1-31)
    if (day < 1 || day > 31) {
        dayInput.value = ""; // Clear the input if invalid
        isValid = false;
    }

    // Validate month input (1-12)
    if (month < 1 || month > 12) {
        monthInput.value = ""; // Clear the input if invalid
        isValid = false;
    }

    // Validate year input (1924-current year)
    if (year < 1924 || year > currentYear || isNaN(year)) {
        yearInput.value = ""; // Clear the input if invalid
        isValid = false;
    }

    // If all inputs are valid, calculate and display age
    if (isValid && isValidDate(day, month, year)) {
        const birthDate = new Date(year, month - 1, day); // Month is 0-based
        const age = calculateAge(birthDate);
        displayAge(age);
    } else {
        displayEmptyAge(); // If inputs are invalid, reset the display
        markInvalidFields(dayInput, monthInput, yearInput); // Mark invalid fields
    }
}

function resetErrorStyles() {
    const inputs = [document.getElementById("day"), document.getElementById("month"), document.getElementById("year")];
    const labels = document.querySelectorAll("label");

    inputs.forEach((input) => {
        input.classList.remove("error");
    });

    labels.forEach((label) => {
        label.classList.remove("error");
    });
}

function markInvalidFields(...inputs) {
    inputs.forEach(input => {
        input.classList.add("error");
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
            label.classList.add("error");
        }
    });
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day); // Month is 0-based
    return (
        date &&
        date.getFullYear() === year &&
        date.getMonth() + 1 === month && // JavaScript months are 0-based
        date.getDate() === day
    );
}

function calculateAge(birthDate) {
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Get days in previous month
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
}

function displayAge(age) {
    document.querySelectorAll(".age-output")[0].textContent = age.years;
    document.querySelectorAll(".age-output")[1].textContent = age.months;
    document.querySelectorAll(".age-output")[2].textContent = age.days;
}

function displayEmptyAge() {
    document.querySelectorAll(".age-output")[0].textContent = '--';
    document.querySelectorAll(".age-output")[1].textContent = '--';
    document.querySelectorAll(".age-output")[2].textContent = '--';
}



