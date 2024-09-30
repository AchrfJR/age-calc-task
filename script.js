// Automatically trigger age calculation whenever inputs change
document.getElementById("day").addEventListener("input", validateInputs);
document.getElementById("month").addEventListener("input", validateInputs);
document.getElementById("year").addEventListener("input", validateInputs);

function validateInputs() {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    // Get values as numbers
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Validate day input (1-31)
    if (day < 1 || day > 31) {
        dayInput.value = ""; // Clear the input if invalid
    }

    // Validate month input (1-12)
    if (month < 1 || month > 12) {
        monthInput.value = ""; // Clear the input if invalid
    }

    // Validate year input (1924-2024)
    if (year < 1924 || year > 2024 || isNaN(year)) {
        yearInput.value = ""; // Clear the input if invalid
    }

    // If all inputs are valid, calculate and display age
    if (isValidDate(day, month, year)) {
        const birthDate = new Date(`${year}-${month}-${day}`);
        const age = calculateAge(birthDate);
        displayAge(age);
    } else {
        displayEmptyAge(); // If inputs are invalid, reset the display
    }
}


function isValidDate(day, month, year) {
    // Check if date is valid by constructing a Date object and checking its properties
    const date = new Date(`${year}-${month}-${day}`);
    return (
        date && 
        date.getFullYear() == year && 
        date.getMonth() + 1 == month && // JavaScript months are 0-based
        date.getDate() == day
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
