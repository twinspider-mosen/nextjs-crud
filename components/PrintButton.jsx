'use client';  // Ensures this code is run on the client-side

import { useRef, useEffect } from 'react';
import { Button } from './ui/button';  // Assuming you have a custom Button component

const PrintButton = () => {
  // Create a ref to refer to the content you want to print
  const printContentRef = useRef();

  // Make sure the electron API is available
  const handlePrint = () => {
    if (typeof window !== 'undefined' && window.electron) {
      // If Electron API is available, send a print command to the main process
      window.electron.sendPrintCommand();
    } else {
      // If we're not in an Electron environment, fallback to the window.print() method
      const printWindow = window.open('', '', 'height=600,width=800');
      const content = printContentRef.current;
      
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(content.innerHTML);  // Copy the HTML content to the print window
      printWindow.document.write('</body></html>');
      
      printWindow.document.close();
      printWindow.print();  // Open the print dialog
    }
  };

  return (
    <div>
      <div ref={printContentRef}>
        {/* This is the content that will be printed */}
        <h1>Document Content</h1>
        <p>This is the content that will be printed when the button is clicked.</p>
      </div>

      {/* Button to trigger printing */}
      <Button id="print" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
};

export default PrintButton;
