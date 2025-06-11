function yearsOfExperience(startDateStr) {
  const startDate = new Date(startDateStr);
  const now = new Date();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = (now - startDate) / msPerYear;
  // toFixed returns a string; parseFloat removes trailing zero when not needed
  return parseFloat(years.toFixed(1));
}

document.addEventListener('DOMContentLoaded', () => {
  const yearsEl = document.getElementById('years-exp');
  if (yearsEl) {
    yearsEl.textContent = yearsOfExperience('2023-08-01');
  }
});
