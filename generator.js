// let tarea= document.getElementById("text-note")
// tarea.onkeyup= () => {console.log(tarea.value)}

// tarea.addEventListener(`textarea`, ()=>{console.log(tarea.value)})

const usuarios = JSON.parse(localStorage.getItem("userData")) ?? [];
let currentUser = null;

// Función para iniciar sesión
// Función para iniciar sesión
function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Verificar si el usuario existe en los datos almacenados
    const foundUser = usuarios.find(user => user.username === usernameInput && user.password === passwordInput);

    if (foundUser) {
        // Usuario válido, mostrar sus notas
        currentUser = foundUser.username;
        showNotes();
    } else {
        // Usuario no válido, mostrar mensaje de error o redirigir
        alert("Credenciales incorrectas. Intente nuevamente.");
    }
}

// Función para mostrar las notas del usuario
// function showNotes() {
//     const loginForm = document.getElementById("loginForm");
//     const notesArea = document.getElementById("notesArea");
//     const notesList = document.getElementById("notesList");

//     // Ocultar el formulario de inicio de sesión y mostrar el área de notas
//     loginForm.style.display = "none";
//     notesArea.style.display = "block";

//     // Obtener las notas del usuario actual desde localStorage
//     const userNotesList = JSON.parse(localStorage.getItem("userNotes"))[currentUser] ?? [];
//     console.log(userNotesList[0]);
//     noteInput.innerHTML = userNotesList[0];
//     // .split("\n")
//     // Mostrar las notas en la lista
//     notesList.innerHTML = "";
//     userNotesList.forEach((note,index) => {
//         const listItem = document.createElement("li");

//         const deleteButton = document.createElement("button");
//         deleteButton.className = "trash-btn";
//         deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
//         deleteButton.addEventListener("click", () => deleteNote(index)); // Asociar la función de eliminación

//         listItem.textContent = note;
//         listItem.appendChild(deleteButton);

//         notesList.appendChild(listItem);
//     });
// }
// function addNote() {
//     const newNote = document.getElementById("noteInput").value;
//     if (newNote) {
//         // Obtener las notas actuales del usuario desde el almacenamiento local
//         const userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};

//         // Obtener las notas del usuario actual o crear un arreglo vacío si no existe
//         const userNotesList = userNotes[currentUser] || [];

//         // Agregar la nueva nota
//         userNotesList.push(newNote);

//         // Actualizar las notas del usuario en el almacenamiento local
//         userNotes[currentUser] = userNotesList;
//         localStorage.setItem("userNotes", JSON.stringify(userNotes));

//         // Actualizar la lista de notas y borrar el contenido del textarea
//         showNotes();
//         document.getElementById("noteInput").value = "";
//     }
// }
function showNotes() {
    const loginForm = document.getElementById("loginForm");
    const notesArea = document.getElementById("notesArea");
    const notesList = document.getElementById("notesList");
    const noteInput = document.getElementById("noteInput");

    // Ocultar el formulario de inicio de sesión y mostrar el área de notas
    loginForm.style.display = "none";
    notesArea.style.display = "block";

    // Obtener las notas del usuario actual desde localStorage
    const userNotesList = JSON.parse(localStorage.getItem("userNotes"))[currentUser] ?? [];
    
    // Mostrar las notas en la lista
    notesList.innerHTML = "";
    userNotesList.forEach((note, index) => {        
        const listItem = document.createElement("li");

        listItem.textContent = note.length>18?note.substring(0, 18):note;

        const deleteButton = document.createElement("button");
        deleteButton.className = "trash-btn";
        deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
        deleteButton.addEventListener("click", () => deleteNote(index)); // Asociar la función de eliminación

        // Agregar un evento clic a cada <li>
        listItem.addEventListener("click", () => {
            let num=index+1;
            let subTitle=note.split("\n")[0];
            subTitle=subTitle.length>80?subTitle.substring(0, 80):subTitle;
            numNote.innerHTML=`Note ${num}- ${subTitle}`;
            
            // Cuando se hace clic en un <li>, copia su contenido al textarea
            noteInput.value = note;
        });
        
        listItem.appendChild(deleteButton);
        notesList.appendChild(listItem);
    });
}

// Función para agregar una nota
function addNote() {
    const newNote = document.getElementById("noteInput").value;
    if (newNote) {
        // Obtener las notas actuales del usuario desde el almacenamiento local
        const userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};

        // Obtener las notas del usuario actual o crear un arreglo vacío si no existe
        const userNotesList = userNotes[currentUser] || [];

        // Agregar la nueva nota
        userNotesList.push(newNote);

        // Actualizar las notas del usuario en el almacenamiento local
        userNotes[currentUser] = userNotesList;
        localStorage.setItem("userNotes", JSON.stringify(userNotes));

        // Actualizar la lista de notas y borrar el contenido del textarea
        showNotes();
        document.getElementById("noteInput").value = "";
    }
}
function deleteNote(index) {
    if (currentUser !== null) {
        // Obtener las notas del usuario actual desde localStorage
        const userNotesList = JSON.parse(localStorage.getItem("userNotes"))[currentUser] ?? [];

        if (index >= 0 && index < userNotesList.length) {
            // Eliminar la nota en el índice especificado
            userNotesList.splice(index, 1);

            // Actualizar las notas en localStorage
            const userNotes = JSON.parse(localStorage.getItem("userNotes")) ?? {};
            userNotes[currentUser] = userNotesList;
            localStorage.setItem("userNotes", JSON.stringify(userNotes));

            // Actualizar la lista de notas en pantalla
            showNotes();
        }
    }
}


// Función para cerrar sesión
function logout() {
    currentUser = null;
    // Mostrar el formulario de inicio de sesión y ocultar el área de notas
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("notesArea").style.display = "none";
}

// PARTE DE REGISTRO...

// Función para mostrar el formulario de registro
function showRegistrationForm() {
    // Oculta el botón "Crear cuenta"
    document.getElementById("createAccountButton").style.display = "none";

    // Muestra el formulario de registro
    document.getElementById("registrationForm").style.display = "block";
}

// Función para registrar al usuario
function registerUser() {
    // Obtiene los valores ingresados por el usuario
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    // Crea un nuevo objeto de usuario
    const newUser = { username, password };

    // Agrega el nuevo usuario al array
    usuarios.push(newUser);

    // Almacena los datos actualizados en el almacenamiento local
    localStorage.setItem("userData", JSON.stringify(usuarios));

    // Cierra el formulario de registro
    document.getElementById("registrationForm").style.display = "none";

    // Muestra el mensaje de éxito
    document.getElementById("successMessage").style.display = "block";

    // Refresca la página después de un breve retraso
    setTimeout(function() {
        window.location.reload();
    }, 2000); 
}

// Manejador de clic en el botón "Crear cuenta"
document.getElementById("createAccountButton").addEventListener("click", showRegistrationForm);

// Manejador de clic en el botón "Registrarse" dentro del formulario de registro
document.getElementById("registerButton").addEventListener("click", registerUser);