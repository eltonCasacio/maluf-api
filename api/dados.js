const { getData, getListData } = require("../services/requestDataCLP")();

module.exports = (app) => {
  const getRealTime = (req, response) => {
    let dados = getData();

    response.send(dados || {});
  };

  const getVectorChart = async (req, response) => {
    let listDados = getListData();

    response.send(listDados);
  };

  return { getRealTime, getVectorChart };
};
