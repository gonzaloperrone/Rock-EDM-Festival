document.addEventListener('DOMContentLoaded', function () {
    appInit();
});

function appInit() {
    fixNav();
    createGallery();
    scrollNav();
}

function fixNav() {
    const navbar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.aboutFestival');
    const body = document.querySelector('body')

    window.addEventListener('scroll', function () {

        if (aboutFestival.getBoundingClientRect().top < 0) {
            navbar.classList.add('fix');
            body.classList.add('bodyScroll');
        } else {
            navbar.classList.remove('fix');
            body.classList.remove('bodyScroll');
        }
    })
}

function scrollNav() {
    const links = document.querySelectorAll('.principalNavigation a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const scrollSection = e.target.attributes.href.value;
            const section = document.querySelector(scrollSection);
            section.scrollIntoView({ behavior: 'smooth' })
        })
    })
}

function createGallery() {
    const gallery = document.querySelector('.galleryImages');

    for (let i = 1; i <= 12; i++) {
        const img = document.createElement('picture');
        img.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Gallery image" loading="lazy">
        `;

        img.onclick = function () {
            showImg(i);
        }
        img.classList.add('imgGallery')

        gallery.appendChild(img);
    }
}

function showImg(id) {
    const img = document.createElement('picture');
    img.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img width="200" height="300" src="build/img/grande/${id}.jpg" alt="Gallery image" loading="lazy">
        `;

    //Create overlay with Img
    const overlay = document.createElement('DIV');
    overlay.appendChild(img);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fixBody');
    }

    //Modal close button
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('closeBtn');
    closeModal.onclick = function () {
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fixBody');
    }
    overlay.appendChild(closeModal);

    //Add to HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fixBody');
}