import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Disciplina, AlunoService } from './aluno.service';

@Component({
  standalone: true,
  selector: 'app-aluno-disciplinas',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page">
      <a routerLink="/alunos" class="back-link">← Voltar à lista</a>
      <h1>Disciplinas do Aluno</h1>

      <div *ngIf="error" class="alert alert-error">{{ error }}</div>
      <div *ngIf="loading" class="alert alert-info">Carregando disciplinas...</div>

      <table *ngIf="!loading && disciplinas.length" class="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let disciplina of disciplinas">
            <td>{{ disciplina.codigo }}</td>
            <td>{{ disciplina.nome }}</td>
            <td>{{ disciplina.professor }}</td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!loading && !disciplinas.length" class="alert alert-info">
        Nenhuma disciplina encontrada para este aluno.
      </div>
    </section>
  `,
  styles: [
    ".page { max-width: 900px; margin: 2rem auto; padding: 1rem; }",
    ".back-link { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; }",
    ".table { width: 100%; border-collapse: collapse; margin-top: 1rem; }",
    ".table th, .table td { padding: 0.85rem 0.75rem; border-bottom: 1px solid #ddd; text-align: left; }",
    ".alert { padding: 0.9rem 1rem; border-radius: 0.5rem; margin: 1rem 0; }",
    ".alert-error { background: #fee2e2; color: #b91c1c; }",
    ".alert-info { background: #e0f2fe; color: #0369a1; }"
  ]
})
export class AlunoDisciplinasComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private alunoService: AlunoService) {}

  ngOnInit() {
    const ra = this.route.snapshot.paramMap.get('ra');
    if (ra) {
      this.loadDisciplinas(ra);
    }
  }

  loadDisciplinas(ra: string) {
    this.loading = true;
    this.error = '';
    this.alunoService.getDisciplinas(ra).subscribe({
      next: (data) => {
        this.disciplinas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
