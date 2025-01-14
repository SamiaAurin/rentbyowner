// main.js

document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('js-btn-search');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const closeBtn = document.getElementById('js-btn-close');
    
    

    // Shimmer effect when someone searches for a place
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
            fetchAndDisplayProperties(searchQuery, null);
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

    

    // Fetch and display properties based on the initial URL query
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchQuery = urlParams.get('search');
    
    if (initialSearchQuery) {
        fetchAndDisplayProperties(initialSearchQuery, null);
    }

    // Export hideModal function
    window.showShimmerEffect = showShimmerEffect;
});