(function() {
  // Navigation styles
  const navStyles = `
    nav {
      margin-bottom: 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    body.dark-mode nav {
      border-bottom: 1px solid #333;
    }
    
    .nav-links {
      display: flex;
      gap: 30px;
      list-style: none;
      padding: 0;
      margin: 0;
      align-items: center;
    }
    
    .nav-links a {
      color: #333;
      text-decoration: none;
      font-size: 1.1em;
      transition: all 0.2s ease;
      display: inline-block;
    }
    
    body.dark-mode .nav-links a {
      color: #e0e0e0;
    }
    
    .nav-links a:hover {
      transform: translateY(-2px);
      color: #7ab8e6;
    }
    
    body.dark-mode .nav-links a:hover {
      color: #7ab8e6;
    }
    
    .nav-name {
      font-size: 1.5em;
      font-weight: 700;
      color: #333;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    
    body.dark-mode .nav-name {
      color: #e0e0e0;
    }
    
    .nav-name:hover {
      color: #5b8cb7;
    }
    
    body.dark-mode .nav-name:hover {
      color: #7ab8e6;
    }
    
    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      font-size: 1.2em;
      color: #333;
      transition: all 0.2s ease;
    }
    
    body.dark-mode .theme-toggle {
      color: #e0e0e0;
    }
    
    .theme-toggle:hover {
      transform: translateY(-2px);
      color: #5b8cb7;
    }
    
    body.dark-mode .theme-toggle:hover {
      color: #7ab8e6;
    }
  `;

  // Navigation HTML
  const navHTML = `
    <nav>
      <a href="index.html" class="nav-name">Jack Usher</a>
      <ul class="nav-links">
        <li><a href="books.html">Books</a></li>
        <li><a href="thoughts.html">Thoughts</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li>
          <button id="themeToggleBtn" class="theme-toggle" aria-label="Toggle theme">
            <i class="fas fa-moon"></i>
          </button>
        </li>
      </ul>
    </nav>
  `;

  // Theme toggle function
  function toggleTheme() {
    try {
      console.log('[Theme Debug] Toggling theme');
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      console.log('[Theme Debug] New theme state:', isDarkMode ? 'dark' : 'light');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      
      const themeIcon = document.querySelector('.theme-toggle i');
      if (themeIcon) {
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
      }
    } catch (error) {
      console.error('Error in toggleTheme:', error);
    }
  }

  // Function to initialize navigation
  function initNavigation() {
    try {
      console.log('[Theme Debug] Document readyState:', document.readyState);
      console.log('[Theme Debug] Navigation initialization started');

      // Check if navigation already exists
      if (document.querySelector('nav')) {
        console.log('[Theme Debug] Navigation already exists');
        return;
      }

      // Add styles
      const styleSheet = document.createElement('style');
      styleSheet.textContent = navStyles;
      document.head.appendChild(styleSheet);

      // Add navigation HTML
      const navContainer = document.createElement('div');
      navContainer.innerHTML = navHTML.trim();
      const nav = navContainer.firstElementChild;
      
      if (!nav) {
        throw new Error('Failed to create navigation element');
      }

      const firstChild = document.body.firstElementChild;
      if (firstChild) {
        document.body.insertBefore(nav, firstChild);
      } else {
        document.body.appendChild(nav);
      }

      // Apply theme
      console.log('[Theme Debug] Starting theme application');
      const storedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('[Theme Debug] Stored theme:', storedTheme);
      console.log('[Theme Debug] System prefers dark:', systemPrefersDark);
      
      const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
      console.log('[Theme Debug] Selected theme:', theme);
      
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        console.log('[Theme Debug] Dark mode class added to body');
      }

      // Add event listener to theme toggle button
      const themeToggleBtn = document.getElementById('themeToggleBtn');
      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
        console.log('[Theme Debug] Theme toggle button listener added');
      }

      // Update theme icon
      const themeIcon = document.querySelector('.theme-toggle i');
      if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        console.log('[Theme Debug] Theme icon updated');
      }

    } catch (error) {
      console.error('Error in initNavigation:', error);
    }
  }

  // Wait for DOM to be ready
  console.log('[Theme Debug] Initial script load, readyState:', document.readyState);
  if (document.readyState === 'loading') {
    console.log('[Theme Debug] Adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    console.log('[Theme Debug] Calling initNavigation immediately');
    initNavigation();
  }
})(); 