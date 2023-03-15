import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DuenioComponent } from '../duenio/duenio.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PacientesService } from 'src/app/services/pacientes.service';
import { DuenioService } from 'src/app/services/duenio.service';
import { FormControl, FormGroup} from '@angular/forms';


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
  paciente: any;
  duenio: any;
  activar: boolean = false;
  displayedColumns: string[] = ['nombrep', 'especie', 'raza', 'fecha_nacimiento', 'tipo_documento', 'documento', 'duenio', 'ciudad', 'direccion', 'telefono', 'fecha_registro'];
  formGroup!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private pacienteService: PacientesService,
    private duenioService: DuenioService
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      idp: new FormControl(),
      nombrep: new FormControl(),
      especie: new FormControl(),
      raza: new FormControl(),
      fecha_nacimiento: new FormControl(),
      ciudad: new FormControl(),
      idd_duenios: new FormControl(),
      fecha_registro: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl()
    });

    this.pacienteService.getPacientes()
      .subscribe(datos => {
        this.datosPacientes = datos;
        this.datosPacientes = new MatTableDataSource(datos);
      });

    this.duenioService.getDuenio()
      .subscribe(datos => {
        this.duenio = datos;
      })
  }

  savePaciente(form: FormGroup) {
    if (this.formGroup.valid) {
      if (this.activar == true) {
        this.updatePaciente(form);
      } else {
        this.pacienteService.addPacientes(form.value)
          .subscribe(datos => {
            alert("Paciente Guardato");
            this.refreshDatos();
          });
      }
    } else {
      alert("Formulario invalido");
    }
  }

  updatePaciente(form: FormGroup) {
    this.pacienteService.updatePacientes(form.value)
      .subscribe(datos => {
        this.onActivar(false);
        this.refreshDatos();
        alert("Se actualizó la información del paciente");
      })
  }

  value(value: any) {
    this.paciente = value;
    //console.log(this.paciente);
  }


  loadPaciente() {
    this.formGroup.setValue({
      idp: this.paciente.idp,
      nombrep: this.paciente.nombrep,
      especie: this.paciente.especie,
      raza: this.paciente.raza,
      fecha_nacimiento: this.paciente.fecha_nacimiento,
      ciudad: this.paciente.ciudad,
      idd_duenios: this.paciente.idd_duenios,
      fecha_registro: this.paciente.fecha_registro,
      direccion: this.paciente.direccion,
      telefono: this.paciente.telefono
    })
  }

  deletePaciente() {
    this.pacienteService.deletePacientes(this.paciente.idp)
      .subscribe(datos => {
        alert("Paciente elininado");
        this.refreshDatos();
      });
  }

  onActivar(act: boolean) {
    this.activar = act;
    console.log('onActivar: ' + this.activar);
  }

  refreshDatos() {
    this.formGroup.reset();
    this.pacienteService.getPacientes()
      .subscribe(datos => {
        this.datosPacientes = datos;
        this.datosPacientes = new MatTableDataSource(datos);
      });
  }

  openDialog(ngModal: any) {
    this.refreshDatos();
    const dialogRef = this.dialog.open(ngModal);
  }

  openDialogUpdate(ngModal: any) {
    const dialogRef = this.dialog.open(ngModal);
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
