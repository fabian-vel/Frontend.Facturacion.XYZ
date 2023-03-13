import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DuenioService } from 'src/app/services/duenio.service';


export interface Duenio {
  id: number,
  tipodoc: string,
  doc: string;
  duenio: string,
}

@Component({
  selector: 'app-duenio',
  templateUrl: './duenio.component.html',
  styleUrls: ['./duenio.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DuenioComponent implements OnInit {

  displayedColumns: string[] = ['idd', 'tipo_documento', 'documento', 'duenio'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  datosDuenios: any;


  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DuenioComponent>, private duenioService: DuenioService){ }

  ngOnInit(): void {

    this.duenioService.getDuenio()
    .subscribe(datos =>{
      this.datosDuenios = new MatTableDataSource(datos);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DuenioComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
