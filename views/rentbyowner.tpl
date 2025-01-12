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
    
    <!-- Filer and Sort Buttons Starts-->
    <div class="container filter-sort-btns">
        <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
               <div class="filter-btns">
                   <div class="filters">
                     <button class="filter-date-btn">Dates</button>
                     <span></span>
                   </div>
                   <div class="filters">
                     <button class="filter-price-btn">Price</button>
                     <span></span>
                   </div>
                   <div class="filters">
                     <button class="filter-guests-btn">Guests</button>
                     <span></span>
                   </div>
                   <div class="filters">
                     <button class="filter-more-btn">More Filters</button>
                     <span></span>
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
    <!-- Filer and Sort Buttons Ends -->

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
    
    <script src="/static/js/script.js"></script>  
    <script src="/static/js/filter-sort.js"></script>   
</body>
</html>