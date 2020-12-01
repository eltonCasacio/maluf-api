/*
SERVER
*/

let temperatura1 = 0;
let temperatura2 = 100;
let carga = 200;
let velocidade = 300;

let envia = 0;

const numSorted = (min, max) => {
  return parseInt(Math.random() * (max - min)) + min;
};

const random = setInterval(function () {
  temperatura1 = numSorted(99, 1);
  temperatura2 = numSorted(199, 100);
  carga = numSorted(299, 200);
  velocidade = numSorted(399, 300);
}, 500);

// create an empty modbus client
var ModbusServer = require("modbus-serial");
var vector = {
  getInputRegister: function (addr, unitID) {
    // Synchronous handling
    return addr;
  },
  getHoldingRegister: function (addr, unitID, callback) {
    // Asynchronous handling (with callback)

    //console.log("VARIAVEIS: ", addr, unitID, temperatura1, temperatura2, carga, velocidade);

    switch (addr) {
      case 1:
        envia = temperatura1;
        break;

      case 2:
        envia = temperatura2;
        break;

      case 3:
        envia = carga;
        break;

      case 4:
        envia = velocidade;
        break;

      default:
        console.log("Default");
        break;
    }

    callback(null, envia);

    /*
        if(addr === 1){
            console.log("if = 1");
            callback(null, temperatura1);
        } 
        if(addr === 2){
            callback(null, temperatura2);
        }
        if(addr === 3){
            callback(null, carga);
        }
        if(addr === 4){
            callback(null, velocidade);
        }
        */
  },
  getCoil: function (addr, unitID) {
    // Asynchronous handling (with Promises, async/await supported)
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(addr % 2 === 0);
      }, 10);
    });
  },
  setRegister: function (addr, value, unitID) {
    // Asynchronous handling supported also here
    console.log("set register", addr, value, unitID);
    return;
  },
  setCoil: function (addr, value, unitID) {
    // Asynchronous handling supported also here
    console.log("set coil", addr, value, unitID);
    return;
  },
  readDeviceIdentification: function (addr) {
    return {
      0x00: "MyVendorName",
      0x01: "MyProductCode",
      0x02: "MyMajorMinorRevision",
      0x05: "MyModelName",
      0x97: "MyExtendedObject1",
      0xab: "MyExtendedObject2",
    };
  },
};

// set the server to answer for modbus requests
console.log("ModbusTCP listening on modbus://127.0.0.1:502");
var serverTCP = new ModbusServer.ServerTCP(vector, {
  host: "127.0.0.1",
  port: 502,
  debug: true,
  unitID: 1,
});

serverTCP.on("socketError", function (err) {
  // Handle socket error if needed, can be ignored
  console.error(err);
});
