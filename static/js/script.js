document.addEventListener("DOMContentLoaded", function() {
    async function fetchAndDisplayProperties() {
        try {
            const response = await fetch('/properties'); // Adjust the endpoint as needed
            const data = await response.json();
            
            if (data.success) {
                const properties = data.properties;
                const tilesContainer = document.getElementById('js-property-tiles');

                // Clear the container
                tilesContainer.innerHTML = '';

                // Loop through properties and create tiles
                properties.forEach(property => {
                    const tile = `
                        <div class="col-xs-12 col-sm-6 col-lg-4">
                            <div class="property-tiles">
                                <div class="tiles-icon">
                                    <div class="fav-icon">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <div class="tiles-img">
                                    <img src="${property.FeatureImage}" alt="${property.PropertyName}">
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
                                            <div class="review">
                                                <i class="fa-regular fa-thumbs-up"></i>
                                                <span class="rating-num">${property.ReviewScore}</span>
                                                <span class="review-num"> (${property.Reviews} Reviews)</span>
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
                                    <div class="tiles-btn">
                                        <div class="website-btn col-sm-5 col-md-6">
                                            <a href="">
                                                <img src="/static/img/bookingcom.png" alt="">
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

    // Call the function to fetch and display properties when the page loads
    fetchAndDisplayProperties();
});