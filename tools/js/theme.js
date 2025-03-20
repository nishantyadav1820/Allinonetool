// Theme management module
const themeManager = {
    // Theme states
    THEMES: {
        LIGHT: 'light',
        DARK: 'dark',
        SYSTEM: 'system'
    },

    // Get system theme preference
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.THEMES.DARK : this.THEMES.LIGHT;
    },

    // Get current theme from localStorage or default to system
    getCurrentTheme() {
        return localStorage.getItem('theme') || this.THEMES.SYSTEM;
    },

    // Set theme
    setTheme(theme) {
        const effectiveTheme = theme === this.THEMES.SYSTEM ? this.getSystemTheme() : theme;
        document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon(theme);
    },

    // Update theme toggle icon
    updateThemeIcon(theme) {
        const iconElement = document.querySelector('.theme-toggle i');
        if (!iconElement) return;

        iconElement.className = 'bi ' + (
            theme === this.THEMES.SYSTEM ? 'bi-circle-half' :
            theme === this.THEMES.DARK ? 'bi-moon-stars-fill' : 'bi-sun-fill'
        );
    },

    // Initialize theme system
    init() {
        // Add theme toggle button to navbar
        const navbarNav = document.querySelector('.navbar-nav');
        if (!navbarNav) return;

        const themeToggleContainer = document.createElement('li');
        themeToggleContainer.className = 'nav-item dropdown';
        themeToggleContainer.innerHTML = `
            <a class="nav-link dropdown-toggle theme-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-sun-fill"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#" data-theme="light"><i class="bi bi-sun-fill me-2"></i>Light</a></li>
                <li><a class="dropdown-item" href="#" data-theme="dark"><i class="bi bi-moon-stars-fill me-2"></i>Dark</a></li>
                <li><a class="dropdown-item" href="#" data-theme="system"><i class="bi bi-circle-half me-2"></i>System</a></li>
            </ul>
        `;
        navbarNav.appendChild(themeToggleContainer);

        // Set initial theme
        const currentTheme = this.getCurrentTheme();
        this.setTheme(currentTheme);

        // Add theme change listeners
        const themeOptions = document.querySelectorAll('[data-theme]');
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const newTheme = e.currentTarget.dataset.theme;
                this.setTheme(newTheme);
            });
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.getCurrentTheme() === this.THEMES.SYSTEM) {
                this.setTheme(this.THEMES.SYSTEM);
            }
        });
    }
};

// Initialize theme system when DOM is ready
document.addEventListener('DOMContentLoaded', () => themeManager.init());