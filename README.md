# 🦷 Sistema de Secretaria Virtual - Clínica Odontológica

Sistema completo de gerenciamento para clínicas odontológicas com interface web moderna e responsiva. Permite agendamento de consultas, cadastro de pacientes, gestão de agenda do profissional e sistema de avaliações com classificação por estrelas.

## 📋 Funcionalidades

### 👥 Área do Paciente
- **Landing Page** - Página de boas-vindas com design moderno e background personalizado
- **Agendamento Online** - Sistema inteligente que verifica disponibilidade do doutor em tempo real
- **Cadastro de Pacientes** - Registro completo com dados pessoais e queixa principal
- **Sistema de Busca** - Busca inteligente com ícone de lupa para encontrar funcionalidades (Avaliar, Agendar, Cadastrar)
- **Avaliações com Estrelas** - Sistema de feedback com escala visual de 1-5 estrelas interativas
- **Visualização de Reviews** - Cards dinâmicos com avaliações de outros pacientes

### 👨‍⚕️ Área Administrativa
- **Login Seguro** - Autenticação com expiração automática de sessão (2 horas)
- **Dashboard de Agendamentos** - Visualização completa de todas as consultas agendadas
- **Gestão de Consultas** - Confirmar, alterar ou excluir agendamentos
- **Organizar Agenda** - Definir horários de atendimento e períodos de ausência do profissional
- **Alertas de Conflito** - Notificação automática quando há agendamentos em períodos de ausência
- **Filtros por Status** - Consultas pendentes, confirmadas, canceladas ou paciente ausente

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** v22.20.0
- **Express.js** 5.2.1
- **MySQL** 8.0+ (via mysql2 3.15.3)
- Arquitetura **MVC** (Model-View-Controller)

### Frontend
- **HTML5** / **CSS3** / **JavaScript** (Vanilla)
- Design **Mobile-First** (max-width: 390px)
- **LocalStorage** para gerenciamento de sessão e dados temporários
- Interface responsiva com paleta de cores personalizada

## 🎨 Design System

### Paleta de Cores
- **Background Principal:** `#B8E6E1` (verde-água claro)
- **Primary (Botões):** `#48C9B0` (verde-turquesa)
- **Secondary:** `#5DADE2` (azul claro)
- **Accent (Search):** `#7AEADD` (verde-água brilhante)
- **Stars:** `#FFD700` (dourado)
- **Alert:** `#FF6B6B` (vermelho)

### Tipografia e Elementos
- **Fonte:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Títulos:** Fonte itálica, peso 300-400
- **Inputs:** Border-radius 50px (estilo pílula)
- **Cards:** Sombra suave, bordas arredondadas 20px

## 📦 Estrutura do Projeto

```
chatbot-secretaria-virtual/
├── controllers/                    # Lógica de controle das requisições
│   ├── pacientesController.js     # CRUD de pacientes
│   ├── agendamentosController.js  # Gerenciamento de consultas
│   └── avaliacoesController.js    # Sistema de avaliações
├── services/                       # Regras de negócio e acesso ao banco
│   ├── pacienteService.js         # Lógica de pacientes
│   ├── agendamentoService.js      # Lógica de agendamentos
│   └── avaliacaoService.js        # Lógica de avaliações
├── routes/                         # Definição de rotas da API
│   ├── pacientesRoutes.js         # Rotas de pacientes
│   ├── agendamentosRoutes.js      # Rotas de agendamentos
│   └── avaliacoesRoutes.js        # Rotas de avaliações
├── public/                         # Arquivos estáticos (frontend)
│   ├── capa.html                  # Landing page
│   ├── home.html                  # Dashboard principal
│   ├── agendamento.html           # Formulário de agendamento
│   ├── index.html                 # Cadastro de pacientes
│   ├── avaliacao.html             # Sistema de avaliações
│   ├── login.html                 # Login administrativo
│   ├── admin.html                 # Gestão de agendamentos
│   ├── organizar-agenda.html      # Organização de horários
│   ├── css/                       # Estilos organizados por página
│   │   ├── capa.css
│   │   ├── home.css
│   │   ├── agendamento.css
│   │   ├── cadastro.css
│   │   ├── avaliacao.css
│   │   ├── login.css
│   │   ├── admin.css
│   │   └── organizar-agenda.css
│   ├── js/                        # Scripts JavaScript
│   │   ├── agendamento.js
│   │   ├── script.js
│   │   ├── avaliacao.js
│   │   ├── login.js
│   │   ├── admin.js
│   │   └── organizar-agenda.js
│   └── img/                       # Imagens e assets
│       └── backgroundcapa.png
├── db.js                          # Configuração do banco de dados
├── api.js                         # Agregador de rotas da API
├── app.js                         # Configuração do Express
├── server.js                      # Inicialização do servidor
├── script.sql                     # Schema do banco de dados
└── package.json                   # Dependências do projeto
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v22.20.0 ou superior)
- MySQL (v8.0 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/chatbot-secretaria-virtual.git
cd chatbot-secretaria-virtual
```

2. **Instale as dependências**
```bash
npm install
```

