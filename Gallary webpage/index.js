const API_KEY = 'pFcm7ieHci5mRfgyBDHnxhdKHZQlcDG_c5qZlIJNobI';

function convert_to_json(response) {
    return response.json();
}

window.onload = function() {
    fetch(`https://api.unsplash.com/photos?per_page=25&client_id=${API_KEY}`)
        .then(convert_to_json)
        .then(function(data) {
            generateCards(data);
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

function generateCards(data) {
    console.log(data); // Log the data to verify its structure
    const container = document.getElementById('image_container');
    for (let i = 0; i < data.length; i++) {
        const single_item = data[i];
        const card = document.createElement('div');
        const anchor = document.createElement('a');
        const img = document.createElement('img');

        card.classList.add('item');
        anchor.href = `/detail.html?id=${single_item.id}`;
        card.style.backgroundColor = single_item.color;

        console.log(single_item); // Log single_item to verify it contains the expected properties
        img.src = single_item.urls.thumb;

        // Append the image to the anchor
        anchor.appendChild(img);

        // Append the anchor to the card
        card.appendChild(anchor);

        // Append the card to the container
        container.appendChild(card); // Ensure there's a container with id 'container'
    }
    
}
