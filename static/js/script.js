document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('js-btn-search');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const closeBtn = document.getElementById('js-btn-close');
    const tilesContainer = document.getElementById('js-property-tiles');

    searchBtn.addEventListener('click', function() {
        searchBox.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        searchBox.style.display = 'none';
    });

    searchSubmit.addEventListener('click', function() {
        const searchQuery = searchInput.value;
        if (searchQuery) {
            // Update the URL without reloading the page
            const newUrl = `/showproperties?search=${encodeURIComponent(searchQuery)}&order=1`;
            history.pushState(null, '', newUrl);
            
            // Fetch and display properties
            fetchAndDisplayProperties(searchQuery);
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
                    
                    //  HTML for star rating 
                    let starRatingHtml = '';
                    if (property.StarRating > 0) {
                        starRatingHtml = `
                            <div class="rating star-icons-${property.StarRating}">
                                ${'&#9733;'.repeat(property.StarRating)}
                            </div>
                            <span class="divider"> | </span>
                        `;
                    }

                    //  Review or Reviews Text
                    const reviewText = property.Reviews === 1 ? 'Review' : 'Reviews';

                    const tile = `
                        <div class="col-xs-12 col-sm-6 col-lg-4">
                            <div class="property-tiles">
                                <div class="tiles-icon">
                                    <div class="fav-icon">
                                        <i class="fa-regular fa-heart"></i>
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
                                            <a href="">
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