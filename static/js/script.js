document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('js-btn-search');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const closeBtn = document.getElementById('js-btn-close');
    const tilesContainer = document.getElementById('js-property-tiles');
    
    // Shimmer effect when someone search for a place
    function showShimmerEffect() {
        tilesContainer.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const shimmerTile = `
                <div class="col-xs-12 col-sm-6 col-lg-4">
                    <div class="property-tiles shimmer-wrapper">
                        <div class="tiles-img">
                            <div class="shimmer"></div>
                        </div>
                        <div class="tiles-details">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="shimmer"></div>
                            <div class="tiles-btn">
                                <div class="col-xs-5 col-sm-5 col-md-6">
                                    <a href="">
                                        <img src="" alt="">
                                    </a>
                                </div>
                                <div class="col-sm-7 col-md-6">
                                    <div class="view-line">
                                        <a href=""></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            tilesContainer.innerHTML += shimmerTile;
        }
    }
    
    function performSearch() {
        const searchQuery = searchInput.value;
        if (searchQuery) {
            const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&order=1`;
            history.pushState(null, '', newUrl);
            
            // Show shimmer effect
            showShimmerEffect();

            // Fetch and display properties
            fetchAndDisplayProperties(searchQuery);
        }
    }

    searchBtn.addEventListener('click', function() {
        searchBox.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        searchBox.style.display = 'none';
    });

    searchSubmit.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    
    async function fetchAndDisplayProperties(searchQuery) {
        try {
            const response = await fetch(`/properties?search=${encodeURIComponent(searchQuery)}&order=1`);
            const data = await response.json();
            
            if (data.success) {
                const properties = data.properties;

                // Clear the container
                tilesContainer.innerHTML = '';

                // Loop through properties and create tiles
                properties.forEach(property => {
                    const categories = property.Categories;
                    const partnerURL = property.PartnerURL;

                    // HTML for star rating 
                    let starRatingHtml = '';
                    if (property.StarRating > 0) {
                        starRatingHtml = `
                            <div class="rating">
                                ${'&#9733;'.repeat(property.StarRating)}
                            </div>
                            <span class="divider"> | </span>
                        `;
                    }

                    // Review or Reviews Text
                    const reviewText = (property.Reviews === 0 || property.Reviews === 1) ? 'Review' : 'Reviews';

                    const tile = `
                        <div class="col-xs-12 col-sm-6 col-lg-4">
                            <div class="property-tiles">
                                <div class="tiles-icon">
                                    <div class="fav-icon">
                                        <i class="fa-regular fa-heart" data-id="${property.ID}" data-type="regular"></i>
                                    </div>
                                    <div class="fav-icon" style="display:none; color:red;">
                                       <i class="fa-solid fa-heart" data-id="${property.ID}" data-type="solid"></i>
                                    </div>
                                </div>
                                <div class="tiles-img">
                                    <img src="https://imgservice.rentbyowner.com/640x417/${property.FeatureImage}" alt="${property.PropertyName}">
                                    <span class="listing-price">
                                        <span class="price-info">From $${property.Price}</span>
                                        <span class="price-info-icon">
                                            <i class="fa-solid fa-circle-info"></i>
                                        </span>
                                    </span>
                                </div>
                                <div class="tiles-details">
                                    <div class="info">
                                        <div class="rating-review">
                                            ${starRatingHtml}
                                            <div class="review">
                                                <i class="fa-regular fa-thumbs-up"></i>
                                                <span class="rating-num">${property.ReviewScore}</span>
                                                <span class="review-num"> (${property.Reviews} ${reviewText})</span>
                                            </div>
                                        </div>
                                        <span class="property-type">${property.PropertyType}</span>
                                    </div>
                                    <div class="title">
                                        <a href="">${property.PropertyName}</a>
                                    </div>
                                    <div class="amenities">
                                        <ul class="amenities-list">
                                            ${property.Amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="info">
                                        <ul class="location-list">
                                            <li>${categories[1] || 'null'}</li>
                                            <li> > </li>
                                            <li>${categories[0] || 'null'}</li>
                                        </ul>
                                    </div>
                                    <div class="tiles-btn">
                                        <div class="website-btn col-xs-5 col-sm-5 col-md-6">
                                            <a href="${partnerURL}">
                                                <img src="https://static.rentbyowner.com/release/28.0.6/static/images/booking.svg" alt="Booking.com">
                                            </a>
                                        </div>
                                        <div class="availability-btn col-sm-7 col-md-6">
                                            <div class="view">
                                                <a href="">View Availability</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    tilesContainer.innerHTML += tile;
                });

                // Event listeners for heart icons
                const regularHearts = document.querySelectorAll('.fa-regular.fa-heart');
                const solidHearts = document.querySelectorAll('.fa-solid.fa-heart');

                regularHearts.forEach(heart => {
                    const propertyId = heart.getAttribute('data-id');
                    if (localStorage.getItem(`isFavorite-${propertyId}`) === 'true') {
                        heart.parentElement.style.display = 'none';
                        heart.parentElement.nextElementSibling.style.display = 'block';
                    }

                    heart.addEventListener('click', function() {
                        heart.parentElement.style.display = 'none';
                        heart.parentElement.nextElementSibling.style.display = 'block';
                        localStorage.setItem(`isFavorite-${propertyId}`, 'true');
                    });
                });

                solidHearts.forEach(heart => {
                    const propertyId = heart.getAttribute('data-id');
                    heart.addEventListener('click', function() {
                        heart.parentElement.style.display = 'none';
                        heart.parentElement.previousElementSibling.style.display = 'block';
                        localStorage.setItem(`isFavorite-${propertyId}`, 'false');
                    });
                });
            } else {
                console.error('Error fetching property data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching property data:', error);
        }
    }

    // Fetch and display properties based on the initial URL query
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchQuery = urlParams.get('search');
    
    if (initialSearchQuery) {
        fetchAndDisplayProperties(initialSearchQuery);
    }
});