const axios = require("axios");
const querystring = require("querystring");

function obtenerDiaSemana() {

  const semana = new Date().toLocaleString("en-US", { weekday: "short" });

  const semanaArray = {
    Mon: "lunes",
    Tue: "martes",
    Wed: "miércoles",
    Thu: "jueves",
    Fri: "viernes",
    Sat: "sábado",
    Sun: "domingo",
  };

  return semanaArray[semana];
}

async function obtenerFraseWikiquote() {

  const diaDeLaSemana = obtenerDiaSemana();

  const titulo = `{{Plantilla:Frase-${diaDeLaSemana}}}`;
  const titleEncoded = querystring.escape(titulo);
  const url = `http://es.wikiquote.org/w/api.php?action=parse&format=json&text=${titleEncoded}`;

  try {

    const response = await axios.get(url);
    const textoHtml = response.data.parse.text["*"];

    console.log(textoHtml);
    // Eliminar etiquetas HTML, espacios innecesarios y saltos de línea
    let textoPlano = textoHtml
      .replace(/<\/?[^>]+(>|$)/g, "") 
      .replace(/&#160;/g, " ") 
      .replace(/\s+/g, " ")
      .trim(); 

    textoPlano = textoPlano.replace("«","").trim()
    let separa = textoPlano.split("»");
    let cita = separa[0]
    let autor = separa[1]

    console.log({cita,autor});

  } catch (error) {
    console.error("Error al obtener la frase:", error.message);
  }
  
}


obtenerFraseWikiquote();
