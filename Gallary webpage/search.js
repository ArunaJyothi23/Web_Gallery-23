const API_KEY = 'pFcm7ieHci5mRfgyBDHnxhdKHZQlcDG_c5qZlIJNobI';

function convert_to_json(response) {
    return response.json();
}

window.onload = function() {
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);

    console.log("Search parameters:", search_params.toString());

    if (!search_params.has('q') || search_params.get('q') === "") {
        window.location.href = './';
    } else {
        const query = search_params.get('q');
        console.log(`Searching for: ${query}`);
        
        fetch(`https://api.unsplash.com/search/photos?per_page=25&query=${query}&client_id=${API_KEY}`)
            .then(convert_to_json)
            .then(function(data) {
                console.log("API Response:", data); // Log the response from the API
                if (data && data.results && data.results.length > 0) {
                    generateCards(data.results);
                    document.getElementsByName('q')[0].value = search_params.get('q');
                    document.getElementById('search_query').innerText = query;
                } else {
                    console.error("No results found.");
                    document.getElementById('search_query').innerText = `No results found for "${query}"`;
                }
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
            });
    }
};

function generateCards(data) {
    console.log("Generating cards with data:", data); // Log the data passed to generateCards
    const container = document.getElementById('result_container');
    container.innerHTML = ""; // Clear previous results if any
    data.forEach(single_item => {
        const card = document.createElement('div');
        const anchor = document.createElement('a');
        const img = document.createElement('img');

        card.classList.add('item');
        anchor.href = `/detail.html?id=${single_item.id}`;
        card.style.backgroundColor = single_item.color || '#ccc';

        img.src = single_item.urls.thumb;
        img.alt = single_item.alt_description || 'Image';

        anchor.appendChild(img);
        card.appendChild(anchor);
        container.appendChild(card);
    });
}
