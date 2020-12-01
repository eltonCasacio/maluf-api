require("../modbus/modbusServer");
const modbusClient = require("../modbus/modbusClient");
let clpData = {};
let listData = Array(30);

module.exports = () => {
  const initReadCLP = () => {
    setInterval(function () {
      listData.shift();
      clpData = modbusClient.getDados();
      clpData.dateTime = new Date().toLocaleString("pt-br");
      listData.push(clpData);
    }, 500);
  };

  const getData = () => clpData;
  const getListData = () => listData;

  return { initReadCLP, getData, getListData };
};
