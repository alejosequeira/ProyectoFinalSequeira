let numCaracteres= parseInt(prompt("La contraseña debe tener entre 8 y 16 caracteres, ingresa un valor."))
let numeroValido= validarLargo(numCaracteres)
const password=[]

function validarLargo(numCaracteres){
    if(numCaracteres>=8 && numCaracteres<=16){
        return true
    }else{
        return false
    }
}

while(!numeroValido) {    
	numCaracteres = parseInt( prompt('La contraseña debe tener entre 8 y 16 caracteres, ingresa otro valor.') );
	numeroValido = validarLargo(numCaracteres)
}

// function randomPass(numCaracteres){
for(let i=1;i<=numCaracteres;i++){
    let min = 33;
    let max = 122;
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
password.push(String.fromCharCode(randomNumber))
}
// String.fromCharCode()
alert("Su contraseña es: "+password.join(""))
// }




