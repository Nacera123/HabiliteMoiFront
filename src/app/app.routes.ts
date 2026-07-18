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
import { TypeHabilitations } from './pages/type-habilitations/type-habilitations';
import { TypeHabilitationForm } from './components/forms/type-habilitation-form/type-habilitation-form';
import { Lienhabilitations } from './pages/lienhabilitations/lienhabilitations';
import { LienHabilitationForm } from './components/forms/lien-habilitation-form/lien-habilitation-form';
import { LienHabilitationFiche } from './components/fiche/lien-habilitation-fiche/lien-habilitation-fiche';
import { LienDirection } from './pages/lien-direction/lien-direction';
import { LienDirectionForm } from './components/forms/lien-direction-form/lien-direction-form';
import { LienDirectionFiche } from './components/fiche/lien-direction-fiche/lien-direction-fiche';
import { LienPole } from './pages/lien-pole/lien-pole';
import { LienPoleForm } from './components/forms/lien-pole-form/lien-pole-form';
import { LienPoleFiche } from './components/fiche/lien-pole-fiche/lien-pole-fiche';
import { LienPosteDirection } from './pages/lien-poste-direction/lien-poste-direction';
import { LienPosteDirectionForm } from './components/forms/lien-poste-direction-form/lien-poste-direction-form';
import { LienPosteDirectionFiche } from './components/fiche/lien-poste-direction-fiche/lien-poste-direction-fiche';
import { LienPostePole } from './pages/lien-poste-pole/lien-poste-pole';
import { LienPostePoleForm } from './components/forms/lien-poste-pole-form/lien-poste-pole-form';
import { LienPostePoleFiche } from './components/fiche/lien-poste-pole-fiche/lien-poste-pole-fiche';
import { LienDetailPole } from './pages/lien-detail-pole/lien-detail-pole';



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

            //Type d'habilitation
            { path: 'type-habilitation', component: TypeHabilitations },
            { path: 'type-habilitation/new', component: TypeHabilitationForm },
            { path: 'type-habilitation/update/:id', component: TypeHabilitationForm },
            { path: 'type-habilitation/:id', component: EquipeFiche },


            //Liens d'habilitation
            { path: 'liens-habilitation', component: Lienhabilitations },
            { path: 'liens-habilitation/new', component: LienHabilitationForm },
            { path: 'liens-habilitation/update/:id', component: LienHabilitationForm },
            { path: 'liens-habilitation/:id', component: LienHabilitationFiche },


            //Liens d'habilitation direction
            { path: 'liens-habilitation-direction/:id', component: LienDirection },
            // { path: 'liens-habilitation-direction/new', component: LienDirectionForm },
            // { path: 'liens-habilitation-direction/update/:id', component: LienDirectionForm },
            // { path: 'liens-habilitation-direction/:id', component: LienDirectionFiche },

            //Liens d'habilitation pole
            { path: 'liens-habilitation-pole', component: LienPole },
            { path: 'liens-habilitation-pole/new', component: LienPoleForm },
            { path: 'liens-habilitation-pole/update/:id', component: LienPoleForm },
            { path: 'liens-habilitation-pole/:id', component: LienPoleFiche },

            //Liens d'habilitation pole
            { path: 'liens-habilitation-detail-pole', component: LienDetailPole },
            // { path: 'liens-habilitation-detail-pole/new', component: LienPoleForm },
            // { path: 'liens-habilitation-detail-pole/update/:id', component: LienPoleForm },
            // { path: 'liens-habilitation-detail-pole/:id', component: LienPoleFiche },


            //Liens d'habilitation poste direction
            { path: 'liens-habilitation-poste-direction', component: LienPosteDirection },
            { path: 'liens-habilitation-poste-direction/new', component: LienPosteDirectionForm },
            { path: 'liens-habilitation-poste-direction/update/:id', component: LienPosteDirectionForm },
            { path: 'liens-habilitation-poste-direction/:id', component: LienPosteDirectionFiche },

            //Liens d'habilitation poste pole
            { path: 'liens-habilitation-poste-pole', component: LienPostePole },
            { path: 'liens-habilitation-poste-pole/new', component: LienPostePoleForm },
            { path: 'liens-habilitation-poste-pole/update/:id', component: LienPostePoleForm },
            { path: 'liens-habilitation-poste-pole/:id', component: LienPostePoleFiche },

            //teams
            { path: 'teams', component: Teams },
            { path: 'teams/update/:id', component: TeamsForm },
            

            

        ] 

    },
];
