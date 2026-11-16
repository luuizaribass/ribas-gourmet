# Ribas Gourmet — app de administração

App para iPhone (PWA) que funciona sem internet e guarda tudo em um banco de dados na nuvem (Supabase, gratuito).

## 1. Criar o banco de dados (uma vez só, ~10 minutos)

1. Entre em **supabase.com**, crie uma conta e clique em **New project**. Escolha um nome (ex: ribas-gourmet), uma senha para o banco (guarde em algum lugar) e a região **South America (São Paulo)**.
2. No menu da esquerda abra **SQL Editor** → **New query**, cole todo o conteúdo do arquivo `supabase.sql` e clique em **Run**. Isso cria a tabela onde seus dados ficam guardados.
3. Vá em **Authentication → Users → Add user → Create new user**. Coloque o seu e-mail e uma senha, e deixe marcado **Auto Confirm User**. É com esse e-mail e senha que você vai entrar no app.
4. Ainda em **Authentication**, abra **Sign In / Providers** (ou **Settings**) e **desative "Allow new users to sign up"**. Assim ninguém além de você consegue criar conta no seu banco.
5. Vá em **Project Settings → API** (ou **Data API**). Copie:
   - **Project URL**
   - a chave **anon public** (a longa, que começa com `eyJ`)
6. Abra o arquivo `config.js` e cole os dois valores entre as aspas:

```js
window.RIBAS_CONFIG = {
  url: 'https://SEU-PROJETO.supabase.co',
  key: 'eyJ...sua chave anon public...'
};
```

A chave `anon public` pode ficar no arquivo sem problema: quem protege seus dados é o login e as regras que o `supabase.sql` criou. **Nunca** coloque a chave `service_role` aqui.

## 2. Publicar o app (GitHub Pages)

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (`index.html`, `config.js`, `manifest.json`, `sw.js` e os 3 ícones `.png`).
2. No repositório: **Settings → Pages → Branch: main / (root) → Save**.
3. Em um minuto o GitHub mostra o link do app (algo como `https://seuusuario.github.io/ribas-gourmet/`).

## 3. Instalar no iPhone

1. Abra o link no **Safari**.
2. Toque em **Compartilhar → Adicionar à Tela de Início**.
3. Abra o app **pelo ícone da tela inicial**, vá em **Mais → Banco de dados** e entre com o e-mail e a senha do passo 3.

A partir daí tudo que você lançar é salvo no celular e enviado para o banco. Sem internet o app continua funcionando e envia quando a internet voltar. O selinho ☁️ no canto de cada tela mostra se está tudo salvo.

## Para saber

- Se trocar de celular ou apagar o app, é só instalar de novo e entrar: os dados voltam da nuvem.
- Projetos gratuitos do Supabase são **pausados após 1 semana sem uso**. Os dados não somem; é só clicar em "Restore" no painel. Usando o app normalmente isso não acontece.
- Ainda vale fazer o **backup em arquivo** (Mais → Backup) de vez em quando, como cópia extra.
- Ao atualizar o app (trocar o `index.html` no GitHub), feche e abra o app duas vezes para a versão nova aparecer.
