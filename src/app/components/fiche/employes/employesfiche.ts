import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { EmployeService } from '../../../services/employe/employe-service';
import { Employe } from '../../../models/employe';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Return } from '../../button/return/return';
import { Employes } from '../../../pages/employes/employes';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [
    CommonModule,
    Return,
    Employes,
    RouterModule,
  ],
  templateUrl: './employesfiche.html',
  styleUrl: './employesfiche.css',
})
export class EmployesFiche implements OnInit {

  employes: Employe[] = [];

  selectedEmploye = signal<Employe | undefined>(undefined);

  constructor(
    private employeService: EmployeService,
    private routeActivated: ActivatedRoute
  ){
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getEmployeById(Number(id));
    }else {
      console.error('No employe ID provided in route parameters.');
    }
  }

  ngOnInit() {
    // Logic to execute on component initialization
  }


  getEmployeById(id?: number) {
    this.employeService.getEmployeById(id).subscribe({
      next: (employe) => this.selectedEmploye.set(employe),
      error: (error) => console.error(error)
    });
  }
}
