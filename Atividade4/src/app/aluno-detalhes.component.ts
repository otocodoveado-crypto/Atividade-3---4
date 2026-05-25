import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Aluno, AlunoService } from './aluno.service';

@Component({
  standalone: true,
  selector: 'app-aluno-detalhes',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page">
      <a routerLink="/alunos" class="back-link">← Voltar à lista</a>
      <h1>Detalhes do Aluno</h1>

      <div *ngIf="error" class="alert alert-error">{{ error }}</div>
      <div *ngIf="loading" class="alert alert-info">Carregando dados do aluno...</div>

      <div *ngIf="aluno" class="card">
        <p><strong>RA:</strong> {{ aluno.ra }}</p>
        <p><strong>Nome:</strong> {{ aluno.nome }}</p>
        <p><strong>Quantidade de disciplinas:</strong> {{ aluno.disciplinas.length }}</p>

        <h2>Disciplinas</h2>
        <ul>
          <li *ngFor="let disciplina of aluno.disciplinas">
            {{ disciplina.codigo }} - {{ disciplina.nome }}
          </li>
        </ul>

        <div class="buttons">
          <a [routerLink]="['/alunos', aluno.ra, 'disciplinas']" class="button">Ver disciplinas</a>
          <a [routerLink]="['/alunos', aluno.ra, 'editar']" class="button outline">Editar</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    ".page { max-width: 760px; margin: 2rem auto; padding: 1rem; }",
    ".back-link { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; }",
    ".card { padding: 1.4rem; border: 1px solid #ddd; border-radius: 0.75rem; background: #fff; }",
    ".card p { margin: 0.75rem 0; }",
    ".buttons { margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }",
    ".button { display: inline-block; padding: 0.55rem 0.95rem; border-radius: 0.5rem; background: #2563eb; color: #fff; text-decoration: none; }",
    ".button.outline { background: transparent; border: 1px solid #2563eb; color: #2563eb; }",
    ".alert { padding: 0.9rem 1rem; border-radius: 0.5rem; margin: 1rem 0; }",
    ".alert-error { background: #fee2e2; color: #b91c1c; }",
    ".alert-info { background: #e0f2fe; color: #0369a1; }"
  ]
})
export class AlunoDetalhesComponent implements OnInit {
  aluno: Aluno | null = null;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private alunoService: AlunoService) {}

  ngOnInit() {
    const ra = this.route.snapshot.paramMap.get('ra');
    if (ra) {
      this.loadAluno(ra);
    }
  }

  loadAluno(ra: string) {
    this.loading = true;
    this.error = '';
    this.alunoService.getAluno(ra).subscribe({
      next: (data) => {
        this.aluno = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
