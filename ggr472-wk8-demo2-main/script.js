mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbm5pNDIiLCJhIjoiY201cjdmdmJxMDdodTJycHc2a3ExMnVqaiJ9.qKDYRE5K3C9f05Cj_JNbWA'; // Add default public map token from your Mapbox account

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lgsmith/cm7l6fly600t401qsfxp1cvyv', // or select existing mapbox style - https://docs.mapbox.com/api/maps/styles/
    center: [-79.3832, 43.6532], // [Longitude, Latitude]
    zoom: 12.5,
});


//This loads the map so it can be seen
map.on('load', () => {
    // This adds the data that outlines the ski resort
    map.addSource('listing_data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/smith-lg/ggr472-wk8-demo1/refs/heads/main/data/can-provterr.geojson', // Corrected URL
    });

    // This provides a physical aesthetic element to the data
    map.addLayer({
        'id': 'listing_data',
        'type': 'fill',
        'source': 'listing_data',
        'paint': {
            'fill-color': [
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

    });
});



map.on('click', 'listing_data', (e) => {
    console.log('Click event triggered');
    console.log('Event features:', e.features);

    if (e.features.length > 0) {
        const feature = e.features[0];
        console.log('Feature properties:', feature.properties);

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Area' + " = " +feature.properties.LANDAREA || 'No name available')
            .addTo(map);
    } else {
        console.log('No features found at click location');
    }
});




    map.on('mouseenter', 'listing_data', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'listing_data', () => {
        map.getCanvas().style.cursor = '';
    });

map.addControl(new mapboxgl.NavigationControl());
//This loads the map so it can be seen
map.on('load', () => {
    // This adds the data that outlines the ski resort
    map.addSource('listing_data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/smith-lg/ggr472-wk8-demo1/refs/heads/main/data/can-provterr.geojson', // Corrected URL
    });

    // This provides a physical aesthetic element to the data
    map.addLayer({
        'id': 'listing_data',
        'type': 'fill',
        'source': 'listing_data',
        'paint': {
            'fill-color': [
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

    });
});



map.on('click', 'listing_data', (e) => {
    console.log('Click event triggered');
    console.log('Event features:', e.features);

    if (e.features.length > 0) {
        const feature = e.features[0];
        console.log('Feature properties:', feature.properties);

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('Area' + " = " +feature.properties.LANDAREA || 'No name available')
            .addTo(map);
    } else {
        console.log('No features found at click location');
    }
});




    map.on('mouseenter', 'listing_data', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'listing_data', () => {
        map.getCanvas().style.cursor = '';
    });

map.addControl(new mapboxgl.NavigationControl());