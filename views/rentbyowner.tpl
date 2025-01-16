<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/css/rentbyowner.css" rel="stylesheet">
    <!-- Font Awesome Icon -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <title>RentByOwner</title>
</head>
<body>
    
    <!-- Header / Navbar -->
    <header class="header-container">
        <div class="header">
            <a href="/">
                <img src="https://static.rentbyowner.com/release/28.0.6/static/images/sites/rentbyowner.com/header_logo.svg" alt="renbyowner logo">
            </a>
            <span class="" id="js-btn-search">
                <span class="search-btn" id="js-btn-search">
                    <i class="fas fa-search"></i>
                </span>
            </span>
        </div>
    </header>
    <div id="search-box" class="search-box" style="display:none;">
        <input type="text" id="search-input" placeholder="Enter location...">
        <button id="search-submit">Search</button>
        <span class="close-btn" id="js-btn-close">
            <i class="fas fa-times"></i>
        </span>
    </div>
    
    <!-- Filter and Sort Buttons Starts-->
    <div class="container filter-sort-btns">
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
               <div class="filter-btns">
                   <div class="filters">
                     <button id="filter-date-btn">Dates</button>
                     <span class="filter-close-btn" id="js-date-range-close" style="display:none;">
                        <svg class="icon">
                            <use xlink:href="#close"></use>
                        </svg>
                     </span>
                   </div>
                   <div class="filters">
                     <button id="filter-price-btn">Price</button>
                     <span class="filter-close-btn" id="js-price-range-close" style="display:none;">
                        <svg class="icon">
                            <use xlink:href="#close"></use>
                        </svg>
                     </span>
                   </div>
                   <div class="filters">
                     <button id="filter-guests-btn">Guests</button>
                     <span class="filter-close-btn" id="js-guest-count-close" style="display:none;">
                        <svg class="icon">
                            <use xlink:href="#close"></use>
                        </svg>
                     </span>
                   </div>
                   <div class="filters">
                     <button id="filter-more-btn">More Filters</button>
                     <span class="more-filterbtn-count" id="js-more-filterbtn-count" style="display:none;">
                     </span>
                   </div>
               </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                <div class="sort">
                    <span class="sort-title color-primary ellipsis" title="Sort by">Sort by </span>
                    <div id="js-sort" class="sort-dropdown">
                        <ul class="default-option">
                            <li data-value="1">
                                <div class="option">
                                    <p>Most Popular</p>
                                </div>
                            </li>
                        </ul>
                        <ul id="js-select-ul" class="select-ul">
                            <li id="js-order-1" data-value="1">
                                <div class="option">
                                    <p class="ellipsis">Most Popular</p>
                                </div>
                            </li>
                            <li id="js-order-3" data-value="3">
                                <div class="option">
                                    <p class="ellipsis">Highest Price</p>
                                </div>
                            </li>
                            <li id="js-order-2" data-value="2">
                                <div class="option">
                                    <p class="ellipsis">Lowest Price</p>
                                </div>
                            </li>
                            <li id="js-order-5" data-value="5">
                                <div class="option">
                                    <p class="ellipsis">Highest Rating</p>
                                </div>
                            </li>
                            <li id="js-order-4" data-value="4">
                                <div class="option">
                                    <p class="ellipsis">Lowest Rating</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Filter and Sort Buttons Ends -->
    
    <!-- Property Tiles Container Starts -->
    <div class="container property-tiles-container">
        <div class="row" id="js-property-tiles">
            <!-- Shimmer Effects -->
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
        </div>
    </div>
    
    
    <!-- Filter Modal Starts -->
    <div class="filter-modal-popup" id="js-filter-modal" style="display: none;">
        <div class="modal-overlay"></div>
        <div class="modal-container">
            <div class="modal-header">
                &nbsp;
            </div>
            <div class="modal-body">
                <div class="top">
                    <div class="filter-pop-up-container">
                        <div class="modal-title">
                            Filters
                            <div class="modal-close-btn" id="js-filter-close">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <div class="modal-subtitle">Type of property</div>
                        <div class="modal-check-box">
                            <div class="row">
                                <div class="col-xs-9 col-sm-9 col-md-9" style="position: relative;">
                                    <div class="icon-left">
                                        <img class="pet-marker" src="https://static.rentbyowner.com/release/28.0.6/static/images/paw.svg" alt="petfirendly" loading="lazy" width="23" height="23">
                                    </div>
                                    <div class="checkbox-wrapper">
                                        <div class="modal-check-box-label-title">
                                            Pet-friendly only
                                            <a href="https://www.petfriendly.io/" target="_blank" class="js-pet-site-link"> (Learn More) </a>
                                        </div>
                                        <div class="modal-check-box-label-sub-title">
                                            Show only pet-friendly properties
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3">
                                    <label class="modal-single-check-box">
                                        <input class="js-pet-friendly" type="checkbox" id="amenity-20" value="Pet Friendly">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
    
                            <div class="row" id="js-eco-friendly-filter">
                                <div class="col-xs-9 col-sm-9 col-md-9" style="position: relative;">
                                    <div class="icon-left">
                                        <i class="fas fa-leaf"></i>
                                    </div>
                                    <div class="checkbox-wrapper">
                                        <div class="modal-check-box-label-title">
                                            Eco-friendly only
                                            <a href="https://www.onedegreeleft.com" target="_blank"> (Learn More) </a>
                                        </div>
                                        <div class="modal-check-box-label-sub-title">
                                            Show only eco-friendly properties
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3">
                                    <label class="modal-single-check-box">
                                        <input type="checkbox" id="amenity-21" value="Eco-friendly">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
    
                        <!-- check in out div starts -->
                        <div class="select-check-in-out">
                            <div class="modal-check-box-label-title" style="font-weight: 600;">
                                Select a date
                            </div>
                            <div class="modal-check-box-label-sub-title">
                                When do you want to travel?
                            </div>
                            <div class="check-in-out-all" id="js-filter-dates">
                                <div class="single-check-in-out">
                                    <span> Check-in</span>
                                    <input type="text" placeholder="" id="js-checkin" readonly="" value="">
                                    <i class="fa-solid fa-angle-down"></i>
                                </div>
                                <div class="single-check-in-out">
                                    <span> Check-out</span>
                                    <input type="text" placeholder="" id="js-checkout" readonly="" value="">
                                    <i class="fa-solid fa-angle-down"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Guest div starts -->
                        <div class="guest-filter">
                            <div class="guest-filter-container">
                                <div class="modal-check-box-label-title" style="font-weight: 600;">
                                    Guests
                                </div>
                                <div class="guest-count">
                                    <div class="guest-filter-btns">
                                        <button type="button" class="guest-button decrease">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <span class="guest">0</span>
                                        <button type="button" class="guest-button increase">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Guest div ends -->
                        
                        <!-- Price Range div starts -->
                        <div class="modal-price-range">
                            <div class="modal-check-box-label-title" style="font-weight: 600;">
                                Price range
                            </div>
                            <div class="modal-check-box-label-sub-title">
                                Select an average nightly price
                            </div>
                            <div class="modal-price-slider" id="js-price-slider">
                                <input class="slider-range" value="0" min="24" max="1000" step="1" id="js-min-price-slider" type="range">
                                <input class="slider-range" value="1000" min="24" max="1000" step="1" id="js-max-price-slider" type="range">
                            </div>
                            <div class="modal-min-max-price js-price-input">
                                <div class="modal-min-price">
                                    <label class="modal-min-price-top">Min price</label>
                                    <span class="currency-text-box">
                                        <span class="currency-icon" id="js-min-currency">৳</span>
                                        <input class="modal-min-price-bottom" type="number" id="js-min-price" value="" min="24" max="1000">
                                    </span>
                                </div>
                                -
                                <div class="modal-max-price">
                                    <label class="modal-min-price-top" id="js-max-price-label">Max price(+)</label>
                                    <span class="currency-text-box">
                                        <span class="currency-icon" id="js-max-currency">৳</span>
                                        <input class="modal-min-price-bottom" type="number" id="js-max-price" value="" min="24">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- Price Range div ends -->

                        <!-- Amenities  div starts -->
                        <div class="modal-amenities">
                            <div class="modal-check-box-label-title" style="font-weight: 600;">
                                Amenities
                            </div>
                            <div class="modal-check-box-label-sub-title">
                                Choose the amenities that are most important
                            </div>
    
                            <div class="modal-amenities-checkbox" id="js-dynamic-amenities-filter">
                                <label class="modal-single-check-box">                
                                    <span title="Air Conditioner">Air Conditioner</span>                
                                    <input type="checkbox" id="amenity-1" value="Air Conditioner">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Balcony/terrace">Balcony/terrace</span>                
                                    <input type="checkbox" id="amenity-2" value="Balcony/terrace">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Bedding/linens">Bedding/linens</span>                
                                    <input type="checkbox" id="amenity-3" value="Bedding/linens">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Breakfast">Breakfast</span>                
                                    <input type="checkbox" id="amenity-4" value="Breakfast">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Child Friendly">Child Friendly</span>                
                                    <input type="checkbox" id="amenity-5" value="Child Friendly">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Hot Tub">Hot Tub</span>                
                                    <input type="checkbox" id="amenity-6" value="Hot Tub">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Internet/Wifi">Internet/Wifi</span>                
                                    <input type="checkbox" id="amenity-7" value="Internet/Wifi">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Kitchen">Kitchen</span>               
                                    <input type="checkbox" id="amenity-8" value="Kitchen">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Laundry">Laundry</span>                
                                    <input type="checkbox" id="amenity-9" value="Laundry">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Parking">Parking</span>                
                                    <input type="checkbox" id="amenity-10" value="Parking">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Pool">Pool</span>                
                                    <input type="checkbox" id="amenity-11" value="Pool">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Smoking">Smoking</span>                
                                    <input type="checkbox" id="amenity-12" value="Smoking">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="TV">TV</span>                
                                    <input type="checkbox" id="amenity-13" value="TV">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="View">View</span>                
                                    <input type="checkbox" id="amenity-14" value="View">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Wheelchair Accessible">Wheelchair Accessible</span>                
                                    <input type="checkbox" id="amenity-15" value="Wheelchair Accessible">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Private Beach">Private Beach</span>                
                                    <input type="checkbox" id="amenity-16" value="Private Beach">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Ocean view">Ocean view</span>                
                                    <input type="checkbox" id="amenity-17" value="Ocean view">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Oceanfront">Oceanfront</span>                
                                    <input type="checkbox" id="amenity-18" value="Oceanfront">                
                                    <span class="checkmark"></span>            
                                </label>
                                <label class="modal-single-check-box">                
                                    <span title="Lake view">Lake view</span>                
                                    <input type="checkbox" id="amenity-19" value="Lake view">                
                                    <span class="checkmark"></span>            
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal Footer with clear and search buttons -->
            <div class="filter-modal-footer">
                <div class="filter-pop-up-container">
                    <div class="modal-buttons">
                        <button class="modal-clear-btn" id="js-clear-filter" disabled="">Clear</button>
                        <div class="search-btn-area">
                            <button class="modal-submit-btn" id="js-apply-filter">
                                <span id="js-filter-select-text" class="title">Search</span>
                            </button>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
    <!-- Filter Modal Ends -->


    <!-- SVG for Cross Icon -->
    <svg style="display: none;">
        <symbol id="close" viewBox="0 0 10 10">
            <line x1="1" y1="1" x2="9" y2="9" stroke="white" stroke-width="1"/>
            <line x1="9" y1="1" x2="1" y2="9" stroke="white" stroke-width="1"/>
        </symbol>
    </svg>

    <script src="/static/js/fetchProperties.js"></script>     
    <script src="/static/js/modal.js"></script>
    <script src="/static/js/sort.js"></script>
    <script src="/static/js/main.js"></script>
</body>
</html>