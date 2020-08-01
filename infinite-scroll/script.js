const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = '_TH5_J0WRsjNwwBiHOUQrDyvBafU6Eon0WuWAbr36-w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded===totalImages) {
        ready = true;
        loader.hidden = true;
        imagesLoaded = 0;
        count = 10
    }
}

//Helper function to set attribute to DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create Elements for links & photos, add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    //Run function for each object in the photosArray
    photosArray.forEach(photo => {
        //Create an <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });

        //Create an image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });
        //Event listener, check when each is finished loading
        imageLoaded();

        //Put the image inside anchor and both inside pur container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error here
    }
}

//Check to see if scroling near bottom of the page, lod more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1080 && ready === true) {
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();