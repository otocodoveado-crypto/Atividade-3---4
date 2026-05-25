import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno, AlunoService, Disciplina } from './aluno.service';

@Component({
  standalone: true,
  selector: 'app-aluno-editar',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page">
      <a routerLink="/alunos" class="back-link">← Voltar à lista</a>
      <h1>Editar Aluno</h1>

      <div *ngIf="error" class="alert alert-error">{{ error }}</div>
      <div *ngIf="success" class="alert alert-success">{{ success }}</div>
      <div *ngIf="loading" class="alert alert-info">Carregando informações...</div>

      <form *ngIf="aluno" (ngSubmit)="save()" class="form">
        <label>
          Nome
          <input type="text" [(ngModel)]="aluno.nome" name="nome" required />
        </label>

        <div class="disciplinas-block">
          <h2>Disciplinas</h2>
          <div *ngFor="let disciplina of aluno.disciplinas; let i = index" class="disciplina-row">
            <input type="text" [(ngModel)]="disciplina.codigo" name="codigo{{ i }}" placeholder="Código" required />
            <input type="text" [(ngModel)]="disciplina.nome" name="nome{{ i }}" placeholder="Nome" required />
            <input type="text" [(ngModel)]="disciplina.professor" name="professor{{ i }}" placeholder="Professor" required />
            <button type="button" class="button small danger" (click)="removeDisciplina(i)">Remover</button>
          </div>
          <button type="button" class="button outline" (click)="addDisciplina()">Adicionar disciplina</button>
        </div>

        <div class="form-actions">
          <button type="submit" class="button">Salvar</button>
          <a [routerLink]="['/alunos', aluno.ra]" class="button outline">Cancelar</a>
        </div>
      </form>
    </section>
  `,
  styles: [
    ".page { max-width: 820px; margin: 2rem auto; padding: 1rem; }",
    ".back-link { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; }",
    ".form { display: grid; gap: 1rem; }",
    "label { display: grid; gap: 0.5rem; font-weight: 600; }",
    "input { width: 100%; padding: 0.75rem 0.85rem; border-radius: 0.5rem; border: 1px solid #ccd6dd; }",
    ".disciplinas-block { padding: 1rem; border-radius: 0.75rem; border: 1px solid #ddd; background: #fafafa; }",
    ".disciplina-row { display: grid; gap: 0.75rem; margin-bottom: 1rem; }",
    "@media (min-width: 720px) { .disciplina-row { grid-template-columns: 1fr 1fr 1fr auto; align-items: flex-end; } }",
    ".button { display: inline-block; padding: 0.65rem 1rem; border-radius: 0.5rem; background: #2563eb; color: #fff; border: none; text-decoration: none; cursor: pointer; }",
    ".button.outline { background: transparent; border: 1px solid #2563eb; color: #2563eb; }",
    ".button.small { padding: 0.45rem 0.75rem; font-size: 0.9rem; }",
    ".button.danger { background: #dc2626; }",
    ".form-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; }",
    ".alert { padding: 0.9rem 1rem; border-radius: 0.5rem; margin: 1rem 0; }",
    ".alert-error { background: #fee2e2; color: #b91c1c; }",
    ".alert-success { background: #dcfce7; color: #166534; }",
    ".alert-info { background: #e0f2fe; color: #0369a1; }"
  ]
})
export class AlunoEditarComponent implements OnInit {
  aluno: Aluno | null = null;
  loading = false;
  error = '';
  success = '';

  constructor(private route: ActivatedRoute, private alunoService: AlunoService, private router: Router) {}

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
        this.aluno = { ...data, disciplinas: data.disciplinas.map(d => ({ ...d })) };
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  addDisciplina() {
    this.aluno?.disciplinas.push({ codigo: '', nome: '', professor: '' });
  }

  removeDisciplina(index: number) {
    this.aluno?.disciplinas.splice(index, 1);
  }

  save() {
    if (!this.aluno) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.success = '';

    this.alunoService.updateAluno(this.aluno.ra, this.aluno).subscribe({
      next: () => {
        this.success = 'Dados atualizados com sucesso!';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
