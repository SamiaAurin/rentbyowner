// modal.js: JS for Filter Buttons' and Modal
    

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
    
    //////////////////////  Date and Calendar ///////////////////////////

    const checkinDiv = document.getElementById('js-checkin');
    const checkoutDiv = document.getElementById('js-checkout');
    checkinDiv.addEventListener('click', showCalendar);
    checkoutDiv.addEventListener('click', showCalendar);

    const calendar = document.getElementById('modal-calendar');
    const calendarClose = document.getElementById('js-calendar-close');
    let selectedStartDate = null;
    let selectedEndDate = null;
    let datepicker = null; 
    let isEventListenersAttached = false;

    function initializeDatepicker() {
        
        const input = document.getElementById('input-id');
        const calendarContainer = document.getElementById('calendar-container');

        if (!input) {
            console.error('Input element not found');
            return;
        }
        
        if (!datepicker) {
            datepicker = new HotelDatepicker(input, {
                container: calendarContainer,
                inline: true,
                format: 'YYYY-MM-DD',
                startOfWeek: 'monday',
                disabledDates: [],
                submitButton: false,
                enableCheckout: true,
                preventContainerClose: true,
                autoClose: false,
                showTopbar: true,
                moveBothMonths: true,
                minNights: 1,
                maxNights: 30,
                selectForward: false,
                setValue: function(s, s1, s2) {
                    input.value = s;
                    selectedStartDate = s1;
                    selectedEndDate = s2;
                    console.log('Values set:', { s, s1, s2 });
                    updateNightCount(s1, s2);
                    
                },
                beforeShowDay: function(date) {
                    return [true, ''];
                },
                onOpenDatepicker: function() {
                    console.log('Datepicker opened');
                },
                onCloseDatepicker: function() {
                    console.log('Datepicker closed');
                }

            });
        }

    }

    function updateNightCount(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        const nightElement = document.getElementById('night');
        if (nightElement) {
            nightElement.textContent = `${nights} ${nights === 1 ? 'Night' : 'Nights'}`;
        }
    }
    
    function performDateSearch(selectedStartDate, selectedEndDate) {
        const searchInput = document.getElementById('search-input');
        const searchQuery = searchInput.value;
    
        console.log('Current dates:', selectedStartDate, selectedEndDate);
        // Show shimmer effect
        showShimmerEffect();
    
        if (selectedStartDate && selectedEndDate) {
            const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&dateStart=${selectedStartDate}&dateEnd=${selectedEndDate}&order=1`;
            history.pushState(null, '', newUrl);
    
            fetchPropertiesWithDate(searchQuery, selectedStartDate, selectedEndDate);
            updateFilterDateButton(selectedStartDate, selectedEndDate);
            hideCalendar();
            // Update the filter count after performing searches
            updateFilterCount();
        } else {
            alert('Please select both check-in and check-out dates');
        }
    }

    const filterDateBtn = document.getElementById('filter-date-btn');
    const dateCloseBtn = document.getElementById('js-date-range-close');
    //the check-in and check-out input fields
    const checkinInput = document.querySelector('#js-checkin input');
    const checkoutInput = document.querySelector('#js-checkout input');

    dateCloseBtn.addEventListener('click', function() {

        filterDateBtn.textContent = 'Dates';
        dateCloseBtn.style.display = 'none';

        selectedStartDate = null;
        selectedEndDate = null;
        updateFilterCount();
    });
    
    function updateFilterDateButton(startDate, endDate) {
        const formattedStartDate = fecha.format(new Date(startDate), 'MMM D');
        const formattedEndDate = fecha.format(new Date(endDate), 'MMM D');
        filterDateBtn.textContent = `${formattedStartDate} - ${formattedEndDate}`;
        dateCloseBtn.style.display = 'inline';  
        
        checkinInput.value = formattedStartDate;
        checkoutInput.value = formattedEndDate;

        // Enable the clear filter button
        clearFilterBtn.disabled = false;
        clearFilterBtn.style.color = '#103076';
        
    }
    
    function setupEventListeners() {
        // Close button event
        if (calendarClose) {
            calendarClose.addEventListener('click', hideCalendar);
        }
        
        // Continue button event
        const nightBtn = document.getElementById('night-btn');
        let checkinClicked = false;
        let checkoutClicked = false;

        // Add event listeners to check-in and check-out buttons
        const checkinBtn = document.getElementById('js-checkin');
        const checkoutBtn = document.getElementById('js-checkout');

        if (checkinBtn) {
            checkinBtn.addEventListener('click', function() {
                checkinClicked = true;
            });
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                checkoutClicked = true;
            });
        }

        if (nightBtn) {
            nightBtn.addEventListener('click', function() {
                // Check if either the check-in or check-out button has been clicked
                if (checkinClicked || checkoutClicked) {
                    checkinClicked = false;
                    checkoutClicked = false;
                    hideCalendar();
                    updateFilterDateButton(selectedStartDate, selectedEndDate);
                    showModal();
                } else {
                    performDateSearch(selectedStartDate, selectedEndDate);
                }
            });
        }
        // Set the flag to true after attaching event listeners
        isEventListenersAttached = true;
    }

    function showCalendar() {

        if(showModal){
            hideModal();
        }


        if (calendar) {
            calendar.style.display = 'inline';
            initializeDatepicker();
            // Only setup event listeners if they haven't been attached yet
            if (!isEventListenersAttached) {
                setupEventListeners();
            }
        }
    }

    function hideCalendar() {
        if (calendar) {
            calendar.style.display = 'none';
        }
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
        
    // Add event listeners to update the input fields and enforce slider constraints
    minPriceSlider.addEventListener('input', function () {
        minPriceInput.value = minPriceSlider.value;

        // Enable the clear filter button
        clearFilterBtn.disabled = false;
        clearFilterBtn.style.color = '#103076';
    });

    maxPriceSlider.addEventListener('input', function () {
        maxPriceInput.value = maxPriceSlider.value;

        // Enable the clear filter button
        clearFilterBtn.disabled = false;
        clearFilterBtn.style.color = '#103076';
    });

    // Add event listeners to update the sliders and enforce constraints when the input fields change
    minPriceInput.addEventListener('input', function () {
        if (parseInt(minPriceInput.value) >= parseInt(maxPriceSlider.value)) {
            minPriceInput.value = maxPriceSlider.value - 1; // Prevent overlap
        }
        minPriceSlider.value = minPriceInput.value;
    });

    maxPriceInput.addEventListener('input', function () {
        if (parseInt(maxPriceInput.value) <= parseInt(minPriceSlider.value)) {
            maxPriceInput.value = parseInt(minPriceSlider.value) + 1; // Prevent overlap
        }
        maxPriceSlider.value = maxPriceInput.value;
    });


    // Add event listener to close button for price range
    priceRangeCloseBtn.addEventListener('click', function() {

        // Clear the price range filter and reset to original values
        const originalMinPrice = 24;
        const originalMaxPrice = 1000;

        minPriceInput.value = originalMinPrice;
        maxPriceInput.value = originalMaxPrice;
        minPriceSlider.value = originalMinPrice;
        maxPriceSlider.value = originalMaxPrice
        
        // Reset the price button text
        priceBtn.innerHTML = 'Price';
        // Hide the close button
        priceRangeCloseBtn.style.display = 'none';

        const searchQuery = searchInput.value;
        updateFilterCount();
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
        const searchQuery = localStorage.getItem('searchQuery') || searchInput.value;
        // Save the search query to local storage in case it's a new one
        localStorage.setItem('searchQuery', searchQuery);
        
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
        const searchQuery = localStorage.getItem('searchQuery') || searchInput.value;
        // Save the search query to local storage in case it's a new one
        localStorage.setItem('searchQuery', searchQuery);

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
        updateFilterCount();
        showShimmerEffect();
        fetchAndDisplayProperties(searchQuery, guestCount);
    });

    
    //////////// More Filters and Amenities ///////////

    // Amenities //

    function getSelectedAmenities() {
        const selectedAmenities = [];
        const checkboxes = document.querySelectorAll('.modal-single-check-box input[type="checkbox"]:checked');
        
        checkboxes.forEach(checkbox => {
            selectedAmenities.push(checkbox.value);
        });

        // Enable the clear filter button if any amenities are selected
        if (selectedAmenities.length > 0) {
            clearFilterBtn.disabled = false;
            clearFilterBtn.style.color = '#103076';
        } else {
            clearFilterBtn.disabled = true;
            clearFilterBtn.style.color = 'grey';
        }

        return selectedAmenities;
    }

    function performAmenitiesSearch() {
        const searchQuery = localStorage.getItem('searchQuery') || searchInput.value;
        // Save the search query to local storage in case it's a new one
        localStorage.setItem('searchQuery', searchQuery);

        const selectedAmenities = getSelectedAmenities();
        console.log("Selected Amenities: ", selectedAmenities); // Debugging

        const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&amenities=${selectedAmenities.join(',')}&order=1`;
        history.pushState(null, '', newUrl);
        
        // Show shimmer effect
        showShimmerEffect();
        
        // Fetch and display properties with specific amenities
        fetchAndDisplayProperties(searchQuery, null, null, selectedAmenities);
    }
    
    // Add event listeners to all amenity checkboxes
    const amenityCheckboxes = document.querySelectorAll('.modal-single-check-box input[type="checkbox"]');
    amenityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', getSelectedAmenities);
    });

    // More filter button JS
    const filterCountSpan = document.getElementById('js-more-filterbtn-count');
    
    function updateFilterCount() {
        const checkboxes = document.querySelectorAll('.modal-single-check-box input[type="checkbox"]:checked');
        let selectedFilterCount = checkboxes.length;
        
        // Check if a date range is selected
        if (filterDateBtn.textContent !== `Dates`) {
            selectedFilterCount++;
        }
        // Check if guest count filter is applied
        if (guestCount > 0) {
            selectedFilterCount++;
        }

        // Check if price range filter is applied
        if (minPriceInput.value !== minPriceSlider.min || maxPriceInput.value !== maxPriceSlider.max) {
            selectedFilterCount++;
        }

        if (selectedFilterCount > 0) {
            filterCountSpan.style.display = 'inline'; 
            filterCountSpan.innerHTML = selectedFilterCount;
        } else {
            filterCountSpan.style.display = 'none'; 
        }
    }


    // Attach click event listeners to each filter buttons
    dateBtn.addEventListener('click', showCalendar);
    priceBtn.addEventListener('click', showModal);
    guestsBtn.addEventListener('click', showModal);
    moreFiltersBtn.addEventListener('click', showModal);

    // Attach click event listeners to close buttons
    closeBtns.addEventListener('click', hideModal);
    
    // Clear Button JS
    clearFilterBtn.addEventListener('click', function() {
        // Reset guest count
        guestCount = 0;
        updateGuestDisplay();

        // Clear all selected amenities
        const checkboxes = document.querySelectorAll('.modal-single-check-box input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset price range
        minPriceInput.value = minPriceSlider.min;
        maxPriceInput.value = maxPriceSlider.max;
        minPriceSlider.value = minPriceSlider.min;
        maxPriceSlider.value = maxPriceSlider.max;
        priceBtn.innerHTML = `Price`;
        priceRangeCloseBtn.style.display = 'none' ;

        // Hide the "more filter" button span
        filterCountSpan.style.display = 'none';

        filterDateBtn.textContent = `Dates`;
        dateCloseBtn.style.display = 'none';
        checkinInput.value = null;
        checkoutInput.value = null;
        selectedStartDate = null;
        selectedEndDate = null;

        // Update filter count
        updateFilterCount();
    });

    // Search Button
    modalSearchSubmit.addEventListener('click', function() {
        hideModal();
        if (guestCount > 0) {
            performGuestSearch();
        } 
         
        if (minPriceInput.value !== minPriceSlider.min || maxPriceInput.value !== maxPriceSlider.max) {
            performPriceRangeSearch();
        }

        if (getSelectedAmenities().length > 0) {
            performAmenitiesSearch();
        }
        
        if (selectedStartDate && selectedEndDate) {
            performDateSearch(selectedStartDate, selectedEndDate)
        }
        

        // Update the filter count after performing searches
        updateFilterCount();
    });


    

