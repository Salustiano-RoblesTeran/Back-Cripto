const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar_JWT");

const router = Router();


const {
    PortfolioPost,
    AgregarCripto,
    EliminarCripto
  } = require("../controllers/portafolioCtrl");

  // RUTA POST - CREAMOS UN PORTFOLIO
  router.post("/",
    [
      check("nombre", "El nombre es obligatorio").notEmpty(),
      validarJWT,
    ],
    PortfolioPost
  )

// RUTA POST - AGREGAMOS UNA CRIPTOMONEDA AL PORTFOLIO
router.post("/:idPortfolio/criptomonedas", [
  check("idCripto", "El ID de la criptomoneda es obligatorio").notEmpty(),
  check("precioCpra", "El precio de compra es obligatorio").notEmpty(),
  check("precioVta", "El precio de venta es obligatorio").notEmpty(),
  validarJWT,
], AgregarCripto);



// RUTA DELETE - ELIMINAMOS UNA CRIPTO DEL PORTFOLIO
router.delete("/:idPortfolio/criptomonedas", [
  check("idCripto", "El ID de la criptomoneda es obligatorio").notEmpty(),
  validarJWT,
], EliminarCripto);


  module.exports = router;