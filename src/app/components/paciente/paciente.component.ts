import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Paciente {
  id: number,
  name: string,
  especie: string,
  raza: string,
  fnaci: Date;
  duenio: string,
  ciudad: string,
  direccion: string,
  telefono: string
  freg: Date;
}

var fecha = new Date('December 25, 2020');
const ELEMENT_DATA: Paciente[] = [
  { id: 1, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 2, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 3, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 4, name: 'Pepe', especie: 'Perro', raza: 'Caniche', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 5, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 6, name: 'Pepe', especie: 'Perro', raza: 'Boxer', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha },
  { id: 6, name: 'lulu', especie: 'Perro', raza: 'Boxer', fnaci: fecha, duenio: 'Maria', ciudad: 'Pueblo Nuevo', direccion: 'Cr. 12 Cl 15', telefono: '123456', freg: fecha }
];


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  duenio = ['Jose P', 'Sara M.', 'Fernanda S.', 'Carlos A.', 'Matias H.'];
  displayedColumns: string[] = ['id', 'name', 'especie', 'raza', 'fnaci', 'duenio', 'ciudad', 'direccion', 'telefono', 'freg', 'accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
