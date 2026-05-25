const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const alunos = [
  {
    ra: '1',
    nome: 'João',
    disciplinas: [
      { codigo: 'MAT101', nome: 'Matemática', professor: 'Prof. Carlos' },
      { codigo: 'HIS101', nome: 'História', professor: 'Prof. Ana' },
      { codigo: 'POR101', nome: 'Português', professor: 'Prof. João' },
      { codigo: 'GEO101', nome: 'Geografia', professor: 'Prof. Ana' }
    ]
  },
  {
    ra: '2',
    nome: 'Maria',
    disciplinas: [
      { codigo: 'MAT101', nome: 'Matemática', professor: 'Prof. Carlos' },
      { codigo: 'HIS101', nome: 'História', professor: 'Prof. Ana' },
      { codigo: 'GEO101', nome: 'Geografia', professor: 'Prof. Ana' }
    ]
  },
  {
    ra: '3',
    nome: 'Pedro',
    disciplinas: [
      { codigo: 'CIE101', nome: 'Ciências', professor: 'Prof. João' },
      { codigo: 'HIS101', nome: 'História', professor: 'Prof. Ana' },
      { codigo: 'POR101', nome: 'Português', professor: 'Prof. João' },
      { codigo: 'GEO101', nome: 'Geografia', professor: 'Prof. Ana' },
      { codigo: 'EDF101', nome: 'Educação Física', professor: 'Prof. Carlos' }
    ]
  }
];

app.get('/', (req, res) => {
  res.redirect('/alunos');
});

app.get('/alunos', (req, res) => {
  res.json(alunos);
});

app.get('/alunos/:ra', (req, res) => {
  const aluno = alunos.find(a => a.ra === req.params.ra);
  if (!aluno) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  res.json(aluno);
});

app.get('/alunos/:ra/disciplinas', (req, res) => {
  const aluno = alunos.find(a => a.ra === req.params.ra);
  if (!aluno) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }
  res.json(aluno.disciplinas);
});

app.put('/alunos/:ra', (req, res) => {
  const alunoIndex = alunos.findIndex(a => a.ra === req.params.ra);
  if (alunoIndex === -1) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }

  const { nome, disciplinas } = req.body;
  if (nome) {
    alunos[alunoIndex].nome = nome;
  }
  if (Array.isArray(disciplinas)) {
    alunos[alunoIndex].disciplinas = disciplinas;
  }

  res.json(alunos[alunoIndex]);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
