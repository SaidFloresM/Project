const mongoose = require('mongoose');
const Custodio = require('../models/Custodio');
require('dotenv').config();

const custodios = [
  { numeroEmpleado: "16", nombre: "LEAL RAMIREZ FRANCISCO JAVIER" },
  { numeroEmpleado: "849", nombre: "GONZALEZ ROJANO DANIEL" },
  { numeroEmpleado: "5399", nombre: "MARTINEZ PEREZ FELIX" },
  { numeroEmpleado: "5476", nombre: "SEDANO SEDANO OCTAVIO" },
  { numeroEmpleado: "1936", nombre: "GUTIERREZ OLMOS RAUL" },
  { numeroEmpleado: "5816", nombre: "GARCIA TAPIA JESUS DANTE" },
  { numeroEmpleado: "2574", nombre: "MACHUCHO CRUZ SANTIAGO DAVID" },
  { numeroEmpleado: "5834", nombre: "AGUILAR AVALOS MAURICIO" },
  { numeroEmpleado: "6153", nombre: "VALERIANO SANCHEZ EDUARDO" },
  { numeroEmpleado: "6391", nombre: "ANAYA SILVA ELIAZAR" },
  { numeroEmpleado: "5175", nombre: "MALDONADO CERVANTES GABRIEL" },
  { numeroEmpleado: "1797", nombre: "AYALA HURTADO AGUSTIN" },
  { numeroEmpleado: "6777", nombre: "PADILLA RAMOS JOSE RAFAEL" },
  { numeroEmpleado: "6950", nombre: "BARRERA GONZALEZ LADISLAO" },
  { numeroEmpleado: "7626", nombre: "PEREZ SALAZAR FIDEL" },
  { numeroEmpleado: "7905", nombre: "ARTEAGA QUEZADA EDWIGES" },
  { numeroEmpleado: "7959", nombre: "ORTIZ MEJIA ROBERTO" },
  { numeroEmpleado: "7966", nombre: "VARELA LLAMAS SERGIO IVAN" },
  { numeroEmpleado: "5939", nombre: "CASASOLA IBARRA VICTOR MANUEL" },
  { numeroEmpleado: "8005", nombre: "CAMACHO VILLA MARIO ALBERTO" },
  { numeroEmpleado: "8175", nombre: "BAJONERO MEJIA JAIME ALVARO" },
  { numeroEmpleado: "8295", nombre: "GONZALEZ MANZANO SERGIO" },
  { numeroEmpleado: "8301", nombre: "CARDENAS ESPINOZA MISAEL" },
  { numeroEmpleado: "8324", nombre: "BRAVO GARAY FELIPE DE JESUS" },
  { numeroEmpleado: "8336", nombre: "DICANTE SALAZAR ALAN YASER" },
  { numeroEmpleado: "7686", nombre: "LOPEZ CASTAÑEDA ROSARIO DE JESUS" },
  { numeroEmpleado: "5827", nombre: "LOPEZ MADRIGAL JOSE ALFONSO" },
  { numeroEmpleado: "8193", nombre: "MEJIA LEGASPI OMAR" },
  { numeroEmpleado: "5900", nombre: "VAZQUEZ MORAN ABRAHAM" },
  { numeroEmpleado: "8642", nombre: "VELAZQUEZ CASTILLO FERNANDO" },
  { numeroEmpleado: "7664", nombre: "MARTIN VALDEZ YOSHIO ALEJANDRO" },
  { numeroEmpleado: "8666", nombre: "CASTILLO TEODORO ASAEL" },
  { numeroEmpleado: "8742", nombre: "SEDANO DAVALOS CARLOS ALBERTO" },
  { numeroEmpleado: "6729", nombre: "PEREZ ALDANA BENJAMIN" },
  { numeroEmpleado: "6706", nombre: "SANCHEZ CONTRERAS MARIO" },
  { numeroEmpleado: "8240", nombre: "NAVARRO DOMINGUEZ CARLOS ERNESTO" },
  { numeroEmpleado: "9008", nombre: "PARRA NUÑEZ JOSE DE JESUS" },
  { numeroEmpleado: "7501", nombre: "SANCHEZ SIGALA JOSE MARTIN" },
  { numeroEmpleado: "9013", nombre: "LUNA PEREZ PEDRO" },
  { numeroEmpleado: "9047", nombre: "VAZQUEZ GOMEZ ANTONIO" },
  { numeroEmpleado: "7818", nombre: "SANCHEZ PINTO EFREN" },
  { numeroEmpleado: "9070", nombre: "GUZMAN RAMIREZ ELEUTERIO" },
  { numeroEmpleado: "9075", nombre: "BERNAL GUERRERO CRUZ RAMON" },
  { numeroEmpleado: "7546", nombre: "IGLESIAS MORA IVAN ISRAEL" },
  { numeroEmpleado: "6667", nombre: "VALENZUELA MERAZ FRANCISCO JAVIER" },
  { numeroEmpleado: "9176", nombre: "ARELLANO SALAZAR EFREN" },
  { numeroEmpleado: "9198", nombre: "CORDERO HERRERA JOSE ANTONIO" },
  { numeroEmpleado: "9212", nombre: "GODINEZ FLORES MOISES" },
  { numeroEmpleado: "9213", nombre: "ORTIZ ESPINOZA EDSON DAVID" },
  { numeroEmpleado: "9163", nombre: "CERVANTES GONZALEZ JUAN CARLOS" },
  { numeroEmpleado: "9032", nombre: "HERNANDEZ CAMACHO JOSE ROBERTO CARLOS" },
  { numeroEmpleado: "9219", nombre: "GONZALEZ VILLASEÑOR FERNANDO" },
  { numeroEmpleado: "9221", nombre: "MARTAGON LOPEZ LEYVI JESUS" },
  { numeroEmpleado: "9226", nombre: "SANTOS RIVERA CESAR DAVID" },
  { numeroEmpleado: "6094", nombre: "SAUCEDA VELAZQUEZ JAVIER" }
];

const importarCustodios = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    for (const custodio of custodios) {
      await Custodio.findOneAndUpdate(
        { numeroEmpleado: custodio.numeroEmpleado },
        custodio,
        { upsert: true }
      );
    }

    console.log('Custodios importados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al importar custodios:', error);
    process.exit(1);
  }
};

importarCustodios();