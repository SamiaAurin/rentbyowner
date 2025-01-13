document.addEventListener("DOMContentLoaded", function() {
    const sortBtn = document.getElementById('js-sort');
    const selectOptions = document.getElementById('js-select-ul');

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

// Calendar open after Date Button Clicked
document.addEventListener("DOMContentLoaded", function() {
    const dateBtn = document.getElementById('filter-date-btn');
    const datePicker = document.getElementById('js-date-picker');

    dateBtn.addEventListener('click', function() {
        datePicker.style.display = 'block';
    });
});

// JS for Filter Modal 
document.addEventListener("DOMContentLoaded", function() {
    const dateBtn = document.getElementById('filter-date-btn');
    const priceBtn = document.getElementById('filter-price-btn');
    const guestsBtn = document.getElementById('filter-guests-btn');
    const moreFiltersBtn = document.getElementById('filter-more-btn');
    const filterModal = document.getElementById('js-filter-modal');
    const closeBtns = document.getElementById('js-filter-close');

    // Function to display the modal
    function showModal() {
        filterModal.style.display = 'block';
    }

    // Attach click event listeners to each button
    dateBtn.addEventListener('click', showModal);
    priceBtn.addEventListener('click', showModal);
    guestsBtn.addEventListener('click', showModal);
    moreFiltersBtn.addEventListener('click', showModal);

    // Function to hide the modal
    function hideModal() {
        filterModal.style.display = 'none';
    }

    // Attach click event listeners to close buttons
    closeBtns.addEventListener('click', hideModal);
    
});