import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  duenio = [
    'Jose P',
    'Sara M.',
    'Fernanda S.',
    'Carlos A.',
    'Matias H.'
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(ngModal: any) {
    const dialogRef = this.dialog.open(ngModal);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

}
