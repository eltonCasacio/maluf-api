/*
CLIENTE
*/

let temperatura1 = 0
let temperatura2 = 0
let carga = 0
let velocidade = 0

// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// open connection to a tcp line
client.connectTCP("127.0.0.1", { port: 502 }); //8502
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function() {

    //client.setRegister(0, 5, 1);

    client.readHoldingRegisters(1,4, function(err, data) {
        temperatura1 = data.data[0]
        temperatura2 = data.data[1]
        carga = data.data[2]
        velocidade = data.data[3]

        // console.log("CLIENTE RECEBE TEMPERATURA 01: ", temperatura1);
        // console.log("CLIENTE RECEBE TEMPERATURA 02: ", temperatura2);
        // console.log("CLIENTE RECEBE CARGA: ", carga);
        // console.log("CLIENTE RECEBE VELOCIDADE: ", velocidade);
        // console.log("");
    });
}, 1000);


function getDados(){
    return {
        temperatura1,
        temperatura2,
        carga,
        velocidade
    }
}

module.exports = {getDados}

