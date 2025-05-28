// The purpose of this script is to modify the default search functionality
// so that the "Type to start searching" text does not render in the search
// results dropdown and so that the dropdown only appears once a user has started
// to type in the input field
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.md-search__input');
  const searchOutput = document.querySelector('.md-search__output');
  const searchResultMeta = document.querySelector('.md-search-result__meta');

  if (searchResultMeta.textContent.trim() === 'Initializing search') {
    searchResultMeta.style.display = 'none';
  }

  searchInput.addEventListener('input', () => {
    // Only show the search results if the user has started to type
    // Toggle "visible" class based on input content
    searchOutput.classList.toggle('visible', searchInput.value.trim() !== '');

    // Do not show the search result meta text unless a user has started typing
    // a value in the input field
    if (searchInput.value.trim() === '' && searchResultMeta) {
      searchResultMeta.style.display = 'none';
    } else if (searchInput.value.trim().length > 0) {
      searchResultMeta.style.display = 'block';
    }
  });
});
