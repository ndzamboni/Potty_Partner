document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggleBtn = document.getElementById('theme-toggle');
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
  });
  