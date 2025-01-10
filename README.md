# Golang Assignment 

## Overview

**Task Description:** Design and integrate the necessary APIs to build a page like this. Design the tiles with shimmer effect for the first version.
https://www.rentbyowner.com/refine?search=USA&order=1

---

## Installation

1. Clone this repository to your local machine: 
   To get started, clone the repository into your Go workspace `(go/src)` to ensure the project is placed in the correct directory for your Go workspace. If your Go workspace does not contain a `src` folder, please create one.

   ```bash
   git clone https://github.com/SamiaAurin/rentbyowner.git
   cd rentbyowner
   ```
2. Install Go dependencies:

   ```bash
   go mod tidy
   ```    
---

## Running the Application

### Step 1: Start the Beego Server
Run the following command to start the Beego application:
```bash
bee run
```   
### Step 2: Access the Application
Open your browser and navigate to: http://localhost:8080/showproperties

### Step 3: Search Country
Click the search icon in the header , write any country in the search-box and press the search button or press enter. 
Example: If you search for `France` your URL will be: http://localhost:8080/showproperties?search=France&order=1 and it will show the properties of France.