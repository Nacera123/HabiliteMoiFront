import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Employes } from './pages/employes/employes';
import { EmployesFiche } from './components/fiche/employes/employesfiche';
import { EmployeForm } from './components/forms/employe-form/employe-form';
import { Directions } from './pages/directions/directions';
import { DirectionFiche } from './components/fiche/direction/direction-fiche/direction-fiche';
import { DirectionForm } from './components/forms/direction-form/direction-form';
import { Poles } from './pages/poles/poles';
import { PoleFiche } from './components/fiche/pole-fiche/pole-fiche';
import { PoleForm } from './components/forms/pole-form/pole-form';
import { Postes } from './pages/postes/postes';
import { PosteFiche } from './components/fiche/poste-fiche/poste-fiche';
import { PosteForm } from './components/forms/poste-form/poste-form';


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

            //pole
            { path: 'pole', component: Poles },
            { path: 'pole/new', component: PoleForm },
            { path: 'pole/update/:id', component: PoleForm },
            { path: 'pole/:id', component: PoleFiche },

            //poste
            { path: 'poste', component: Postes },
            { path: 'poste/new', component: PosteForm },
            { path: 'poste/update/:id', component: PosteForm },
            { path: 'poste/:id', component: PosteFiche },

        ] 

    },
];
