const { response, request } = require("express");
const Portfolio = require("../models/portfolio");

// Controlador POST - Crear un nuevo portfolio
const PortfolioPost = async (req = request, res = response) => {
  const { idUsuario, nombre } = req.body;

  try {
    // Creamos el nuevo portfolio con un array vacío de criptomonedas
    const nuevoPortfolio = new Portfolio({ idUsuario, nombre, criptomonedas: [] });

    // Guardamos en la base de datos
    await nuevoPortfolio.save();

    res.json({
      nuevoPortfolio,
      mensaje: "Portfolio creado!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear el portfolio",
    });
  }
};

// Controlador POST - Agregar criptomonedas al portfolio
const AgregarCripto = async (req = request, res = response) => {
  const { idPortfolio } = req.params;  // Obtenemos el ID del portfolio desde los parámetros
  const { idCripto, precioCpra, precioVta } = req.body;

  try {
    // Buscar el portfolio por ID
    const portfolio = await Portfolio.findById(idPortfolio);

    if (!portfolio) {
      return res.status(404).json({
        msg: "Portfolio no encontrado",
      });
    }

    // Agregar la criptomoneda al array 'criptomonedas' del portfolio
    portfolio.criptomonedas.push({ idCripto, precioCpra, precioVta });

    // Guardar los cambios en la base de datos
    await portfolio.save();

    res.json({
      portfolio,
      mensaje: "Criptomoneda agregada al portfolio",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al agregar la criptomoneda",
    });
  }
};

const EliminarCripto = async (req = request, res = response) => {
    const { idPortfolio } = req.params;  // Obtenemos el ID del portfolio desde los parámetros
    const { idCripto } = req.body;       // Obtenemos el ID de la criptomoneda a eliminar

    try {
        // Buscar el portfolio por ID
        const portfolio = await Portfolio.findById(idPortfolio);

        if (!portfolio) {
            return res.status(404).json({
              msg: "Portfolio no encontrado",
            });
          }

        // Encontrar la criptomoneda y eliminarla del array
        const criptomonedaIndex = portfolio.criptomonedas.findIndex(cripto => cripto.idCripto === idCripto);
    
        if (criptomonedaIndex === -1) {
            return res.status(404).json({
             msg: "Criptomoneda no encontrada en el portfolio",
        });
    }
        // Eliminar la criptomoneda del array
        portfolio.criptomonedas.splice(criptomonedaIndex, 1);

        // Guardar los cambios en la base de datos
        await portfolio.save();
    
        res.json({
          portfolio,
          mensaje: "Criptomoneda eliminada del portfolio",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Error al eliminar la criptomoneda",
        });
      }
}

module.exports = {
  PortfolioPost,
  AgregarCripto,
  EliminarCripto,
};
