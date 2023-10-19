// Constructor para usuarios
function User(username, password) {
  this.username = username;
  this.password = password;
}

// Constructor para notas
function NoteList() {
  this.currentUser = null;
  this.autoSaveTimer = null;
  this.users = JSON.parse(localStorage.getItem("userData")) || [];
  this.userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};

  // Iniciar sesión
  this.login = function () {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const foundUser = this.users.find(user => user.username === usernameInput && user.password === passwordInput);

    if (foundUser) {
      this.currentUser = foundUser.username;
      this.showNotes();
    } else {
      // Handle incorrect credentials
    }
  };

  // Mostrar notas
  this.showNotes = function () {
    // Implementación de mostrar notas
  };

  // Agregar nota
  this.addNote = function () {
    // Implementación de agregar nota
  };

  // Eliminar nota
  this.deleteNote = function (index) {
    // Implementación de eliminar nota
  };

  // Guardar nota
  this.saveNote = function () {
    // Implementación de guardar nota
  };

  // Cerrar sesión
  this.logout = function () {
    // Implementación de cerrar sesión
  };

  // Mostrar formulario de registro
  this.showRegistrationForm = function () {
    // Implementación de mostrar formulario de registro
  };

  // Registrar usuario
  this.registerUser = function () {
    // Implementación de registrar usuario
  };
}

const noteList = new NoteList();

// Event listeners
document.getElementById("buttonLogin").addEventListener("click", () => noteList.login());
document.getElementById("addNoteButton").addEventListener("click", () => noteList.addNote());
document.getElementById("addNoteButton").addEventListener("click", () => noteList.addNote());
document.getElementById("registerButton").addEventListener("click", () => noteList.registerUser());
document.getElementById("logoutButton").addEventListener("click", () => noteList.logout());

const noteTextArea = document.getElementById("noteInput");
noteTextArea.addEventListener("input", () => noteList.saveNote());
