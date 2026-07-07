import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Employes } from './pages/employes/employes';
import { EmployesFiche } from './components/fiche/employes/employesfiche';
import { EmployeForm } from './components/forms/employe-form/employe-form';
import { Directions } from './pages/directions/directions';
import { DirectionFiche } from './components/fiche/direction/direction-fiche/direction-fiche';
import { DirectionForm } from './components/forms/direction-form/direction-form';


export const routes: Routes = [
    { path: '', component: Home },
    { 
        path: 'admin', 
        component: Admin, 
        children: [
            { path: 'employes', component: Employes },
            { path: 'employes/new', component: EmployeForm },
            { path: 'employes/update/:id', component: EmployeForm },
            { path: 'employes/:id', component: EmployesFiche },
            
            //direction
            { path: 'direction', component: Directions },
            { path: 'direction/new', component: DirectionForm },
            { path: 'direction/update/:id', component: DirectionForm },
            { path: 'direction/:id', component: DirectionFiche },

        ] 

    },
];
