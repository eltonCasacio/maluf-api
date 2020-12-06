const pdf = require("html-pdf");
const path = require("path");
let fileDir = "";
let html = "<h1>Sem retorno</h1>";

async function createPDF(dados) {
  if (dados) {
    const dirFile = path.join(__dirname, "..", "file.pdf");
    const titulo = "Relatório";

    html = `
                  <div style="text-align:center;">${titulo}</div>
                  <hr />
                  <div>
                    Período: ${new Date(dados.dateTimeStart).toLocaleString(
                      "pt-br"
                    )} - ${new Date(dados.dateTimeEnd).toLocaleString("pt-br")}
                  </div>
                  <div>
                  <img src=${dados.imageCarga} alt=""/>
                </div>
                  
    `;

    pdf.create(html, {}).toFile(dirFile, (err, res) => {
      if (err) console.log("Ops, ocorreu um erro ao tentar gerar REPORT", err);
      else {
        fileDir = res;
      }
    });
  }
}

module.exports = (app) => {
  const pdf = (req, res) => {
    createPDF(req.body).then(() => res.send(html));
  };

  const get = (req, res) => {
    const { dateTimeStart, dateTimeEnd } = req.params;
    app
      .bancoDados("registros")
      .select("*")
      .whereBetween("updated_at", [dateTimeStart, dateTimeEnd])
      .then((response) => {
        createPDF();
        res.send(response);
      })
      .catch((err) => res.status(500).send(err));
  };

  return { get, pdf };
};
