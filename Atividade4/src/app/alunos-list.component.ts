import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Aluno, AlunoService } from './aluno.service';

@Component({
  standalone: true,
  selector: 'app-alunos-list',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page">
      <h1>Lista de Alunos</h1>
      <p class="subtitle">Veja os alunos cadastrados e acesse detalhes ou edição.</p>

      <div *ngIf="error" class="alert alert-error">{{ error }}</div>
      <div *ngIf="loading" class="alert alert-info">Carregando alunos...</div>

      <table *ngIf="!loading && alunos.length" class="table">
        <thead>
          <tr>
            <th>RA</th>
            <th>Nome</th>
            <th>Disciplinas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let aluno of alunos">
            <td>{{ aluno.ra }}</td>
            <td>{{ aluno.nome }}</td>
            <td class="disciplinas-cell">
              <div *ngIf="aluno.disciplinas && aluno.disciplinas.length" class="disciplinas-list">
                <span *ngFor="let disc of aluno.disciplinas; let last = last" class="disciplina-badge">
                  {{ disc.nome }}<span *ngIf="!last">,&nbsp;</span>
                </span>
              </div>
              <span *ngIf="!aluno.disciplinas || aluno.disciplinas.length === 0" class="no-disciplinas">
                Nenhuma disciplina
              </span>
            </td>
            <td class="actions">
              <a [routerLink]="['/alunos', aluno.ra]" class="button small">Detalhes</a>
              <a [routerLink]="['/alunos', aluno.ra, 'editar']" class="button outline small">Editar</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!loading && !alunos.length" class="alert alert-info">
        Nenhum aluno encontrado.
      </div>
    </section>
  `,
  styles: [
    ".page { max-width: 1200px; margin: 2rem auto; padding: 1rem; }",
    ".subtitle { margin-bottom: 1rem; color: #555; }",
    ".table { width: 100%; border-collapse: collapse; margin-top: 1rem; }",
    ".table th, .table td { padding: 0.85rem 0.75rem; border-bottom: 1px solid #ddd; text-align: left; }",
    ".table th { background: #f5f5f5; font-weight: 600; }",
    ".disciplinas-cell { min-width: 250px; }",
    ".disciplinas-list { display: flex; flex-wrap: wrap; gap: 0.25rem; }",
    ".disciplina-badge { background: #e0e7ff; color: #3730a3; padding: 0.25rem 0.6rem; border-radius: 0.25rem; font-size: 0.9rem; }",
    ".no-disciplinas { color: #999; font-style: italic; }",
    ".actions { display: flex; gap: 0.5rem; flex-wrap: wrap; min-width: 200px; }",
    ".button { display: inline-block; padding: 0.5rem 0.9rem; border-radius: 0.45rem; background: #2563eb; color: #fff; text-decoration: none; border: none; cursor: pointer; }",
    ".button.outline { background: transparent; border: 1px solid #2563eb; color: #2563eb; }",
    ".button.small { font-size: 0.9rem; }",
    ".alert { padding: 0.9rem 1rem; border-radius: 0.5rem; margin: 1rem 0; }",
    ".alert-error { background: #fee2e2; color: #b91c1c; }",
    ".alert-info { background: #e0f2fe; color: #0369a1; }"
  ]
})
export class AlunosListComponent implements OnInit {
  alunos: Aluno[] = [];
  loading = false;
  error = '';

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.loadAlunos();
  }

  loadAlunos() {
    this.loading = true;
    this.error = '';
    this.alunoService.getAlunos().subscribe({
      next: (data) => {
        this.alunos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
