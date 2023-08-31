function validarLargo() {
    
    const input = document.getElementById("length");
    const errorMessage = document.getElementById("error-message");

    if (input.value >= 8 && input.value <= 16) {
      errorMessage.textContent = "Correcto! Por favor configura tu contraseña de "+input.value+" caracteres...";        
    } else {
      errorMessage.textContent = "La contraseña debe tener entre 8 y 16 caracteres, ingresa otro valor.";
    }
  }