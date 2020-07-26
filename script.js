const imageContainer = document.getElementById('image-container');
const authorContainer = document.getElementById('author-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let initialLoad = true;

let initialCount = 5;
const apiKey = 'bm46vvXgNvKl1PuEwqGCLXXPn1wAL-o20pLD_KCs0L0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateApiUrlCount(newCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
}

// Check if image were loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }

}

// Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0; // reset

    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        // Crate <a> to link to Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');

        // Create <div> container
        const authorContainer = document.createElement('div');
        const authorContainerImg = document.createElement('div');
        const authorContainerName = document.createElement('div');

        const authorImg = document.createElement('img');
        const authorName = document.createElement('p');

        setAttributes(authorContainer, {
            class: 'author__container'
        });

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
            class: 'fetch-img'
        });

        setAttributes(authorImg, {
            src: photo.user.profile_image.small,
            alt: 'User image',
            title: photo.user.name,
            class: 'author__container-img'
        });

        setAttributes(authorName, {
            class: 'author__container-name'
        });

        authorName.innerText = photo.user.name;

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);

        
        authorContainerImg.appendChild(authorImg);
        authorContainerName.appendChild(authorName);
        
        authorContainer.appendChild(authorContainerImg);
        authorContainer.appendChild(authorContainerName);

        imageContainer.appendChild(authorContainer);
    });
}

async function getPhotos() {
    try {
        const responce = await fetch(apiUrl);
        photosArray = await responce.json();

        console.log(photosArray);

        displayPhotos();

        if (initialLoad) {
            updateApiUrlCount(30);
            initialLoad = false;
        }

    } catch (error) {
        console.log(error);
    }
}

// Checck to load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();