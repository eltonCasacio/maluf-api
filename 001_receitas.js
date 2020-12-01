exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("receitas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("receitas").insert([
        {
          nome: "Receita 1",
          temperatura1: 100,
          temperatura1Max: 110,
          temperatura1Min: 90,
          temperatura2: 100,
          temperatura2Max: 110,
          temperatura2Min: 90,
          velocidade: 100,
          velocidadeMax: 110,
          velocidadeMin: 90,
          carga: 100,
          cargaMax: 110,
          cargaMin: 90,
        },
        {
          nome: "Receita 2",
          temperatura1: 100,
          temperatura1Max: 110,
          temperatura1Min: 90,
          temperatura2: 100,
          temperatura2Max: 110,
          temperatura2Min: 90,
          velocidade: 100,
          velocidadeMax: 110,
          velocidadeMin: 90,
          carga: 100,
          cargaMax: 110,
          cargaMin: 90,
        },
      ]);
    });
};