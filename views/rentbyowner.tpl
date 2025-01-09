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
    <div class="container property-tiles-container">
        <div class="row" id="js-property-tiles">
            
        </div>
    </div>
    
    <script src="/static/js/script.js"></script>    
</body>
</html>