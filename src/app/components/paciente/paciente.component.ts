import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DuenioComponent } from '../duenio/duenio.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Paciente {
  id: number,
  name: string,
  especie: string,
  raza: string,
  fnaci: string;
  tipodoc: string,
  doc: string;
  duenio: string,
  ciudad: string,
  direccion: string,
  telefono: string
  freg: string;
}

var fecha = new Date().toLocaleDateString('es-la', { year: "numeric", month: "numeric", day: "numeric" });
const ELEMENT_DATA: Paciente[] = [
  { id: 1, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 2, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 3, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 4, name: 'Pepe', especie: 'Perro', raza: 'Caniche', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 5, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 6, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 6, name: 'lulu', especie: 'Perro', raza: 'Boxer', fnaci: fecha, tipodoc: 'CC', doc: '234156', duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha }
];


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PacienteComponent implements OnInit {

  duenio = ['Jose P', 'Sara M.', 'Fernanda S.', 'Carlos A.', 'Matias H.'];
  displayedColumns: string[] = ['id', 'name', 'especie', 'raza', 'fnaci', 'tipodoc', 'doc', 'duenio', 'ciudad', 'direccion', 'telefono', 'freg'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSources = new MatTableDataSource(ELEMENT_DATA);



  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(ngModal: any) {
    const dialogRef = this.dialog.open(ngModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();

    if (this.dataSources.paginator) {
      this.dataSources.paginator.firstPage();
    }
  }

  openDialogDuenio() {
    const dialogRef = this.dialog.open(DuenioComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
