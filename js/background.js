// Function that sets the background
function setBackgroundImage() {
    let width, height;
    if (window.innerWidth < 720 || window.innerHeight < 480) {
        width = 720;
        height = 480;
    } else if (window.innerWidth < 1280 || window.innerHeight < 720) {
        width = 1280;
        height = 720;
    } else if (window.innerWidth < 1920 || window.innerHeight < 1080) {
        width = 1920;
        height = 1080;
    } else if (window.innerWidth < 2560 || window.innerHeight < 1440) {
        width = 2560;
        height = 1440;
    } else {
        width = 3840;
        height = 2160;
    }

    // let url = "https://source.unsplash.com/" + width + "x" + height + "/?" + `${city}`;
    let url = "https://picsum.photos/" + width + "/" + height;
    const img = new Image();
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    img.onload = function () { // Function that waits for the image to load
        loadingIndicator.style.display = 'none';
        document.body.style.backgroundImage = "url('" + url + "')";
        console.log("Background image set to:", url);
    };
    img.onerror = function () { // Function that resets the indicator if the image fails to load
        loadingIndicator.style.display = 'none';
        console.error('Failed to load background image');
    };
    img.src = url;
}
