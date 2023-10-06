const usuarios = JSON.parse(localStorage.getItem("userData")) ?? [];
let currentUser = null;
let autoSaveTimer = null;

// Función para iniciar sesión
function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const foundUser = usuarios.find(user => user.username === usernameInput && user.password === passwordInput);

    if (foundUser) {
        currentUser = foundUser.username;
        showNotes();
    } else {
        let timerInterval
        Swal.fire({
            title: 'Credenciales incorrectas. Intente nuevamente.',
            html: 'Vuelva a intentarlo en <b></b> milisegundos.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }
}
// Funcion para mostrar las notas del usuuario
function showNotes() {
    const loginForm = document.getElementById("loginForm");
    const notesArea = document.getElementById("notesArea");
    const notesList = document.getElementById("notesList");
    const noteInput = document.getElementById("noteInput");

    loginForm.style.display = "none";
    notesArea.style.display = "block";

    const userNotesList = JSON.parse(localStorage.getItem("userNotes"))[currentUser] ?? [];

    notesList.innerHTML = "";
    userNotesList.forEach((note, index) => {
        const listItem = document.createElement("li");

        listItem.setAttribute("data-note-index", index);

        const truncatedNote = note.length > 18 ? note.substring(0, 18) : note;

        const deleteButton = document.createElement("button");
        deleteButton.className = "trash-btn";
        deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
        deleteButton.addEventListener("click", () => deleteNote(index));

        listItem.addEventListener("click", () => {
            const noteIndex = listItem.getAttribute("data-note-index");

            let num = index + 1;
            let subTitle = note.split("\n")[0];
            subTitle = subTitle.length > 80 ? subTitle.substring(0, 80) : subTitle;
            numNote.innerHTML = `Note ${num}- ${subTitle}`;

            noteInput.value = userNotesList[noteIndex];

            noteInput.setAttribute("data-editing-index", noteIndex);
        });

        listItem.textContent = truncatedNote;
        listItem.appendChild(deleteButton);
        notesList.appendChild(listItem);
    });
}
// Función para agregar notas
function addNote() {
    const newNote = document.getElementById("noteInput").value;
    const editingIndex = noteInput.getAttribute("data-editing-index"); 

    if (newNote !== "") {
        const userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};

        const userNotesList = userNotes[currentUser] || [];

        if (editingIndex !== null) {
            userNotesList[editingIndex] = newNote;
        } else {  
            userNotesList.push(newNote);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1100
              })
        }
        userNotes[currentUser] = userNotesList;
        localStorage.setItem("userNotes", JSON.stringify(userNotes));

        showNotes();
        document.getElementById("noteInput").value = ""; 
        numNote.innerHTML = ""; 

        noteInput.removeAttribute("data-editing-index");
        
    }
    numNote.innerHTML = `NEW NOTE. . .`;
}

// Función para eliminar una nota
function deleteNote(index) {
    if (currentUser !== null) {

        const userNotesList = JSON.parse(localStorage.getItem("userNotes"))[currentUser] ?? [];

        if (index >= 0 && index < userNotesList.length) {
            userNotesList.splice(index, 1);

            const userNotes = JSON.parse(localStorage.getItem("userNotes")) ?? {};
            userNotes[currentUser] = userNotesList;
            localStorage.setItem("userNotes", JSON.stringify(userNotes));

            document.getElementById("noteInput").value = "";

            numNote.innerHTML = "";

            showNotes();

        }
    }
}

const noteTextArea = document.getElementById("noteInput");

// Escuchar "input" del textarea 
noteTextArea.addEventListener("input", () => {
    const editingIndex = noteTextArea.getAttribute("data-editing-index");

    if (editingIndex !== null) {

        const listItem = document.querySelector(`li[data-note-index="${editingIndex}"]`);
        if (listItem) {

            let num = parseInt(editingIndex) + 1;
            let subTitle = noteTextArea.value.split("\n")[0];
            subTitle = subTitle.length > 80 ? subTitle.substring(0, 80) : subTitle;
            numNote.innerHTML = `Note ${num}- ${subTitle}`;

            const deleteButton = document.createElement("button");
            deleteButton.className = "trash-btn";
            deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
            deleteButton.addEventListener("click", () => deleteNote(editingIndex));

            listItem.textContent = noteTextArea.value.length > 18 ? noteTextArea.value.substring(0, 18) : noteTextArea.value;
            listItem.appendChild(deleteButton);
        }
    }
    saveNote();
});

// Función para guardar la nota despues de cada cambio
function saveNote() {
    const currentNote = noteTextArea.value;

    const userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};

    const editingIndex = noteTextArea.getAttribute("data-editing-index");

    if (editingIndex !== null) {
        userNotes[currentUser][editingIndex] = currentNote;
        localStorage.setItem("userNotes", JSON.stringify(userNotes));
    }
}

// Función para cerrar sesión
function logout() {
    currentUser = null;
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("notesArea").style.display = "none";
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'LogOut successfully'
      })
    setTimeout(function () {
        window.location.reload();
    }, 3000);
}

// PARTE DE REGISTRO...

// Función para mostrar el formulario de registro
function showRegistrationForm() {
    document.getElementById("createAccountButton").style.display = "none";

    document.getElementById("registrationForm").style.display = "block";
}

// Función para registrar al usuario
function registerUser() {
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    const newUser = { username, password };

    usuarios.push(newUser);

    localStorage.setItem("userData", JSON.stringify(usuarios));

    document.getElementById("registrationForm").style.display = "none";

    document.getElementById("successMessage").style.display = "block";

    setTimeout(function () {
        window.location.reload();
    }, 2000);
}

// botón "Crear cuenta"
document.getElementById("createAccountButton").addEventListener("click", showRegistrationForm);

//  botón "Registrarse"
document.getElementById("registerButton").addEventListener("click", registerUser);