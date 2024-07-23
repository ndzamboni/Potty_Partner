document.addEventListener('DOMContentLoaded', (event) => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) { // Check if the element exists
    const currentTheme = localStorage.getItem('theme') || 'regular';

    if (currentTheme === 'brown') {
      document.body.classList.add('brown-mode');
      themeToggleBtn.textContent = 'Toggle Regular Mode';
    } else {
      themeToggleBtn.textContent = 'Toggle Brown Mode';
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('brown-mode');
      const theme = document.body.classList.contains('brown-mode') ? 'brown' : 'regular';
      localStorage.setItem('theme', theme);
      themeToggleBtn.textContent = theme === 'brown' ? 'Toggle Regular Mode' : 'Toggle Brown Mode';
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('search-form');
  const locationInput = document.getElementById('location-input');

  if (form && locationInput) { // Check if the elements exist
    form.addEventListener('submit', function (event) {
      if (!locationInput.value) {
        event.preventDefault(); // Prevent form submission
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              // Submit the form with the detected location
              window.location.href = `/restrooms/searchResults?location=${latitude},${longitude}`;
            },
            function (error) {
              alert('Unable to detect location. Please enter a search location.');
            }
          );
        } else {
          alert('Geolocation is not supported by your browser. Please enter a search location.');
        }
      }
    });
  }
});
