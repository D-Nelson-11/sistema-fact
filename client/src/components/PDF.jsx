import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import React from 'react';

function PDF(rows) {
    console.log(rows);

    const doc = new jsPDF();

    autoTable(doc, {
        headStyles: {fillColor: "gray", textColor:"#fff"},
        alternateRowStyles: {fillColor: "#E2E3E7"},
        html: '#tabla',
        didParseCell: (HookData) => {
            if (HookData.column.dataKey==4){
                HookData.cell.text[0]=''
            }
        },
        theme: 'striped',
    
    });

    doc.save('factura.pdf');
}

export default PDF;