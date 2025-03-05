export const PDF_SIZES = {
    A4: {
      width: 210,
      height: 297,
    },
    A3: {
      width: 297,
      height: 420,
    },
    LETTER: {
      width: 215.9,
      height: 279.4,
    },
  };
  
  export const PDF_ORIENTATIONS = {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
  };
  
  export const DEFAULT_PDF_OPTIONS = {
    size: PDF_SIZES.A4,
    orientation: PDF_ORIENTATIONS.PORTRAIT,
    margin: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15,
    },
    filename: 'productos-cluster.pdf',
  };
  
  export const DEFAULT_CONTENT_OPTIONS = {
    showPrices: true,
    showStock: true,
    showCategories: false,
    pageNumbers: true,
    dateGenerated: true,
  };