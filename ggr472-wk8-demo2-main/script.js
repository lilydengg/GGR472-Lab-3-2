/*--------------------------------------------------------------------
GGR472 WEEK 8: JavaScript for Web Maps
Adding elements and interactivity to the map (JavaScript legend and events)
--------------------------------------------------------------------*/

mapboxgl.accessToken = 'pk.eyJ1IjoibGlseWRlbmciLCJhIjoiY201eGIwOG5jMDB6ZDJqcHJrdGtudzVscSJ9.-cRhTqv-44DxjWWHAi9GmQ'

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lilydeng/cm7p7o49v019301qsd8cp0uqa',
    center: [-105, 65],
    zoom: 2.5,
    maxBounds: [
        [140,0], 
        [25, 85] 
    ],
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca"
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('load', () => {
    map.addSource('canada-provterr', {
        'type': 'vector',
        'url': 'mapbox://lgsmith.843obi8n'
    });

    map.addLayer({
        'id': 'provterr-fill',
        'type': 'fill',
        'source': 'canada-provterr',
        'paint': {
            'fill-color':         [
                'step', 
                ['get', 'POP2021'], 
                '#fd8d3c', 
                100000, '#fc4e2a', 
                500000, '#e31a1c',
                1000000, '#bd0026',
                5000000, '#800026'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        },
        'source-layer': 'can-provterr2021-9crjaq'
    });

});

const legendlabels = [
    '0-100,000',
    '100,000-500,000',
    '500,000-1,000,000',
    '1,000,000-5,000,000',
    '>5,000,000'
];

const legendcolours = [
    '#fd8d3c',
    '#fc4e2a',
    '#e31a1c',
    '#bd0026',
    '#800026'
];


const legend = document.getElementById('legend');

//For each layer create a block to put the colour and label in
legendlabels.forEach((label, i) => {
    const colour = legendcolours[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); 'key' //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legend.appendChild(item); //add row to the legend
});


/*--------------------------------------------------------------------
ADD INTERACTIVITY BASED ON HTML EVENT
--------------------------------------------------------------------*/

// 1) Add event listener which returns map view to full screen on button click using flyTo method
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-105, 65],
        zoom: 3,
        essential: true
    });
});


// 2) Change display of legend based on check box
let legendcheck = document.getElementById('legendcheck');

legendcheck.addEventListener('click', () => {
    if (legendcheck.checked) {
        legendcheck.checked = true;
        legend.style.display = 'block';
    }
    else {
        legend.style.display = "none";
        legendcheck.checked = false;
    }
});


// 3) Change map layer display based on check box using setLayoutProperty method
document.getElementById('layercheck').addEventListener('change', (e) => {
    map.setLayoutProperty(
        'provterr-fill',
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});


// 4) Filter data layer to show selected Province from dropdown selection
let boundaryvalue;

document.getElementById("boundaryfieldset").addEventListener('change',(e) => {   
    boundaryvalue = document.getElementById('boundary').value;

    //console.log(boundaryvalue); // Useful for testing whether correct values are returned from dropdown selection

    if (boundaryvalue == 'All') {
        map.setFilter(
            'provterr-fill',
            ['has', 'PRENAME'] // Returns all polygons from layer that have a value in PRENAME field
        );
    } else {
        map.setFilter(
            'provterr-fill',
            ['==', ['get', 'PRENAME'], boundaryvalue] // returns polygon with PRENAME value that matches dropdown selection
        );
    }

});
