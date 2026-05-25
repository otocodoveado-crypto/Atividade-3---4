import { Routes } from '@angular/router';
import { AlunoDetalhesComponent } from './aluno-detalhes.component';
import { AlunoDisciplinasComponent } from './aluno-disciplinas.component';
import { AlunoEditarComponent } from './aluno-editar.component';
import { AlunosListComponent } from './alunos-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunosListComponent },
  { path: 'alunos/:ra', component: AlunoDetalhesComponent },
  { path: 'alunos/:ra/disciplinas', component: AlunoDisciplinasComponent },
  { path: 'alunos/:ra/editar', component: AlunoEditarComponent }
];