As principais dependências instaladas serão:
- express@5.2.1
- mysql2@3.15.3

3. **Configure o banco de dados**

Edite o arquivo `db.js` com suas credenciais MySQL:
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           // Seu usuário MySQL
  password: 'sua_senha',  // Sua senha MySQL
  database: 'clinica_chatbot',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

4. **Crie o banco de dados**

Execute o script SQL fornecido:
```bash
mysql -u root -p < script.sql
```

Ou execute manualmente as seguintes queries:

```sql
CREATE DATABASE clinica_chatbot;
USE clinica_chatbot;

-- Tabela de Pacientes
CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefone VARCHAR(20),
  nascimento_mes INT,
  nascimento_ano INT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  data_consulta DATE,
  tratamento VARCHAR(100),
  periodo VARCHAR(20),
  horario VARCHAR(10),
  tipo_consulta VARCHAR(200),
  queixa TEXT,
  status VARCHAR(20) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de Avaliações
CREATE TABLE avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefone VARCHAR(20),
  avaliacao TEXT NOT NULL,
  estrelas INT NOT NULL DEFAULT 5,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabelas auxiliares (se necessário)
CREATE TABLE conversas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  mensagem TEXT,
  resposta TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE atendimentos_fluxo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  etapa VARCHAR(50),
  dados_coletados JSON,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
```

5. **Inicie o servidor**
```bash
node server.js
```

Você deverá ver a mensagem:
```
Servidor rodando na porta 3000
```

6. **Acesse o sistema**

Abra seu navegador e acesse:
```
http://localhost:3000/capa.html
```

## 🔐 Credenciais de Teste

**Área Administrativa:**
- **Usuário:** `admin`
- **Senha:** `Admin123`

**Observação:** A sessão expira automaticamente após 2 horas de inatividade.

## 📱 Páginas do Sistema

| Página | Descrição | Acesso | URL |
|--------|-----------|--------|-----|
| `capa.html` | Landing page inicial com background | Público | `/capa.html` |
| `home.html` | Dashboard com busca e avaliações | Público | `/home.html` |
| `agendamento.html` | Formulário de agendamento | Público | `/agendamento.html` |
| `index.html` | Cadastro de pacientes | Público | `/index.html` |
| `avaliacao.html` | Sistema de avaliações (estrelas) | Público | `/avaliacao.html` |
| `login.html` | Login administrativo | Restrito | `/login.html` |
| `admin.html` | Gestão de agendamentos | Restrito | `/admin.html` |
| `organizar-agenda.html` | Organização de horários | Restrito | `/organizar-agenda.html` |

## 🎯 Funcionalidades Detalhadas

### 🔍 Sistema de Busca Inteligente
- **Ícone de Lupa:** Design moderno com ícone SVG
- **Busca por Keywords:**
  - Digite "Avaliar" → Redireciona para `avaliacao.html`
  - Digite "Agendar" → Redireciona para `agendamento.html`
  - Digite "Cadastrar" → Redireciona para `index.html`
- **Filtro de Avaliações:** Filtra reviews exibidos na página inicial

### ⏰ Gestão de Agenda do Doutor
- **Horários de Atendimento:**
  - Cadastre horário de início e fim
  - Exemplo: 08:00 às 12:00, 14:00 às 18:00
- **Períodos de Ausência:**
  - Marque férias, folgas ou compromissos
  - Campo para motivo da ausência
- **Validação Automática:**
  - Impede pacientes agendarem em horários indisponíveis
  - Alerta quando ausência conflita com consultas já agendadas
- **Armazenamento:** LocalStorage (dados temporários na sessão)

### ⭐ Sistema de Avaliações Interativo
- **Escala Visual:** 5 estrelas clicáveis
- **Efeito Hover:** Preview das estrelas ao passar o mouse
- **Seleção Persistente:** Clique para fixar a avaliação
- **Cores:**
  - Estrelas vazias: `#cccccc` (cinza)
  - Estrelas preenchidas: `#FFD700` (dourado)
- **Integração com Banco:** Salva no MySQL via API `/api/avaliacoes`
- **Exibição:** Cards dinâmicos na página inicial (`home.html`)

### 🔒 Segurança e Autenticação
- **Sessão com Expiração:**
  - Timeout: 2 horas de inatividade
  - Função `verificarExpiracao()` em `admin.js` e `organizar-agenda.js`
  - Logout automático ao expirar
- **Proteção de Rotas:** Áreas administrativas requerem login
- **LocalStorage:** Armazena `isLoggedIn`, `userName`, `loginTime`

### 📊 Dashboard Administrativo
- **Tabs de Navegação:**
  - "Atendimento da Semana" (lista consultas)
  - "Organizar Agenda" (gerenciar horários)
- **Cards de Consultas:**
  - Nome do paciente, data, horário, tipo
  - Botões: Confirmar, Alterar, Excluir
- **Filtros por Status:**
  - Pendente (amarelo)
  - Confirmado (verde)
  - Cancelado (vermelho)
  - Ausente (cinza)

## 🌐 API Endpoints

