// sort.js

document.addEventListener("DOMContentLoaded", function() {
    const sortBtn = document.getElementById('js-sort');
    const selectOptions = document.getElementById('js-select-ul');
    const sortOptions = selectOptions.querySelectorAll('li');
    const defaultOption = document.querySelector('.default-option li .option p');
    
    sortBtn.addEventListener('click', function() {
        // Toggle display property
        if (selectOptions.style.display === 'block') {
            selectOptions.style.display = 'none';
        } else {
            selectOptions.style.display = 'block';
        }

        // Toggle arrow indicator
        sortBtn.classList.toggle('active');
    });

    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortValue = option.getAttribute('data-value');
            const optionText = option.querySelector('.option p').textContent;
            const searchQuery = document.getElementById('search-input').value;

            // Update the default option text
            defaultOption.textContent = optionText;
            showShimmerEffect();
            fetchAndDisplayPropertiesWithSort(searchQuery, sortValue);

            // Update the display of the dropdown
            selectOptions.style.display = 'none';
            sortBtn.classList.remove('active');
        });
    });

    // Hide dropdown menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sortBtn.contains(event.target) && !selectOptions.contains(event.target)) {
            selectOptions.style.display = 'none';
            sortBtn.classList.remove('active');
        }
    });
});