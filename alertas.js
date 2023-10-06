
let gridVisible = false;

function toggleNotesGrid() {
    const gridContainer = document.getElementById("gridContainer");

    if (gridVisible) {
        gridContainer.style.display = "none";
    } else {
        gridContainer.style.display = "grid";
    }
    
    gridVisible = !gridVisible;
}

const showGridButton = document.getElementById("showGridButton");
showGridButton.addEventListener("click", toggleNotesGrid);


// Función para mostrar las notas en la cuadrícula
function showNotesInGrid() {
    const gridContainer = document.getElementById("gridContainer");

    const userNotesList = JSON.parse(localStorage.getItem("userNotes"))[currentUser] || [];

    userNotesList.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.className = "gridCell";        
        
        let subTitle = note.split("\n")[0];
        subTitle = subTitle.length > 80 ? subTitle.substring(0, 80) : subTitle;

        noteCard.innerHTML = `<h3>${subTitle}</h3><p>${note}</p>`;

        gridContainer.appendChild(noteCard);
    });
}

//  botón "Mostrar Notas en Cuadrícula"
document.getElementById("showGridButton").addEventListener("click", showNotesInGrid);
