import { Injectable, EventEmitter } from '@angular/core';

// Services

// Models
import { Cotizacion, DatosCliente, ItemLista } from '@models/models.index';
import { TipoCliente } from '@enums/tipo-cliente.enum';

// npm modules
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'; 

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {

  public printReady = new EventEmitter<boolean>();

  constructor() { }

  /**
   * @description Imprime una cotización
   * @param cotizacion {Cotizacion} 
   */
  public printCotizacion (cotizacion: any) {

    console.log(cotizacion);
    html2canvas(cotizacion).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png');  
      let pdf = new jsPDF('p', 'mm', 'letter'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf');
      this.printReady.emit(false);
    }); 
  }

  private removeSpace (str: string) {
    return str.replace(' ', '_');
  }

  /**
   * @description Coloca el encabezado del pdf
   * @param cliente {DatosCliente}
   * @param doc {jsPDF}
   */
  private setHeadPDF (cliente: DatosCliente, fecha: string ,  doc: any) {
  }

  /**
   * @description Crea una tabla a partir de un array de Itemlista para imprimirlo en pdf
   * @param lista {Array<ItemLista>}  
   * @param tipo {TipoCliente }
   * @param doc {jsPDF}
   */
  private setTablePDF (lista: Array<ItemLista>, tipo: TipoCliente, doc: any) {
  }
}
