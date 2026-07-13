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
import { Gares } from './pages/gares/gares';
import { GareForm } from './components/forms/gare-form/gare-form';
import { GareFiche } from './components/fiche/gare-fiche/gare-fiche';
import { Equipes } from './pages/equipes/equipes';
import { EquipeForm } from './components/forms/equipe-form/equipe-form';
import { EquipeFiche } from './components/fiche/equipe-fiche/equipe-fiche';
import { Teams } from './pages/teams/teams';
import { TeamsForm } from './components/forms/teams-form/teams-form';


export const routes: Routes = [
    { path: '', component: Home },
                //teams
            
    { 
        path: 'admin', 
        component: Admin, 
        children: [
            { path: 'teams', component: Teams },
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

            //Gare
            { path: 'gare', component: Gares },
            { path: 'gare/new', component: GareForm },
            { path: 'gare/update/:id', component: GareForm },
            { path: 'gare/:id', component: GareFiche },
            
            //Equipe
            { path: 'equipe', component: Equipes },
            { path: 'equipe/new', component: EquipeForm },
            { path: 'equipe/update/:id', component: EquipeForm },
            { path: 'equipe/:id', component: EquipeFiche },

            //teams
            { path: 'teams', component: Teams },
            { path: 'teams/update/:id', component: TeamsForm },
            

            

        ] 

    },
];
