import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "../api/axios";

async function PDF(rows,values,total,metodoPago) {
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
    nombre: parametros[0]?.Valor, // Aseguramos que el valor exista
    direccion: parametros[3]?.Valor,
    cai: `CAI: ${parametros[2]?.Valor}`,
    telefono: "Teléfono: 123-456-7890",
  };

  // Información del cliente
  const clienteInfo = {
    nombre:  values.NombreCliente || "Consumidor Final",
    Rtn: values.Rtn || "N/D",
  };

  // Fecha actual
  const fechaActual = new Date().toLocaleDateString();

  // Establecer colores y fuente del documento
  doc.setFont("helvetica", "bold");

  // Añadir espacio para una imagen (logotipo) en la esquina superior derecha
  const imgWidth = 40; // Ancho de la imagen
  const imgHeight = 20; // Alto de la imagen
  doc.rect(doc.internal.pageSize.width - 50, 5, imgWidth, imgHeight); // Rectángulo de espacio para la imagen

  // Si tienes una imagen, la puedes agregar así (usando base64):
  // doc.addImage(imgData, 'JPEG', doc.internal.pageSize.width - 50, 5, imgWidth, imgHeight);

  // Encabezado de la empresa (más pequeño)
  doc.setFontSize(16); // Tamaño de fuente reducido
  let paginaWidth = doc.internal.pageSize.width;
  doc.text("FACTURA", 15, 15); // Posicionamos el texto centrado, más cerca del borde superior
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0); // Negro
  doc.text("Factura N°", 15, 20);
  doc.text(`Fecha:`, 15, 25);
  doc.setFont("helvetica", "normal");
  doc.text(`${fechaActual}`, 25, 25);


  // Información del cliente
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Datos del Cliente:", 15, 40);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${clienteInfo.nombre}`, 15, 45);
  doc.text(`Rtn: ${clienteInfo.Rtn}`, 15, 50);

  // Mantener el mismo formato de tabla que tenías
  const startY = 65;
  let finalY; // Variable para obtener dónde finaliza la tabla

  autoTable(doc, {
    html: "#tabla",
    didParseCell: (HookData) => {
      // Ocultar el texto de la columna 4
      if (HookData.column.dataKey === 4) {
        HookData.cell.text[0] = "";
      }
    },
    theme: "striped",
    startY: startY, // Empieza la tabla justo después del contenido previo
    headStyles: {
      fillColor: [0, 0, 0], // Negro (RGB: 0, 0, 0)
      textColor: [255, 255, 255], // Texto blanco (opcional para mejor visibilidad)
    },
    bodyStyles:{
      textColor:[0,0,0]
    }
  });
  // Añadir contenido adicional después de la tabla
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("¡Gracias por su compra! ", 15, 215); // Añadir texto 10 unidades debajo del final de la tabla
    doc.setLineWidth(0.5); // Opcional: Establecer el grosor de la línea
    doc.line(15, 220, doc.internal.pageSize.width - 15, 220);


    //Informacion de pago
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Negro
    doc.text('Información de Pago', 15, 230);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text('Metodo de Pago:', 15, 235);
    doc.setFont("helvetica", "normal");
    doc.text(metodoPago,38, 235);
    doc.setFont("helvetica", "bold");
    doc.text(`total pagado:`, 15, 240);
    doc.setFont("helvetica", "normal");
    doc.text(`${total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} lps`, 33, 240);




     //Informacion de Empresa (CONTACTO)
     doc.setFont("helvetica", "bold");
     doc.setFontSize(10);
     doc.setTextColor(0, 0, 0); // Negro
     doc.text('Contacto', 150, 230);
 
     doc.setFont("helvetica", "normal");
     doc.setFontSize(8);
     doc.text(empresaInfo.nombre, 150, 235);
     doc.text(empresaInfo.direccion, 150, 240);
     doc.text(empresaInfo.cai, 150, 245);
 

  let currentPageNum = doc.internal.getCurrentPageInfo().pageNumber;
  let str = "Pagina " + currentPageNum;
  if (typeof doc.putTotalPages === "function") {
    str += " de " + totalPagesExp;
  }

  // Información del footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128); // Gris
  let pageHeight = doc.internal.pageSize.height;
  doc.text(str, 15, pageHeight - 10);
  doc.text(
    `Fecha de emisión: ${fechaActual}`,
    paginaWidth - 70,
    pageHeight - 10
  );

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  // Guardar el PDF
  // // doc.save("factura_estilizada_con_logo.pdf");
  // doc.autoPrint();
  // window.open(doc.output("bloburl","_blank"))
  const pdfUrl = doc.output("bloburl");
  window.open(pdfUrl);
  
}

export default PDF;
