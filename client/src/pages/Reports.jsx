import React, { useState } from 'react';
// import useScanDetection from 'use-scan-detection-react18';

function BarcodeScanner() {
  const [value, setValue] = useState("");

  // useScanDetection({
  //     onComplete: (barcode) => {
  //         setValue(barcode);
  //         alert(barcode);
  //     },
  //     onError: console.error,
  // });

  return (
    <div>
      <input 
          value={value} 
          type="text"
      />
    </div>
      
  );
}

export default BarcodeScanner;
