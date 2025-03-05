// src/utils/pdf/pdfGenerator.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DEFAULT_PDF_OPTIONS } from './pdfStyles';

export interface PDFGeneratorOptions {
  filename?: string;
  size?: { width: number; height: number };
  orientation?: 'portrait' | 'landscape';
  margin?: { top: number; right: number; bottom: number; left: number };
}

/**
 * Generates a PDF from an HTML element
 * @param element The HTML element to convert to PDF
 * @param options PDF generation options
 * @returns Promise that resolves when the PDF is generated and downloaded
 */
export const generatePDF = async (
  element: HTMLElement,
  options: PDFGeneratorOptions = {}
): Promise<void> => {
  try {
    // Merge default options with provided options
    const mergedOptions = {
      ...DEFAULT_PDF_OPTIONS,
      ...options,
      margin: { ...DEFAULT_PDF_OPTIONS.margin, ...options.margin },
    };

    // Get element dimensions
    const { width: elementWidth, height: elementHeight } = element.getBoundingClientRect();

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading of cross-origin images
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    // Create PDF document with proper orientation
    const orientation = mergedOptions.orientation === 'landscape' ? 'l' : 'p';
    const pdf = new jsPDF(orientation, 'mm', [mergedOptions.size.width, mergedOptions.size.height]);

    // Calculate available space in PDF (accounting for margins)
    const pdfWidth = mergedOptions.size.width - mergedOptions.margin.left - mergedOptions.margin.right;
    const pdfHeight = mergedOptions.size.height - mergedOptions.margin.top - mergedOptions.margin.bottom;

    // Calculate image size to fit into PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // If the image height exceeds the PDF height, we need multiple pages
    const pageCount = Math.ceil(imgHeight / pdfHeight);

    // Add image to PDF, potentially across multiple pages
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      // Calculate the portion of the image to show on this page
      const sourceY = i * canvas.height / pageCount;
      const sourceHeight = canvas.height / pageCount;

      // Add image with clipping to show just the relevant portion
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        mergedOptions.margin.left,
        mergedOptions.margin.top,
        imgWidth,
        imgHeight,
        '',
        'FAST',
        0,
        -i * pdfHeight // Shift image up to show next portion
      );
    }

    // Download PDF
    pdf.save(mergedOptions.filename);

    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Promise.reject(error);
  }
};

/**
 * Creates a blob URL for PDF preview
 * @param element The HTML element to convert to PDF
 * @param options PDF generation options
 * @returns Promise that resolves with the blob URL
 */
export const createPDFPreview = async (
  element: HTMLElement,
  options: PDFGeneratorOptions = {}
): Promise<string> => {
  try {
    // Merge default options with provided options
    const mergedOptions = {
      ...DEFAULT_PDF_OPTIONS,
      ...options,
      margin: { ...DEFAULT_PDF_OPTIONS.margin, ...options.margin },
    };

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow loading of cross-origin images
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    // Create PDF with proper orientation
    const orientation = mergedOptions.orientation === 'landscape' ? 'l' : 'p';
    const pdf = new jsPDF(orientation, 'mm', [mergedOptions.size.width, mergedOptions.size.height]);

    // Calculate image dimensions
    const pdfWidth = mergedOptions.size.width - mergedOptions.margin.left - mergedOptions.margin.right;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to first page
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      mergedOptions.margin.left,
      mergedOptions.margin.top,
      imgWidth,
      imgHeight
    );

    // Generate blob URL
    const blobUrl = URL.createObjectURL(pdf.output('blob'));
    
    return Promise.resolve(blobUrl);
  } catch (error) {
    console.error('Error creating PDF preview:', error);
    return Promise.reject(error);
  }
};