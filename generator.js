const footballPlayers= {
    "team": {
        "players": [            
            {
                "id": "1",
                "name": "Sergio Germán",
                "apellido": "Romero",
                "edad": 23,
                "posicion": "arquero"
            },
            {
                "id": "2",
                "name": "Martín Gastón",
                "apellido": "Demichelis",
                "edad": 29,
                "posicion": "defensor"
            },
            {
                "id": "3",
                "name": "Nicolás Andrés",
                "apellido": "Burdisso",
                "edad": 29,
                "posicion": "defensor"
            },
            {
                "id": "4",
                "name": "Walter Adrián Luján",
                "apellido": "Samuel",
                "edad": 32,
                "posicion": "defensor"
            },
            {
                "id": "5",
                "name": "Gabriel Iván",
                "apellido": "Heinze",
                "edad": 32,
                "posicion": "defensor"
            },
            {
                "id": "6",
                "name": "Maximiliano Rubén",
                "apellido": "Rodríguez",
                "edad": 29,
                "posicion": "mediocampista"
            },
            {
                "id": "7",
                "name": "Javier Alejandro",
                "apellido": "Mascherano",
                "edad": 26,
                "posicion": "mediocampista"
            },
            {
                "id": "8",
                "name": "Ángel Fabián",
                "apellido": "Di Maria",
                "edad": 22,
                "posicion": "mediocampista"
            },
            
            {
                "id": "9",
                "name": "Gonzalo Gerardo",
                "apellido": "Higuaín",
                "edad": 22,
                "posicion": "delantero"
            },
            {
                "id": "10",
                "name": "Lionel Andres",
                "apellido": "Messi",
                "edad": 22,
                "posicion": "delantero"
            },
            {
                "id": "11",
                "name": "Carlos Alberto", 
                "apellido": "Tévez",
                "edad": 26,
                "posicion": "delantero"
            },
        ]
    }
}

let numPlayers= prompt("Seleccion futbol 2010: ingrese un n° o una posición para descubrirlos ! ")
// if(parseInt(numPlayers)>11 || parseInt(numPlayers)
// console.log(parseInt(numPlayers)!=numPlayers)
// console.log(footballPlayers.team.players.posicion[0])


if(parseInt(numPlayers)!=numPlayers){
while((numPlayers!=="arquero" && numPlayers!=="defensor" && numPlayers!=="mediocampista" && numPlayers!=="delantero")){ 
    numPlayers = prompt('La posición tiene que ser arquero, defensor, mediocampista o delantero')}
    
    const positionSelected = footballPlayers.team.players.filter((player) => {
        return player.posicion === numPlayers;
      });     
      
        console.log(`Jugadores con la posición '${numPlayers}' son :`);

        positionSelected.forEach((player) => {
          console.log(`${player.name} ${player.apellido}`);
        });

    const totalAge = positionSelected.reduce((total, player) => {
            return total + player.edad;
          }, 0);
        
          const promPosition = Math.round(totalAge / positionSelected.length);
        
    alert(`Promedio de edad ${promPosition}`)
}
else{ 
    while(parseInt(numPlayers)>11 || parseInt(numPlayers)<1){ numPlayers = prompt('Ingrese un n° ENTRE 1 y 11, o su posición dentro de la cancha')}
    let playerSelected= footballPlayers.team.players[numPlayers-1]
    console.log(`El Jugador elegido es: ${playerSelected.name} ${playerSelected.apellido}`);
    console.log(`Edad: ${playerSelected.edad}`);
    console.log(`Posición: ${playerSelected.posicion}`);}





// let numeroValido= validarLargo(numCaracteres)
// const password=[]

// function validarLargo(numCaracteres){
//     if(numCaracteres>=8 && numCaracteres<=16){
//         return true
//     }else{
//         return false
//     }
// }

// while(!numeroValido) {    
// 	numCaracteres = parseInt( prompt('La contraseña debe tener entre 8 y 16 caracteres, ingresa otro valor.') );
// 	numeroValido = validarLargo(numCaracteres)
// }

// // function randomPass(numCaracteres){
// for(let i=1;i<=numCaracteres;i++){
//     let min = 33;
//     let max = 122;
// const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
// password.push(String.fromCharCode(randomNumber))
// }
// // String.fromCharCode()
// alert("Su contraseña es: "+password.join(""))
// // }




