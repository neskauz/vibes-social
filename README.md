# VIBES — Rede social

Uma rede social front-end feita com HTML, CSS e JavaScript puro. O projeto foi pensado como peça de portfólio: interface responsiva, componentes organizados e interações funcionais no navegador.

## Funcionalidades

- Feed com publicações de exemplo
- Criar publicações com texto e imagem
- Curtir e descurtir publicações
- Comentar em publicações
- Salvar publicações
- Excluir as próprias publicações
- Stories demonstrativos
- Explorar publicações por categoria
- Seguir e deixar de seguir perfis
- Busca no feed
- Notificações demonstrativas
- Persistência de publicações, curtidas, comentários, salvos e seguindo via `localStorage`

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta `vibes-social` no VS Code.
3. Abra `index.html` no navegador. Recomendado: usar a extensão **Live Server** do VS Code e clicar em **Go Live**.

Não é necessário instalar dependências ou configurar servidor.

## Estrutura

```text
vibes-social/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox e media queries)
- JavaScript (DOM, eventos e localStorage)

## Observações

Esta é uma versão front-end demonstrativa. Os dados ficam salvos apenas no navegador utilizado. Login real, banco de dados, upload permanente de imagens, mensagens privadas e sincronização entre usuários exigem um backend e autenticação.

## Publicar no GitHub

Crie um repositório chamado `vibes-social`. No terminal do VS Code, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "feat: cria rede social Vibes"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/vibes-social.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu usuário do GitHub.

Para publicar pelo GitHub Pages: abra **Settings → Pages**, selecione **Deploy from a branch**, escolha `main` e `/ (root)`, e salve.
