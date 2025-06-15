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
    
    // Update logo paths whenever we navigate
    function updateLogoPaths() {
        return {
            light: getLogoPath('logo.webp'),
            dark: getLogoPath('logo-white.png')
        };
    }

    // Check if we're on the homepage (homepage should always use light logo)
    function isHomePage() {
        return document.body.classList.contains('home-page') || 
               window.location.pathname === '/' || 
               window.location.pathname === '/index.html' ||
               window.location.pathname.endsWith('/') && window.location.pathname.split('/').length <= 2;
    }

    // Get the current theme
    function getCurrentTheme() {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        // Check multiple possible locations for theme information
        const htmlScheme = htmlElement.getAttribute('data-md-color-scheme');
        const bodyScheme = bodyElement.getAttribute('data-md-color-scheme');
        const htmlClasses = htmlElement.className;
        const bodyClasses = bodyElement.className;
        
        // Check for checked palette input
        const checkedInput = document.querySelector('input[name="__palette"]:checked');
        const checkedScheme = checkedInput ? checkedInput.getAttribute('data-md-color-scheme') : null;
        
        console.log('Theme detection debug:', {
            htmlScheme,
            bodyScheme,
            htmlClasses,
            bodyClasses,
            checkedScheme,
            checkedInput
        });
        
        // Determine theme from multiple sources
        let scheme = htmlScheme || bodyScheme || checkedScheme || 'default';
        
        // Fallback: check CSS custom properties
        if (scheme === 'default' || !scheme) {
            const computedStyle = getComputedStyle(htmlElement);
            const bgColor = computedStyle.getPropertyValue('--md-default-bg-color').trim();
            
            // If background is dark, we're probably in dark mode
            if (bgColor && (bgColor === '#1a1a1a' || bgColor.includes('1a1a1a'))) {
                scheme = 'slate';
                console.log('Theme detected via CSS variables: dark');
            }
        }
        
        // Additional fallback: check body background color
        if (scheme === 'default' || !scheme) {
            const bodyStyle = getComputedStyle(bodyElement);
            const bodyBg = bodyStyle.backgroundColor;
            
            // Parse RGB values to detect dark backgrounds
            if (bodyBg.includes('rgb')) {
                const rgbMatch = bodyBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                if (rgbMatch) {
                    const [, r, g, b] = rgbMatch.map(Number);
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                    
                    if (brightness < 128) {
                        scheme = 'slate';
                        console.log('Theme detected via body background color: dark');
                    }
                }
            }
        }
        
        console.log('Final determined scheme:', scheme);
        return scheme === 'slate' ? 'dark' : 'light';
    }

    // Update the logo based on current theme
    function updateLogo() {
        const logoPaths = updateLogoPaths();
        console.log('Logo paths:', logoPaths);
        
        // Always use light logo on homepage
        if (isHomePage()) {
            console.log('Homepage detected, using light logo');
            setLogo(logoPaths.light);
            return;
        }

        const theme = getCurrentTheme();
        const logoPath = theme === 'dark' ? logoPaths.dark : logoPaths.light;
        console.log('Theme:', theme, 'Selected logo path:', logoPath);
        setLogo(logoPath);
    }

    // Set the logo image source
    function setLogo(logoPath) {
        console.log('Setting logo to:', logoPath);
        
        // Target all possible logo locations
        const selectors = [
            '.md-header__button.md-logo img',
            '.md-logo img', 
            '.md-footer-meta img',
            'img.theme-logo',
            'img[alt="logo"]',
            'img[src*="logo"]'
        ];
        
        let logoCount = 0;
        selectors.forEach(selector => {
            const logoElements = document.querySelectorAll(selector);
            console.log(`Found ${logoElements.length} elements for selector: ${selector}`);
            
            logoElements.forEach(logo => {
                if (logo && isLogoElement(logo)) {
                    console.log('Updating logo element:', logo, 'current src:', logo.src);
                    updateLogoElement(logo, logoPath);
                    logoCount++;
                }
            });
        });
        
        console.log(`Updated ${logoCount} logo elements`);
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
            // Add smooth transition effect
            logo.style.opacity = '0.7';
            
            setTimeout(() => {
                logo.src = logoPath;
                logo.style.opacity = '1';
                console.log('Logo updated to:', logoPath, 'for element:', logo);
            }, 150);
        }
    }

    // Watch for theme changes
    function watchThemeChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'data-md-color-scheme') {
                    
                    console.log('Theme change detected:', mutation.attributeName, 'new value:', mutation.target.getAttribute(mutation.attributeName));
                    
                    // Update logo when theme changes
                    setTimeout(updateLogo, 50);
                }
            });
        });

        // Start observing theme changes
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme']
        });
    }

    // Initialize logo switcher
    function init() {
        // Set initial logo with a slight delay to ensure DOM is ready
        setTimeout(updateLogo, 100);
        
        // Watch for theme changes
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
                setTimeout(updateLogo, 200);
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
                console.log('Palette form changed:', e.target);
                setTimeout(updateLogo, 150);
            });
        }
        
        // Listen for all input changes in palette
        const paletteInputs = document.querySelectorAll('input[name="__palette"]');
        paletteInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                console.log('Palette input changed:', e.target.getAttribute('data-md-color-scheme'));
                setTimeout(updateLogo, 100);
            });
        });
        
        // Listen for clicks on palette labels
        const paletteLabels = document.querySelectorAll('label[for^="__palette"]');
        paletteLabels.forEach(label => {
            label.addEventListener('click', function(e) {
                console.log('Palette label clicked');
                setTimeout(updateLogo, 200);
            });
        });

        // Handle system preference changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function() {
                setTimeout(updateLogo, 100);
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
                    console.log('Fallback: updating logo that was missed');
                    updateLogo();
                }
            });
        }, 2000);

        console.log('Dynamic logo switcher initialized');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run when the page loads completely
    window.addEventListener('load', function() {
        setTimeout(updateLogo, 200);
    });

    // Debug function to inspect theme configuration
    function debugThemeState() {
        console.log('=== Theme Debug Information ===');
        console.log('Document element attributes:', {
            'data-md-color-scheme': document.documentElement.getAttribute('data-md-color-scheme'),
            'data-md-color-media': document.documentElement.getAttribute('data-md-color-media'),
            'data-md-color-primary': document.documentElement.getAttribute('data-md-color-primary'),
            'data-md-color-accent': document.documentElement.getAttribute('data-md-color-accent')
        });
        
        console.log('Body attributes:', {
            'data-md-color-scheme': document.body.getAttribute('data-md-color-scheme'),
            'class': document.body.className
        });
        
        console.log('Palette inputs:');
        const inputs = document.querySelectorAll('input[name="__palette"]');
        inputs.forEach((input, index) => {
            console.log(`Input ${index}:`, {
                id: input.id,
                checked: input.checked,
                'data-md-color-scheme': input.getAttribute('data-md-color-scheme'),
                'data-md-color-media': input.getAttribute('data-md-color-media')
            });
        });
        
        console.log('Current theme result:', getCurrentTheme());
        console.log('===============================');
    }
    
    // Test function to manually force logo changes
    function testLogoSwitching() {
        const logoPaths = updateLogoPaths();
        console.log('Testing logo switching...');
        console.log('Available paths:', logoPaths);
        
        console.log('Setting to light logo...');
        setLogo(logoPaths.light);
        
        setTimeout(() => {
            console.log('Setting to dark logo...');
            setLogo(logoPaths.dark);
        }, 2000);
        
        setTimeout(() => {
            console.log('Reverting to theme-appropriate logo...');
            updateLogo();
        }, 4000);
    }

    // Expose debug functions globally for testing
    window.debugLogoSwitcher = {
        updateLogo: updateLogo,
        getCurrentTheme: getCurrentTheme,
        updateLogoPaths: updateLogoPaths,
        setLogo: setLogo,
        isHomePage: isHomePage,
        debugThemeState: debugThemeState,
        testLogoSwitching: testLogoSwitching
    };

})();