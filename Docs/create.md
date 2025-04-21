🧠 Objetivo
Este projeto simula uma loja online de jogos com vulnerabilidades, conectada ao MongoDB, com as seguintes funções principais:

Tela de login e criação de conta

Página de compra de jogos

Sistema de armazenamento de dados sensíveis

Ambientes com falhas propositais para testes de segurança e aprendizado

🧱 Tecnologias Usadas
Frontend: HTML, CSS, JavaScript

Backend: Node.js com Express

Banco de Dados: MongoDB

Outros: EJS ou qualquer motor de template, dependendo da preferência

🧑‍💻 Funcionalidades
🟢 Registro (/register)
Criação de conta com:

username

email

senha (armazenada sem hash como falha proposital)

Sem validação de senha forte

Sem verificação de email (vulnerabilidade comum)

🔐 Login (/login)
Sistema de autenticação básico

Sem limitação de tentativas (vulnerável a brute-force)

Session ou JWT sem proteção adequada

🛒 Comprar Jogo (/shop)
Lista de jogos com botão “Comprar”

Ao clicar, simula transação e armazena no MongoDB:

json
Copiar
Editar
{
  "user": "nome_do_usuario",
  "jogo": "Nome do Jogo",
  "preco": 19.99,
  "data": "2025-04-20T00:00:00Z"
}
Nenhum sistema de pagamento real (tudo simulado)

🗃️ Banco de Dados
Coleções:

users → guarda usuários com senhas em texto puro (para testes de hash bypass)

games → jogos disponíveis

purchases → compras feitas

⚠️ Vulnerabilidades Propositais
Injeção NoSQL

Falta de hash em senhas

Dados sensíveis expostos

XSS (em campos de nome ou feedback)

CSRF (sem proteção em formulários)

🚀 Roteiro de Uso
Acesse /register e crie uma conta

Faça login em /login

Vá até /shop e simule a compra de jogos

Analise os dados no MongoDB (com acesso ao banco ou interface como Mongo Compass)

Realize testes de injeção e outras técnicas de pentest