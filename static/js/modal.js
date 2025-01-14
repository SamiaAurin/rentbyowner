// modal.js: JS for Filter Buttons' Modal

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search-input');
    const dateBtn = document.getElementById('filter-date-btn');
    const priceBtn = document.getElementById('filter-price-btn');
    const guestsBtn = document.getElementById('filter-guests-btn');
    const guestDecreaseBtn = document.querySelector('.guest-button.decrease');
    const guestIncreaseBtn = document.querySelector('.guest-button.increase');
    const moreFiltersBtn = document.getElementById('filter-more-btn');
    const filterModal = document.getElementById('js-filter-modal');
    const closeBtns = document.getElementById('js-filter-close');
    const modalSearchSubmit = document.getElementById('js-apply-filter');
    const guestCountSpan = document.querySelector('.guest-filter .guest');
    const clearFilterBtn = document.getElementById('js-clear-filter');
    const filterGuestsBtn = document.getElementById('filter-guests-btn');
    const guestCountCloseBtn = document.getElementById('js-guest-count-close');
   

    let guestCount = 0;
    const searchQuery = searchInput.value;

    // Function to display the modal
    function showModal() {
        filterModal.style.display = 'block';
    }
    // Function to hide the modal
    function hideModal() {
        filterModal.style.display = 'none';
    }
    
    function performGuestSearch() {
        
        const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&pax=${guestCount}&order=1`;
        history.pushState(null, '', newUrl);
        
        // Show shimmer effect
        showShimmerEffect();

        // Fetch and display properties with specific guest count
        fetchAndDisplayProperties(searchQuery, guestCount);
    }
    
    function updateGuestDisplay() {
        guestCountSpan.textContent = guestCount;
        filterGuestsBtn.textContent = guestCount > 0 ? `${guestCount} Guests` : 'Guests';
        clearFilterBtn.disabled = guestCount === 0;
        clearFilterBtn.style.color = guestCount > 0 ? '#103076' : 'grey';
        guestCountCloseBtn.style.display = guestCount > 0 ? 'inline' : 'none';
    }

    guestDecreaseBtn.addEventListener('click', function() {
        if (guestCount > 0) {
            guestCount--;
            updateGuestDisplay();
        }
    });

    guestIncreaseBtn.addEventListener('click', function() {
        guestCount++;
        updateGuestDisplay();
    });

    guestCountCloseBtn.addEventListener('click', function() {
        guestCount = 0;
        updateGuestDisplay();
        showShimmerEffect();
        fetchAndDisplayProperties(searchQuery, guestCount);
    });

    clearFilterBtn.addEventListener('click', function() {
        guestCount = 0;
        updateGuestDisplay();
    });

    // Attach click event listeners to each button
    dateBtn.addEventListener('click', showModal);
    priceBtn.addEventListener('click', showModal);
    guestsBtn.addEventListener('click', showModal);
    moreFiltersBtn.addEventListener('click', showModal);

    // Attach click event listeners to close buttons
    closeBtns.addEventListener('click', hideModal);

    modalSearchSubmit.addEventListener('click', function() {
        hideModal();
        performGuestSearch();
    });
});