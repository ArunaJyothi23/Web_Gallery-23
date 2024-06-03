const API_KEY = 'pFcm7ieHci5mRfgyBDHnxhdKHZQlcDG_c5qZlIJNobI';

function convert_to_json(response) {
    return response.json();
}

window.onload = function() {
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);

    console.log("Search parameters:", search_params.toString());

    if (!search_params.has('id') || search_params.get('id') === "") {
        window.location.href = './';
    } else {
        const id = search_params.get('id');
        console.log(`Fetching details for photo ID: ${id}`);

        fetch(`https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`)
            .then(convert_to_json)
            .then(function(data) {
                console.log("API Response:", data); // Log the response from the API
                loadDetail(data);

                document.getElementById('image_id').innerText = search_params.get('id');
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
            });
    }
}

function loadDetail(data) {
    console.log(data);
    document.getElementById('detail_image').src = data.urls.regular;
    document.getElementById('detail_image').style.borderColor = data.color || "#000";
    document.getElementById('description_text').innerText = data.description || "No description available.";
    document.getElementById('username').innerText = data.user.username;
    document.getElementById('upload_date').innerText = new Date(data.created_at).toLocaleDateString();
    document.getElementById('like_count').innerText = data.likes;
    document.getElementById('view_count').innerText = data.views;
    document.getElementById('alt_description').innerText = data.alt_description || "No alternative description available.";
    document.getElementById('download_link').href = data.links.download;

    const colorText = document.getElementById('color_text');
    const imageColor = document.getElementById('image_color');
    colorText.innerText = data.color || "No color available";
    imageColor.style.backgroundColor = data.color || "#000";
}
