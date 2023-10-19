
let gridVisible = false;

function toggleNotesGrid() {
    const gridContainer = document.getElementById("gridContainer");

    if (gridVisible) {
        gridContainer.style.display = "none";
    } else {
        gridContainer.style.display = "flex";
    }
    
    gridVisible = !gridVisible;
}

const showGridButton = document.getElementById("showGridButton");
showGridButton.addEventListener("click", toggleNotesGrid);

const showGridButto = document.getElementById("showGridButto");
showGridButto.addEventListener("click", showNotesInGrid);

async function showNotesInGrid() {
    
    const apiUrl = 'https://api.imgflip.com/get_memes';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('No se pudieron obtener los memes.');
        }

        const data = await response.json();
        let random= Math.random()*100 ;
        const memes = data.data.memes.slice(random, random+5);

        const gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = "";

        memes.forEach(meme => {
            const memeCard = document.createElement("div");
            memeCard.className = "gridCell";

            const memeImage = document.createElement("img");
            memeImage.src = meme.url;
            memeImage.alt = meme.name;
            memeImage.classname= "imageMeme";

            memeCard.appendChild(memeImage);
            gridContainer.appendChild(memeCard);
        });
    } catch (error) {
        console.error("Error al obtener memes: " + error);
    }
}
document.getElementById("showGridButton").addEventListener("click", showNotesInGrid);

