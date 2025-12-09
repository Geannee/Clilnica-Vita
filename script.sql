-- ============================================================
-- BANCO DE DADOS PRINCIPAL
-- ============================================================

CREATE DATABASE IF NOT EXISTS clinica_chatbot;
USE clinica_chatbot;


-- ============================================================
-- TABELA: pacientes
-- Armazena informações básicas do paciente
-- ============================================================

CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email varchar (100),
  telefone VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- TABELA: conversas
-- Armazena cada mensagem recebida/enviada pelo chatbot
-- Para criar histórico e melhorar IA no futuro
-- ============================================================

CREATE TABLE conversas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  mensagem VARCHAR(500),
  resposta VARCHAR(500),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);


-- ============================================================
-- TABELA: atendimentos_fluxo
-- Guarda o estado do fluxo do chatbot
-- (nome, motivo, tratamento, horário etc.)
-- ============================================================

CREATE TABLE atendimentos_fluxo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,

  nome VARCHAR(100),
  motivo VARCHAR(200),
  tratamento VARCHAR(100),
  periodo VARCHAR(20),
  horario VARCHAR(10),

  status VARCHAR(20) DEFAULT 'em_andamento',
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);


-- ============================================================
-- TABELA: agendamentos
-- Guarda o agendamento final criado pelo chatbot
-- ============================================================

CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  tratamento VARCHAR(100),
  periodo VARCHAR(20),
  horario VARCHAR(10),
  tipo_consulta ENUM('avaliacao', 'consulta', 'retorno', 'urgencia'),
  queixa TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);




SHOW DATABASES;



select * from pacientes;
select * from agendamentos;

