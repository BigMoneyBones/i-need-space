// Query Selectors

let apiKey = document.querySelector('#api-key'); // Create a variable to QuerySelect the "Mapbox API Key" input field from the html document.
let apikeyInput = "pk.eyJ1IjoiYmlnbW9uZXlib25lcyIsImEiOiJjbDF1eHl1aGgwMHY2M2NwaW5peGxyaWVjIn0.xL2Xe1mV8CU7RY0KGNsphQ" // Set a variable equal to personal API Key for ease of use.
 
let addressInput = document.querySelector('#address'); // Create a variable to QuerySelect the "Address" input field from the html document.

let norad = document.querySelector('#norad');   // Create a variable to QuerySelect the "Satellite NORAD" input field from the html document. 
let search = document.querySelector('#search'); // Create a variable to QuerySelect the "Search" button from the html document.

let infoDisplay = document.querySelector('#infoDisplay'); 
    let displayRise = document.querySelector('#rise');
    let displayCulminate = document.querySelector('#culminate');
    let displaySet = document.querySelector('#set');

// Event Listeners
search.addEventListener('click', function() {
    apiKey.value = apikeyInput;
    let address = addressInput.value;
    fetch(encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey.value}`))
    .then(function(httpResponse) {
        return httpResponse.json();
    })
    .then(function (data) {
        console.log(data);

        let lat = Number(data.features[0].center[1]);
        let long = Number(data.features[0].center[0]);
        norad = norad.value; 

        console.log("Latitude: " + data.features[0].center[1] + ", " + "Longitude: " + data.features[0].center[0]);
        console.log(data.features)

        fetch(`https://satellites.fly.dev/passes/${norad}?lat=${lat}&lon=${long}&limit=1`) // API URI for satellite information
        .then(function(httpResponse) {
            return httpResponse.json(); // Parse fetched information into readable object.
        })
        .then(function(data) { // Call on data inside parsed object.
            console.log(data); // Use DevTools console to find data needed for "rise, culminate, and set"

            let riseUtc = data[0].rise.utc_datetime; // Locate rise data
            let newRise = new Date(riseUtc);         // Assign new value to rise
            console.log(`"rise: "${newRise}`);       // Check to see it worked

            let culminateUtc = data[0].culmination.utc_datetime; // Locate culminate data
            let newCulminate = new Date(culminateUtc);           // Assign new value to culminate
            console.log(`"culminate: "${newCulminate}`);         // Check to see it worked

            let setUtc = data[0].set.utc_datetime;  // Locate set data
            let newSet = new Date(setUtc);          // Assign new value to set
            console.log(`"Set: "${newSet}`);        // Check to see it worked


            displayRise.innerHTML = `"Rise: "${newRise}`;                       // Display to user based on input provided in "address, and Satellite NORAD" input fields.                 
            displayCulminate.innerHTML = `"Culminate: "${newCulminate}`;        // Display to user based on input provided in "address, and Satellite NORAD" input fields.        
            displaySet.innerHTML = `"Set: "${newSet}`;                          // Display to user based on input provided in "address, and Satellite NORAD" input fields.        
        })
       
    })

})