### Pacientes
| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| GET | `/api/pacientes` | Lista todos os pacientes | - |
| POST | `/api/pacientes` | Cria novo paciente | `{ nome, email, telefone, nascimento_mes, nascimento_ano }` |
| PUT | `/api/pacientes/:id` | Atualiza paciente | `{ nome, email, telefone }` |

### Agendamentos
| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| GET | `/api/agendamentos` | Lista agendamentos | - |
| POST | `/api/agendamentos` | Cria agendamento | `{ paciente_id, data_consulta, horario, tipo_consulta, queixa }` |
| PUT | `/api/agendamentos/:id` | Atualiza agendamento | `{ data_consulta, horario, tipo_consulta }` |
| PATCH | `/api/agendamentos/:id/status` | Atualiza status | `{ status: "confirmado" \| "cancelado" \| "ausente" }` |
| DELETE | `/api/agendamentos/:id` | Exclui agendamento | - |

### Avaliações
| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| GET | `/api/avaliacoes` | Lista avaliações | - |
| POST | `/api/avaliacoes` | Cria avaliação | `{ nome, email, telefone, avaliacao, estrelas }` |

### Exemplos de Requisições

**Criar Paciente:**
```javascript
fetch('/api/pacientes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 98765-4321',
    nascimento_mes: 5,
    nascimento_ano: 1990
  })
});
```

**Criar Avaliação:**
```javascript
fetch('/api/avaliacoes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'Maria Santos',
    email: 'maria@email.com',
    telefone: '(11) 91234-5678',
    avaliacao: 'Excelente atendimento!',
    estrelas: 5
  })
});
```

## 📊 Fluxo de Dados

```
┌─────────────┐
│   Paciente  │
│  (Frontend) │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  API Route  │────▶│  Controller  │────▶│   Service    │
│  (Express)  │     │   (Lógica)   │     │  (Regras)    │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │   Database   │
                                          │    (MySQL)   │
                                          └──────────────┘
```

**Camadas de Responsabilidade:**
1. **Routes:** Define endpoints e métodos HTTP
2. **Controllers:** Processa requisições e respostas
3. **Services:** Implementa regras de negócio
4. **Database:** Persistência de dados

## 🐛 Resolução de Problemas

### Erro: "Cannot GET /api/..."
**Causa:** Servidor não iniciado ou rotas não carregadas

**Solução:**
```bash
# Verifique processos na porta 3000
lsof -ti:3000

# Mate processos antigos
kill -9 $(lsof -ti:3000)

# Reinicie o servidor
node server.js
```

### Erro: "Access denied for user"
**Causa:** Credenciais incorretas no `db.js`

**Solução:**
1. Verifique usuário e senha no MySQL
2. Teste a conexão:
```bash
mysql -u root -p
```
3. Atualize `db.js` com credenciais corretas

### Erro: "Table doesn't exist"
**Causa:** Banco de dados não criado

**Solução:**
```bash
mysql -u root -p < script.sql
```
Ou execute as queries manualmente no MySQL Workbench.

### Sessão expira muito rápido
**Causa:** Timeout configurado para 2 horas

**Solução:** Edite `js/login.js` e `js/admin.js`:
```javascript
// Altere de 2 para o número de horas desejado
if (diferencaHoras >= 2) {  // Mude para 4, 8, etc.
  // Logout automático
}
```

### Estrelas não aparecem
**Causa:** Fonte não carrega símbolos ☆ e ★

**Solução:** Certifique-se de que o CSS está carregado:
```html
<link rel="stylesheet" href="css/avaliacao.css">
```

### Conflitos de agenda não detectados
**Causa:** LocalStorage vazio ou limpo

**Solução:** Cadastre horários em "Organizar Agenda" primeiro, antes de testar agendamentos.

## 🔧 Manutenção e Melhorias Futuras

### Sugestões de Implementação

1. **Migrar Agenda para Banco de Dados**
   - Atualmente usa LocalStorage
   - Criar tabela `horarios_doutor` no MySQL

2. **Sistema de Notificações**
   - Email/SMS para confirmação de consultas
   - Lembretes 24h antes do agendamento

3. **Dashboard com Estatísticas**
   - Gráficos de consultas por mês
   - Taxa de ausências de pacientes
   - Média de avaliações

4. **Multi-profissionais**
   - Suporte para múltiplos dentistas
   - Agenda individual por profissional

5. **Integração com WhatsApp**
   - Bot para agendamento via WhatsApp
   - Confirmações automáticas

6. **Sistema de Prontuário**
   - Histórico de tratamentos
   - Upload de exames e radiografias

7. **Relatórios Administrativos**
   - Exportar dados em PDF/Excel
   - Relatório financeiro de consultas

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de estudo.

## 👨‍💻 Desenvolvedor

Projeto desenvolvido em **Dezembro de 2025** como parte dos estudos em desenvolvimento web full-stack.

## 📧 Contato

Para dúvidas, sugestões ou contribuições, entre em contato:
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@exemplo.com

---

<div align="center">

⭐ **Se este projeto foi útil, deixe uma estrela no repositório!** ⭐

🦷 **Sistema de Secretaria Virtual - Facilitando o atendimento odontológico** 🦷

</div>

# Clilnica-Vita