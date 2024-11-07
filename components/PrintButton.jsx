'use client'

import { useRef } from 'react';
import { Button } from './ui/button';

const PrintButton = () => {
  // Create a ref to refer to the content you want to print
  const printContentRef = useRef();

  const handlePrint = () => {
    // Open a new window for printing
    const printWindow = window.open('', '', 'height=600,width=800');

    // Get the content to print from the ref
    const content = printContentRef.current;

    // Set the content in the new window
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(content.innerHTML);  // Copy the HTML content to the print window
    printWindow.document.write('</body></html>');

    // Close the document and trigger print
    printWindow.document.close();
    printWindow.print(); // Open the print dialog
  };

  return (
    <div>
      <div ref={printContentRef}>
        {/* This is the content that will be printed */}
        <h1>Document Content</h1>
        <p>This is the content that will be printed when the button is clicked.</p>
      </div>

      {/* Button to trigger printing */}
      <Button onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default PrintButton;
