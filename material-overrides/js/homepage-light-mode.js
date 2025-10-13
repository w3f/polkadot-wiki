/**
 * Homepage Dark Mode Exclusion
 * 
 * This script ensures the homepage always stays in light mode,
 * regardless of the user's dark mode toggle setting.
 */

(function() {
    'use strict';

    // Check if we're on the homepage
    function isHomePage() {
        // Check multiple conditions to ensure we're on the homepage
        return document.body.classList.contains('home-page') || 
               window.location.pathname === '/' || 
               window.location.pathname === '/index.html' ||
               window.location.pathname.endsWith('/') && window.location.pathname.split('/').length <= 2;
    }

    // Force light mode on homepage
    function enforceHomepageLightMode() {
        if (!isHomePage()) return;

        // Set the color scheme to default (light mode)
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        // Remove dark mode attribute and ensure light mode
        htmlElement.setAttribute('data-md-color-scheme', 'default');
        bodyElement.setAttribute('data-md-color-scheme', 'default');
        
        // Remove any slate scheme classes
        htmlElement.classList.remove('md-color-scheme--slate');
        bodyElement.classList.remove('md-color-scheme--slate');
        
        // Add default scheme class if it doesn't exist
        if (!htmlElement.classList.contains('md-color-scheme--default')) {
            htmlElement.classList.add('md-color-scheme--default');
        }
        
        // Also set it on any palette inputs that might exist
        const paletteInputs = document.querySelectorAll('input[name="__palette"]');
        paletteInputs.forEach(input => {
            if (input.getAttribute('data-md-color-scheme') === 'default') {
                input.checked = true;
            } else if (input.getAttribute('data-md-color-scheme') === 'slate') {
                input.checked = false;
            }
        });
        
        // Force CSS to use light mode variables
        htmlElement.style.setProperty('--md-default-bg-color', '#ffffff');
        htmlElement.style.setProperty('--md-default-fg-color', '#6e7391');
        
        // Ensure logo stays light on homepage
        const logoElements = document.querySelectorAll('.md-header__button.md-logo img, .md-logo img, .md-footer-meta img');
        logoElements.forEach(logo => {
            if (logo && (logo.src.includes('logo') || logo.closest('.md-logo') || logo.closest('.md-footer-meta'))) {
                if (!logo.src.includes('wiki-logo.svg')) {
                    logo.src = 'assets/images/wiki-logo.svg';
                }
            }
        });
    }

    // Override the palette toggle functionality for homepage
    function overridePaletteToggle() {
        if (!isHomePage()) return;

        // Completely disable dark mode toggle on homepage
        const paletteForm = document.querySelector('form[data-md-component="palette"]');
        if (paletteForm) {
            // Hide the dark mode toggle on homepage
            paletteForm.style.display = 'none';
        }

        // Listen for palette changes (in case they still occur)
        if (paletteForm) {
            paletteForm.addEventListener('change', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Always revert to light mode on homepage
                setTimeout(() => {
                    enforceHomepageLightMode();
                }, 1);
            });
        }

        // Also listen for direct clicks on palette toggle buttons
        const paletteLabels = document.querySelectorAll('label[for^="__palette"]');
        paletteLabels.forEach(label => {
            label.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // Always revert to light mode on homepage
                setTimeout(() => {
                    enforceHomepageLightMode();
                }, 1);
            });
        });
    }

    // Watch for attribute changes on the document element
    function watchForColorSchemeChanges() {
        if (!isHomePage()) return;

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'data-md-color-scheme' || 
                     mutation.attributeName === 'data-md-color-media')) {
                    
                    // If someone tries to set dark mode on homepage, revert it
                    const currentScheme = document.documentElement.getAttribute('data-md-color-scheme');
                    if (currentScheme === 'slate') {
                        enforceHomepageLightMode();
                    }
                }
            });
        });

        // Start observing
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme', 'data-md-color-media']
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme', 'data-md-color-media']
        });
    }

    // Initialize when DOM is ready
    function init() {
        if (isHomePage()) {
            // Immediately enforce light mode
            enforceHomepageLightMode();
            
            // Set up the override functionality
            overridePaletteToggle();
            
            // Watch for changes
            watchForColorSchemeChanges();
            
            console.log('Homepage light mode exclusion initialized');
        }
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();