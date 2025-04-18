const element = document.querySelector('img');
element.src = '../iconos/gift-icon.png';

function abrirRegalo(event) {
    const image = event.currentTarget;
    image.src = '../iconos/giphy.gif';
    image.removeEventListener('click', abrirRegalo);
}

const image = document.querySelector('img');
image.addEventListener('click', abrirRegalo);