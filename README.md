# Loja de Jogos Vulnerável

Este é um projeto de uma loja de jogos online com vulnerabilidades propositais para fins educacionais e prática de testes de segurança.

## ⚠️ Aviso

Este projeto contém vulnerabilidades propositais e NÃO deve ser usado em produção. Ele foi criado apenas para fins educacionais e prática de testes de segurança.

## 🛠️ Vulnerabilidades Implementadas

1. Injeção NoSQL
2. XSS (Cross-Site Scripting)
3. CSRF (Cross-Site Request Forgery)
4. Dados sensíveis expostos
5. Senhas em texto puro
6. IDOR (Insecure Direct Object Reference)
7. Sessão sem proteção adequada
8. Sem proteção contra Brute Force

## 🚀 Instalação

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd vulnerable-game-store
```

2. Instale as dependências
```bash
npm install
```

3. Configure o MongoDB
- Certifique-se de ter o MongoDB instalado e rodando localmente
- O banco de dados será criado automaticamente ao iniciar a aplicação

4. Configure o arquivo .env
- Renomeie o arquivo `.env.example` para `.env`
- Ajuste as variáveis conforme necessário

5. Inicie o servidor
```bash
npm run dev
```

## 📝 Endpoints

### Autenticação
- POST /auth/register - Criar nova conta
- POST /auth/login - Fazer login
- POST /auth/logout - Fazer logout

### Loja
- GET /shop - Listar jogos
- POST /shop/game/:id/review - Adicionar review
- POST /shop/purchase/:id - Comprar jogo
- GET /shop/purchases/:userId - Ver histórico de compras

## 🧪 Testes de Segurança Sugeridos

1. Injeção NoSQL
   - Tente fazer login usando payloads de injeção NoSQL

2. XSS
   - Insira scripts maliciosos nos comentários dos jogos

3. CSRF
   - Tente fazer requisições sem token CSRF

4. Exposição de Dados Sensíveis
   - Verifique as respostas das APIs por dados sensíveis

5. IDOR
   - Tente acessar compras de outros usuários

## 🤝 Contribuição

Este é um projeto educacional. Sinta-se à vontade para contribuir adicionando novas vulnerabilidades ou melhorando a documentação.

## 📄 Licença

Este projeto está sob a licença MIT. 