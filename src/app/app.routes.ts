import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Employes } from './pages/employes/employes';
import { EmployesFiche } from './components/fiche/employes/employesfiche';
import { EmployeForm } from './components/forms/employe-form/employe-form';


export const routes: Routes = [
    { path: '', component: Home },
    { 
        path: 'admin', 
        component: Admin, 
        children: [
            { path: 'employes', component: Employes },
            { path: 'employes/new', component: EmployeForm },
            { path: 'employes/:id', component: EmployesFiche },

        ] 

    },
];
