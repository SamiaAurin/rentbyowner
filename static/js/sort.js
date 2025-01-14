// sort.js

document.addEventListener("DOMContentLoaded", function() {
    const sortBtn = document.getElementById('js-sort');
    const selectOptions = document.getElementById('js-select-ul');
    const sortOptions = selectOptions.querySelectorAll('li');
    const defaultOption = document.querySelector('.default-option li .option p');
    
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {

            // Update the display of the dropdown
            selectOptions.style.display = 'none';
            sortBtn.classList.toggle('active');

            const sortValue = option.getAttribute('data-value');
            const optionText = option.querySelector('.option p').textContent;

            // Update the default option text
            defaultOption.textContent = optionText;
            showShimmerEffect();
            fetchAndDisplayPropertiesWithSort(sortValue);
            
        });
    });
    
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

    
});