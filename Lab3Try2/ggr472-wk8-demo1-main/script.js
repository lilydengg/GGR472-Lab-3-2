/*--------------------------------------------------------------------
GGR472 WEEK 8: JavaScript for Web Maps
Adding elements to the map (map controls and basic legend)
--------------------------------------------------------------------*/

/*--------------------------------------------------------------------
INITIALIZE MAP
--------------------------------------------------------------------*/
mapboxgl.accessToken = ''; //***ADD YOUR ACCESS TOKEN HERE***

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lgsmith/cm7l6fly600t401qsfxp1cvyv', // or select existing mapbox style - https://docs.mapbox.com/api/maps/styles/
    center: [-105, 65],
    zoom: 2.5,
    maxBounds: [
        [140,0], // Southwest
        [25, 85]  // Northeast
    ],
});


/*--------------------------------------------------------------------
ADDING MAPBOX CONTROLS AS ELEMENTS ON MAP
--------------------------------------------------------------------*/
// Add search control to map overlay
// Requires plugin as source in HTML
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "ca" // Limit to Canada only
    })
);

// Add zoom and rotation controls to the top left of the map
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());

/*--------------------------------------------------------------------
mapbox addControl method can also take position parameter 
(e.g., 'top-left') to move from default top right position

To place geocoder elsewhere on page (including outside of the map),
instead of using addControl method, create HTML div tag for geocoder 
and use css to position
--------------------------------------------------------------------*/

// Create geocoder as a variable (and remove previous geocoder)
// const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     countries: "ca" 
// });

// // Append geocoder variable to goeocoder HTML div to position on page
// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));



// /*--------------------------------------------------------------------
// ADD DATA AS CHOROPLETH MAP ON MAP LOAD
// Use get expression to categorise data based on population values
// Same colours and threshold values are used in hardcoded legend
// --------------------------------------------------------------------*/
// // Add data source and draw initial visiualization of layer
// map.on('load', () => {
//     map.addSource('provterr-data', {
//         'type': 'vector',
//         'url': 'mapbox://lgsmith.843obi8n'
//     });

//     map.addLayer({
//         'id': 'provterr-fill',
//         'type': 'fill',
//         'source': 'provterr-data',
//         'paint': {
//             'fill-color': [
//                 'step', // STEP expression produces stepped results based on value pairs
//                 ['get', 'POP2021'], // GET expression retrieves property value from 'capacity' data field
//                 '#fd8d3c', // Colour assigned to any values < first step
//                 100000, '#fc4e2a', // Colours assigned to values >= each step
//                 500000, '#e31a1c',
//                 1000000, '#bd0026',
//                 5000000, '#800026'
//             ],
//             'fill-opacity': 0.5,
//             'fill-outline-color': 'white'
//         },
//         'source-layer': 'can-provterr2021-9crjaq'
//     });
// });