# 🎮 Loja de Jogos Vulnerável

Este é um projeto de uma loja de jogos online com vulnerabilidades propositais para fins educacionais e prática de testes de segurança.

## ⚠️ Aviso

Este projeto contém vulnerabilidades propositais e NÃO deve ser usado em produção. Ele foi criado apenas para fins educacionais e prática de testes de segurança.

## 🛠️ Vulnerabilidades Implementadas

1. **Injeção NoSQL**
   - Login bypass usando payloads NoSQL
   - Consultas não sanitizadas

2. **XSS (Cross-Site Scripting)**
   - Campos de comentários vulneráveis
   - Dados não sanitizados em reviews

3. **CSRF (Cross-Site Request Forgery)**
   - Formulários sem proteção CSRF
   - Operações sensíveis sem tokens

4. **Dados Sensíveis Expostos**
   - Senhas em texto puro
   - Dados de cartão de crédito expostos
   - Informações sensíveis em logs

5. **Autenticação Fraca**
   - Credenciais admin hardcoded (admin/admin)
   - Sem proteção contra força bruta
   - Sessão sem proteção adequada

6. **IDOR (Insecure Direct Object Reference)**
   - Acesso a dados de outros usuários
   - Manipulação de IDs nas URLs

## 🚀 Instalação

1. Clone o repositório
```bash
git clone https://github.com/Colttzdll/colttzshop.git
cd colttzshop
```

2. Instale as dependências
```bash
npm install
```

3. Configure o MongoDB
- Certifique-se de ter o MongoDB instalado e rodando localmente
- O banco de dados será criado automaticamente

4. Configure o arquivo .env
```env
MONGODB_URI=mongodb://localhost:27017/gamestore
SESSION_SECRET=chave-super-secreta
PORT=3000
```

5. Inicie o servidor
```bash
npm run dev
```

## 📝 Rotas Principais

### Autenticação
- `GET /auth/register` - Página de registro
- `POST /auth/register` - Criar conta
- `GET /auth/login` - Página de login
- `POST /auth/login` - Fazer login
- `POST /auth/logout` - Fazer logout

### Admin
- `GET /admin/login` - Login administrativo
- `POST /admin/login` - Autenticar admin
- `GET /admin` - Painel administrativo
- `POST /admin/logout` - Logout admin

### Loja
- `GET /shop` - Lista de jogos
- `POST /shop/game/:id/review` - Adicionar review
- `POST /shop/purchase/:id` - Comprar jogo
- `GET /shop/purchases/:userId` - Histórico de compras

## 🧪 Testes de Segurança

### 1. Injeção NoSQL
```json
{
  "username": {"$ne": null},
  "password": {"$ne": null}
}
```

### 2. XSS
```html
<script>alert('XSS')</script>
```

### 3. CSRF
- Criar uma página maliciosa que envia requisições
- Testar operações sem CSRF token

### 4. IDOR
- Modificar IDs nas URLs
- Tentar acessar dados de outros usuários

### 5. Admin Bypass
- Credenciais: admin/admin
- Testar força bruta
- Manipular cookies de sessão

## 👥 Usuários de Teste

1. **Admin**
- Username: admin
- Password: admin

2. **Usuário Normal**
- Username: user
- Password: user123

## 📄 Licença

Este projeto está sob a licença MIT.

## ⚠️ Disclaimer

Este projeto é apenas para fins educacionais. Não use em produção ou para atividades maliciosas. 