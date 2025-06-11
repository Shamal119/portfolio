function yearsOfExperience(startYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

document.addEventListener('DOMContentLoaded', () => {
  const yearsEl = document.getElementById('years-exp');
  if (yearsEl) {
    yearsEl.textContent = yearsOfExperience(2020); // update with actual start year
  }
});
