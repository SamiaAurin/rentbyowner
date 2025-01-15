// modal.js: JS for Filter Buttons' and Modal

document.addEventListener("DOMContentLoaded", function() {

    // Search Box Input
    const searchInput = document.getElementById('search-input');

    // Filter Buttons
    const dateBtn = document.getElementById('filter-date-btn');
    const priceBtn = document.getElementById('filter-price-btn');
    const guestsBtn = document.getElementById('filter-guests-btn');
    const moreFiltersBtn = document.getElementById('filter-more-btn');
    
    // Modal Cross Icon in header = js-filter-close, In footer clear btn = js-clear-filter , search btn = js-apply-filter
    const closeBtns = document.getElementById('js-filter-close');
    const clearFilterBtn = document.getElementById('js-clear-filter');
    const modalSearchSubmit = document.getElementById('js-apply-filter');
    

    // Function to display the modal
    const filterModal = document.getElementById('js-filter-modal');

    function showModal() {
        filterModal.style.display = 'block';
    }
    // Function to hide the modal
    function hideModal() {
        filterModal.style.display = 'none';
    }


    /////////////////////       Price Range   ///////////////////////////

    const minPriceSlider = document.getElementById('js-min-price-slider');
    const maxPriceSlider = document.getElementById('js-max-price-slider');
    const minPriceInput = document.getElementById('js-min-price');
    const maxPriceInput = document.getElementById('js-max-price');
    const priceRangeCloseBtn = document.getElementById('js-price-range-close');
        
    // Initialize the input fields with the slider values
    minPriceInput.value = minPriceSlider.value;
    maxPriceInput.value = maxPriceSlider.value;
        
    // Add event listeners to update the input fields when the sliders change
    minPriceSlider.addEventListener('input', function() {
       minPriceInput.value = minPriceSlider.value;
    });
        
    maxPriceSlider.addEventListener('input', function() {
        maxPriceInput.value = maxPriceSlider.value;
    });
        
    // Add event listeners to update the sliders when the input fields change
    minPriceInput.addEventListener('input', function() {
        minPriceSlider.value = minPriceInput.value;
    });
        
    maxPriceInput.addEventListener('input', function() {
        maxPriceSlider.value = maxPriceInput.value;
    });

    // Add event listener to close button for price range
    priceRangeCloseBtn.addEventListener('click', function() {

        // Clear the price range filter
        minPriceInput.value = minPriceSlider.min;
        maxPriceInput.value = maxPriceSlider.max;
        // Reset the price button text
        priceBtn.innerHTML = 'Price';
        // Hide the close button
        priceRangeCloseBtn.style.display = 'none';

        const searchQuery = searchInput.value;
        fetchAndDisplayProperties(searchQuery, null, null);
    });

    // Function to perform price range search
    function performPriceRangeSearch() {
        
        // Get the selected price range values
        const minPrice = parseInt(document.getElementById('js-min-price').value);
        const maxPrice = parseInt(document.getElementById('js-max-price').value);

        priceBtn.innerHTML = `৳${minPrice} - ৳${maxPrice}`;
        priceRangeCloseBtn.style.display = 'inline' ;
        // Define the price range
        const priceRange = { min: minPrice, max: maxPrice };
        const searchQuery = searchInput.value;
        const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&amount=${minPrice}-${maxPrice}&order=1`;
        history.pushState(null, '', newUrl);
        // Show shimmer effect
        showShimmerEffect();

        // Fetch and display properties with specific price range
        fetchAndDisplayProperties(searchQuery, null, priceRange);
    }
    

    
    ///////////////// Guests //////////////////////////////
    const guestDecreaseBtn = document.querySelector('.guest-button.decrease');
    const guestIncreaseBtn = document.querySelector('.guest-button.increase');
    const guestCountSpan = document.querySelector('.guest-filter .guest');
    const guestCountCloseBtn = document.getElementById('js-guest-count-close');
    let guestCount = 0;


    function performGuestSearch() {
        const searchQuery = searchInput.value;
        const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&pax=${guestCount}&order=1`;
        history.pushState(null, '', newUrl);
        
        // Show shimmer effect
        showShimmerEffect();

        // Fetch and display properties with specific guest count
        fetchAndDisplayProperties(searchQuery, guestCount, null);
    }
    
    function updateGuestDisplay() {
        guestCountSpan.textContent = guestCount;
        guestsBtn.textContent = guestCount > 0 ? `${guestCount} Guests` : 'Guests';
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
        const searchQuery = searchInput.value;
        console.log(`guestCountCloseBtn: searchQuery = ${searchQuery}`);
        guestCount = 0;
        updateGuestDisplay();
        showShimmerEffect();
        fetchAndDisplayProperties(searchQuery, guestCount);
    });

    clearFilterBtn.addEventListener('click', function() {
        guestCount = 0;
        updateGuestDisplay();
    });


    // Attach click event listeners to each filter buttons
    dateBtn.addEventListener('click', showModal);
    priceBtn.addEventListener('click', showModal);
    guestsBtn.addEventListener('click', showModal);
    moreFiltersBtn.addEventListener('click', showModal);

    // Attach click event listeners to close buttons
    closeBtns.addEventListener('click', hideModal);

    modalSearchSubmit.addEventListener('click', function() {
        hideModal();
        if (guestCount > 0) {
            performGuestSearch();
        } 
         
        if (minPriceInput.value !== minPriceSlider.min || maxPriceInput.value !== maxPriceSlider.max) {
            performPriceRangeSearch();
        }
    });
  
});