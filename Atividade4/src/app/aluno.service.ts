import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Disciplina {
  codigo: string;
  nome: string;
  professor: string;
}

export interface Aluno {
  ra: string;
  nome: string;
  disciplinas: Disciplina[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/alunos`).pipe(catchError(this.handleError));
  }

  getAluno(ra: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/alunos/${ra}`).pipe(catchError(this.handleError));
  }

  getDisciplinas(ra: string): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/alunos/${ra}/disciplinas`).pipe(catchError(this.handleError));
  }

  updateAluno(ra: string, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/alunos/${ra}`, aluno).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.error || error.message || 'Erro na comunicação com a API';
    return throwError(() => new Error(message));
  }
}
