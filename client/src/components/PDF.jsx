import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "../api/axios";

async function PDF(rows, values, cliente) {
  let parametros = [];

  // Obtener los parámetros de forma asíncrona
  try {
    const resp = await axios.get("/GetParametros");
    parametros = resp.data;
  } catch (error) {
    console.log(error);
  }

  const doc = new jsPDF();
  let totalPagesExp = "{total_pages_count_string}";

  // Información de la empresa
  const empresaInfo = {
    nombre: parametros[0]?.Valor || "Nombre de la Empresa", // Aseguramos que el valor exista
    direccion: "Dirección de la Empresa",
    telefono: "Teléfono: 123-456-7890",
    cai: "CAI: XXXXXXXXXXXXX",
  };

  // Datos del cliente (se pasan como argumento)
  const clienteInfo = {
    nombre: "Nombre del Cliente",
    direccion: "Dirección del Cliente",
    telefono: "Teléfono del Cliente",
  };

  // Fecha actual
  const fechaActual = new Date().toLocaleDateString();

  // Texto que se dibuja en la parte superior de la página
  doc.setFontSize(18);

  // Encabezado de la empresa
  if (parametros.length > 0) {
    let texto = empresaInfo.nombre;
    let textoWidth = doc.getTextWidth(texto);
    let paginaWidth = doc.internal.pageSize.width;
    let x = (paginaWidth - textoWidth) / 2;
    doc.text(texto, x, 15); // El texto en la posición Y=15
  }

  // Ajustar el grosor de las líneas
  doc.setLineWidth(0.8); // Grosor de línea de 0.5mm

  // Establecer color de la línea (gris oscuro)
  doc.setDrawColor(15, 36, 139); // Color RGB (100, 100, 100)

  // Dibujar separador después del nombre de la empresa
  doc.line(15, 20, doc.internal.pageSize.width - 15, 20); // Línea horizontal

  // Información de la empresa (dirección, teléfono, CAI)
  doc.setFontSize(10);
  doc.text(empresaInfo.direccion, 15, 25);
  doc.text(empresaInfo.telefono, 15, 30);
  doc.text(empresaInfo.cai, 15, 35);

  // Datos del cliente
  doc.text("Datos del Cliente:", 15, 45);
  doc.text(`Nombre: `, 15, 50);
  doc.text(`Dirección: `, 15, 55);
  doc.text(`Teléfono:`, 15, 60);

  const startY = 75; // El contenido principal empieza más abajo después de los datos

  // Generar la tabla
  autoTable(doc, {
    html: "#tabla",
    didParseCell: (HookData) => {
      if (HookData.column.dataKey == 4) {
        HookData.cell.text[0] = "";
      }
    },
    theme: "striped",
    startY: startY, // Empieza la tabla justo después del contenido previo
  });

  let currentPageNum = doc.internal.getCurrentPageInfo().pageNumber;

  // Footer
  var str = "Pagina " + currentPageNum;
  if (typeof doc.putTotalPages === "function") {
    str = str + " de " + totalPagesExp + `                                                                             Fecha de emisión: ${fechaActual} `;
  }

  doc.setFontSize(8);
  doc.setTextColor(40);

  var pageSize = doc.internal.pageSize;
  var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

  doc.text(str, 14, pageHeight - 10);

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  // Guardar el PDF
  doc.save("factura.pdf");
}

export default PDF;
