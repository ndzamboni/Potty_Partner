document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
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

  // Form Submission with Geolocation
  const form = document.getElementById('search-form');
  const locationInput = document.getElementById('location-input');

  if (form && locationInput) {
    form.addEventListener('submit', (event) => {
        if (!locationInput.value) {
            event.preventDefault(); // Prevent form submission
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        // Redirect to the search results with detected location
                        window.location.href = `/restrooms/searchResults?location=${latitude},${longitude}`;
                    },
                    () => {
                        alert('Unable to detect location. Please enter a search location.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser. Please enter a search location.');
            }
        }
    });
  }

  // Review Management with jQuery
  // Ensure jQuery is loaded before running this part
  if (window.$) {
    $('#show-review-form').on('click', () => {
        $('#reviewModal').modal('show');
    });

    // AJAX for deleting review
    $('.delete-review-form').on('submit', function(e) {
        e.preventDefault();
        const reviewId = $(this).data('review-id');
        const $reviewElement = $(`#review-${reviewId}`);

        $.ajax({
            url: `/reviews/${reviewId}`,
            type: 'DELETE',
            success: () => {
                // Remove review element from the DOM
                $reviewElement.remove();
            },
            error: (xhr, status, error) => {
                console.error('Error deleting review:', error);
            }
        });
    });
  }
});
