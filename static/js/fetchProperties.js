// fetchProperties.js
const tilesContainer = document.getElementById('js-property-tiles');
const searchInput = document.getElementById('search-input');
const searchQuery = searchInput.value;

async function fetchAndDisplayProperties(searchQuery, guestCount = null, priceRange = null, amenities = []) {
    try {
        let url = `/properties?search=${encodeURIComponent(searchQuery)}&order=1`;
        
        console.log(`fetchAndDisplayProperties: Fetching URL: ${url}`);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log(`Response for fetchAndDisplayProperties: `, data);

        if (data.success) {
            let properties = data.properties;

            // Filter properties based on guest count if provided
            if (guestCount !== null) {
                properties = properties.filter(property => property.Occupancy >= guestCount);
            }
            
            // Filter properties based on price range if provided
            if (priceRange !== null) {
                properties = properties.filter(property => property.Price >= priceRange.min && property.Price <= priceRange.max);
            }
            
            // Filter properties based on amenities if provided
            if (amenities.length > 0) {
                properties = properties.filter(property => 
                    amenities.some(amenity => property.Amenities.includes(amenity))
                );
            }

            // Clear the container
            tilesContainer.innerHTML = '';

            // Limit amenities to three for each property
            properties.forEach(property => {
                property.Amenities = property.Amenities.slice(0, 3);
            });

            // Display properties
            displayProperties(properties);
        } else {
            console.error('Error fetching property data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching property data:', error);
    }
}


async function fetchPropertiesWithDate(searchQuery, startDate, endDate) {
    let url = `/properties?search=${encodeURIComponent(searchQuery)}&dateStart=${startDate}&dateEnd=${endDate}&order=1`;
    console.log('URL:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('API Response:', data);

        if (data.success) {
            let properties = data.properties;

            // Clear the container
            tilesContainer.innerHTML = '';

            // Limit amenities to three for each property
            properties.forEach(property => {
                property.Amenities = property.Amenities.slice(0, 3);
            });

            // Process and display the fetched properties
            displayProperties(data.properties);
        } else {
            console.error('Error fetching property data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching property data:', error);
    }
}

// Sorting Function
async function fetchAndDisplayPropertiesWithSort(searchQuery, sortValue) {
    try {
        let url = `/properties?search=${encodeURIComponent(searchQuery)}&order=1`;
        console.log(`fetchAndDisplayPropertiesWithSort: Fetching URL: ${url}`);
        
        const response = await fetch(url);
        const data = await response.json();

        console.log(`Response for fetchAndDisplayPropertiesWithSort: `, data);

        if (data.success) {
            let properties = data.properties;

            // Sort properties based on the selected option
            sortProperties(properties, sortValue);
            
            // Limit amenities to three for each property
            properties.forEach(property => {
                property.Amenities = property.Amenities.slice(0, 3);
            });

            // Clear the container
            tilesContainer.innerHTML = '';

            // Display sorted properties
            displayProperties(properties);
        } else {
            console.error('Error fetching property data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching property data:', error);
    }
}

function sortProperties(properties, sortValue) {
    console.log(`Sorting properties with sort value: ${sortValue}`);
    switch (sortValue) {
        case '1':
            // Most Popular (default order)
            break;
        case '2':
            // Lowest Price
            properties.sort((a, b) => a.Price - b.Price);
            break;
        case '3':
            // Highest Price
            properties.sort((a, b) => b.Price - a.Price);
            break;
        case '4':
            // Lowest Rating
            properties.sort((a, b) => a.ReviewScore - b.ReviewScore);
            break;
        case '5':
            // Highest Rating
            properties.sort((a, b) => b.ReviewScore - a.ReviewScore);
            break;
        default:
            break;
    }
}

function displayProperties(properties) {
    console.log(`Displaying ${properties.length} properties`);
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

    // Add event listeners for the favorite icons
    addFavoriteIconListeners();
}

function addFavoriteIconListeners() {
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
}