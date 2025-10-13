/**
 * Dynamic Logo Switcher
 * 
 * This script switches the website logo based on the current theme:
 * - Dark mode: Uses white logo
 * - Light mode: Uses default logo
 */

(function() {
    'use strict';

    // Logo paths - determine correct path based on current location
    function getLogoPath(filename) {
        const currentPath = window.location.pathname;
        
        // If we're on the root, use direct relative path
        if (currentPath === '/' || currentPath === '/index.html' || currentPath.match(/^\/$|^\/index\.html$/)) {
            return 'assets/images/' + filename;
        }
        
        // For docs and other subdirectories, calculate relative path
        const segments = currentPath.split('/').filter(s => s.length > 0);
        const depth = segments.length > 0 ? segments.length : 0;
        const prefix = depth > 0 ? '../'.repeat(depth) : '';
        
        return prefix + 'assets/images/' + filename;
    }
    
    // Update the logo paths whenever we navigate
    function updateLogoPaths() {
        return {
            light: getLogoPath('wiki-logo.svg'),
            dark: getLogoPath('wiki-logo-white-dark.svg')
        };
    }

    // Check if we're on the homepage (homepage should always use light logo)
    function isHomePage() {
        return document.body.classList.contains('home-page') || 
               window.location.pathname === '/' || 
               window.location.pathname === '/index.html' ||
               window.location.pathname.endsWith('/') && window.location.pathname.split('/').length <= 2;
    }

    // Get the current theme - CSS-first approach
    function getCurrentTheme() {
        // Priority 1: Use CSS Theme system if available
        if (window.CSSTheme && window.CSSTheme.getCurrentTheme) {
            return window.CSSTheme.getCurrentTheme();
        }
        
        // Priority 2: Check DOM for Material's data attribute
        const htmlScheme = document.documentElement.getAttribute('data-md-color-scheme');
        if (htmlScheme === 'slate') return 'dark';
        if (htmlScheme === 'default') return 'light';
        
        // Priority 3: Fallback to light theme
        return 'light';
    }

    // Update the logo based on current theme
    function updateLogo() {
        const logoPaths = updateLogoPaths();
        
        // Always use light logo on homepage
        if (isHomePage()) {
            return;
        }

        const theme = getCurrentTheme();
        const logoPath = theme === 'dark' ? logoPaths.dark : logoPaths.light;
        setLogo(logoPath);
    }

    // Set the logo image source
    function setLogo(logoPath) {
        // Target all possible logo locations
        const selectors = [
            '.md-header__button.md-logo img',
            '.md-logo img', 
            '.md-footer-meta img',
            'img.theme-logo',
            'img[alt="logo"]',
            'img[src*="logo"]'
        ];
        
        selectors.forEach(selector => {
            const logoElements = document.querySelectorAll(selector);
            
            logoElements.forEach(logo => {
                if (logo && isLogoElement(logo)) {
                    updateLogoElement(logo, logoPath);
                }
            });
        });
    }
    
    // Check if element is a logo
    function isLogoElement(element) {
        return (
            element.alt && element.alt.toLowerCase().includes('logo') ||
            element.src.includes('logo') ||
            element.classList.contains('theme-logo') ||
            element.closest('.md-logo') ||
            element.closest('.md-header__button.md-logo') ||
            element.closest('.md-footer-meta')
        );
    }
    
    // Update individual logo element
    function updateLogoElement(logo, logoPath) {
        const currentSrc = logo.src;
        const targetFilename = logoPath.split('/').pop();
        
        // Only update if we're switching to a different logo
        if (!currentSrc.includes(targetFilename)) {
            // Add fast transition effect
            logo.style.opacity = '0.8';
            
            setTimeout(() => {
                logo.src = logoPath;
                logo.style.opacity = '1';
            }, 50);
        }
    }

    // Watch for theme changes
    function watchThemeChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'data-md-color-scheme') {
                    
                    // Update logo when theme changes - fast response
                    setTimeout(updateLogo, 25);
                }
            });
        });

        // Start observing theme changes
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme']
        });
    }

    // Initialize logo switcher - CSS-first approach
    function init() {
        // Update logo immediately
        updateLogo();
        
        // Listen for CSS theme changes
        document.addEventListener('cssthemechange', function(event) {
            setTimeout(updateLogo, 10);
        });
        
        // Also watch for direct DOM changes (backup)
        watchThemeChanges();
        
        // Watch for new logo elements being added to DOM
        const bodyObserver = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            if (node.tagName === 'IMG' && isLogoElement(node) ||
                                node.querySelector && node.querySelector('img[alt="logo"], img[src*="logo"], .theme-logo')) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldUpdate) {
                setTimeout(updateLogo, 100);
            }
        });
        
        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Also listen for palette toggle changes
        const paletteForm = document.querySelector('form[data-md-component="palette"]');
        if (paletteForm) {
            paletteForm.addEventListener('change', function(e) {
                setTimeout(updateLogo, 75);
            });
        }
        
        // Listen for all input changes in palette
        const paletteInputs = document.querySelectorAll('input[name="__palette"]');
        paletteInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                setTimeout(updateLogo, 50);
            });
        });
        
        // Listen for clicks on palette labels
        const paletteLabels = document.querySelectorAll('label[for^="__palette"]');
        paletteLabels.forEach(label => {
            label.addEventListener('click', function(e) {
                setTimeout(updateLogo, 100);
            });
        });

        // Handle system preference changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function() {
                setTimeout(updateLogo, 50);
            });
        }

        // Fallback: periodically check theme and update logo if needed
        setInterval(function() {
            const currentTheme = getCurrentTheme();
            const logoPaths = updateLogoPaths();
            const expectedLogo = isHomePage() ? logoPaths.light : (currentTheme === 'dark' ? logoPaths.dark : logoPaths.light);
            const expectedFilename = expectedLogo.split('/').pop();
            
            // Check if any logo needs updating
            const logoElements = document.querySelectorAll('.md-header__button.md-logo img, .md-logo img, .md-footer-meta img');
            logoElements.forEach(logo => {
                if (logo && isLogoElement(logo) && !logo.src.includes(expectedFilename)) {
                    updateLogo();
                }
            });
        }, 1000);

    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run when the page loads completely
    window.addEventListener('load', function() {
        setTimeout(updateLogo, 100);
    });

})();