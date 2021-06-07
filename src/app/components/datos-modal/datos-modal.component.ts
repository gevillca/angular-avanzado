import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.models';
import { PdfModalService } from 'src/app/services/pdf-modal.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-datos-modal',
  templateUrl: './datos-modal.component.html',
  styles: ['./datos-modal.component.css'],
})
export class DatosModalComponent implements OnInit {
  @ViewChild('reportePDF') reportePDF: ElementRef;
  public user: User;
  private usuariosTemporal;
  constructor(public pdfModalService: PdfModalService) {}

  ngOnInit(): void {}
  cerrarModalPDF() {
    this.pdfModalService.cerrarModal();
  }
  crearPDF() {
    /* const quotes = this.factura; */
    html2canvas(this.reportePDF.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      /* const imgWidth = 66;
      const pageHeight = 80; */
      /* const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight; */
      const doc = new jsPDF('p', 'mm', [66, 90], true);
      const position = 1;
      doc.addImage(imgData, 'PNG', 0, position, 66, 80);
      doc.save('reporte_medico.pdf');
    });
  }
}
