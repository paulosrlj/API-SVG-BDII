const pool = require("./pool");

const getSVG = (request, response) => {

  const municipio = request.params.nome;

  pool.query(
    "SELECT ST_AsSVG(geom), nome, area, estado, codigo FROM municipios WHERE nome ilike $1",
    [municipio],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getViewBox = (request, response) => {
  const municipio = request.params.nome;

  pool.query("SELECT getViewBox($1)", [municipio], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPopulation = (request, response) => {
  const cod_cidade = request.params.cod_city;

  pool.query("SELECT * FROM populacao P WHERE P.cod_municipio = $1 ", [cod_cidade], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = { getSVG, getViewBox, getPopulation };
