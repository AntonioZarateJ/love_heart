const PIECE_SIZE = 34;

const BIG_HEART_SHAPE = [
    '00110001100',
    '01111011110',
    '11111111111',
    '11111111111',
    '01111111110',
    '00111111100',
    '00011111000',
    '00001110000',
    '00000100000',
];

const LETTER_T = ['111', '010', '010', '010'];
const LETTER_E = ['111', '100', '110', '111'];
const LETTER_A = ['010', '101', '111', '101'];
const LETTER_M = ['101', '111', '101', '101'];
const LETTER_O = ['010', '101', '101', '010'];
const LETTER_I = ['010', '010', '010', '010'];
const LETTER_V = ['101', '101', '101', '010'];
const LETTER_D = ['110', '101', '101', '110'];
const LETTER_R = ['110', '101', '110', '101'];
const LETTER_N = ['101', '111', '111', '101'];
const SPACE =   ['000', '000', '000', '000'];

const PHRASE_LINE1 = [
  LETTER_T, LETTER_E, SPACE, LETTER_A, LETTER_M, LETTER_O
];

const SHOOT_SPEED = 60;
const INITIAL_DELAY = 2600;
const LETTER_SPACING = PIECE_SIZE * 1.5;
const WORD_SPACING = PIECE_SIZE * 4;

document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById('main-container');

    const heartOrigin = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.38 };
    const wordsOrigin = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.68 }; 
    const wordsOrigin2 = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.90 };

    setTimeout(() => {
        shootShape(BIG_HEART_SHAPE, mainContainer, heartOrigin).then(async () => {
            await animateWords(mainContainer, wordsOrigin, PHRASE_LINE1);
            showDedicatoria();
        });
    }, INITIAL_DELAY);
});

async function animateWords(container, origin, shapes) {
    const widths = shapes.map(s => getShapeWidth(s) * PIECE_SIZE);
    const totalWidth = widths.reduce((sum, w) => sum + w, 0) + LETTER_SPACING * (shapes.length - 1);

    let currentOffset = -totalWidth / 2;

    for (const shape of shapes) {
        await shootShape(shape, container, origin, { x: currentOffset, y: 0 });
        currentOffset += getShapeWidth(shape) * PIECE_SIZE + LETTER_SPACING;
    }
}

function shootShape(shapeArray, container, shapeOrigin, localOffset = { x: 0, y: 0 }) {
    return new Promise(resolve => {
        const shapeWidth = getShapeWidth(shapeArray) * PIECE_SIZE;
        const shapeHeight = shapeArray.length * PIECE_SIZE;
        const startX = shapeOrigin.x - shapeWidth / 2 + localOffset.x;
        const startY = shapeOrigin.y - shapeHeight / 2 + localOffset.y;

        const pieces = [];
        for (let y = 0; y < shapeArray.length; y++) {
            for (let x = 0; x < shapeArray[y].length; x++) {
                if (shapeArray[y][x] === '1') {
                    pieces.push({ x, y });
                }
            }
        }

        let pieceIndex = 0;
        const interval = setInterval(() => {
            if (pieceIndex >= pieces.length) {
                clearInterval(interval);
                resolve();
                return;
            }

            const pieceData = pieces[pieceIndex];
            const piece = document.createElement("div");
            piece.classList.add("heart-piece");

            const finalX = startX + pieceData.x * PIECE_SIZE;
            const finalY = startY + pieceData.y * PIECE_SIZE;

            piece.style.setProperty('--x', `${finalX}px`);
            piece.style.setProperty('--y', `${finalY}px`);

            container.appendChild(piece);
            pieceIndex++;
        }, SHOOT_SPEED);
    });
}

function getShapeWidth(shapeArray) {
    return Math.max(...shapeArray.map(row => row.length));
}

function showDedicatoria() {
    const dedicatoria = document.createElement("div");
    dedicatoria.style.position = "fixed";
    dedicatoria.style.left = "50%";
    dedicatoria.style.top = "14%";
    dedicatoria.style.transform = "translate(-50%, -50%)";
    dedicatoria.style.fontSize = "1.8em";
    dedicatoria.style.opacity = "0";
    dedicatoria.style.transition = "opacity 2s";
    dedicatoria.style.color = "#d63384";
    dedicatoria.style.fontWeight = "bold";
    dedicatoria.style.textShadow = "1px 1px 8px #fff, 2px 2px 12px #f89";
    dedicatoria.style.display = "flex";
    dedicatoria.style.flexDirection = "column";
    dedicatoria.style.alignItems = "center";
    dedicatoria.style.gap = "10px";
    dedicatoria.style.textAlign = "center";
    dedicatoria.style.maxWidth = "90vw";
    dedicatoria.style.zIndex = "999";

    // Texto
    const span = document.createElement("span");
    span.innerText = "Amor, gracias por estar en mi vida. Eres mi todo 🫶";
    dedicatoria.appendChild(span);

    // Contenedor de las imágenes
    const imgContainer = document.createElement("div");
    imgContainer.style.display = "flex";
    imgContainer.style.justifyContent = "center";
    imgContainer.style.gap = "12px";
    imgContainer.style.flexWrap = "wrap";

    const photoPaths = [
        "images/Photo.jpg",
        "images/Photo_3.jpg"
    ];

    for (const src of photoPaths) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Foto Iren";
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "50%";
        img.style.boxShadow = "0 2px 8px #fff, 0 4px 12px #f89";
        imgContainer.appendChild(img);
    }

    dedicatoria.appendChild(imgContainer);
    document.body.appendChild(dedicatoria);

    setTimeout(() => {
        dedicatoria.style.opacity = "1";
    }, 300);
}


