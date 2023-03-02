import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DuenioComponent } from '../duenio/duenio.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PacientesService } from 'src/app/services/pacientes.service';

export interface Paciente {
  idp: number,
  nombrep: string,
  especie: string,
  raza: string,
  fecha_nacimiento: string;
  tipodoc: string,
  doc: string;
  duenio: string,
  ciudad: string,
  direccion: string,
  telefono: string
  fecha_registro: string;
}

var fecha = new Date().toLocaleDateString('es-la', { year: "numeric", month: "numeric", day: "numeric" });


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

  datosPacientes: any;
  duenio = ['Jose P', 'Sara M.', 'Fernanda S.', 'Carlos A.', 'Matias H.'];
  displayedColumns: string[] = ['idp', 'nombrep', 'especie', 'raza', 'fecha_nacimiento', 'tipodoc', 'doc', 'duenio', 'ciudad', 'direccion', 'telefono', 'fecha_registro'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  constructor(public dialog: MatDialog, private pacienteService: PacientesService) {
  }

  ngOnInit(): void {

    this.pacienteService.getPacientes()
    .subscribe(datos => {
      this.datosPacientes = datos;
      this.datosPacientes = new MatTableDataSource(datos);
    })
    
  }

  openDialog(ngModal: any) {
    const dialogRef = this.dialog.open(ngModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosPacientes.filter = filterValue.trim().toLowerCase();

    if (this.datosPacientes.paginator) {
      this.datosPacientes.paginator.firstPage();
    }
  }

  openDialogDuenio() {
    const dialogRef = this.dialog.open(DuenioComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
