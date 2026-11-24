# VIBES — Rede social

Rede social front-end desenvolvida com **HTML, CSS e JavaScript puro**. Projeto de portfólio com interface responsiva e interações executadas no navegador.

🌐 **[Acessar demonstração online](https://neskauz.github.io/vibes-social/)**

## Funcionalidades

- Feed com publicações demonstrativas
- Criar publicações com texto e imagem
- Curtir e descurtir publicações
- Comentar em publicações
- Salvar e excluir publicações próprias
- Stories demonstrativos
- Explorar publicações por categoria
- Seguir e deixar de seguir perfis
- Busca no feed
- Notificações demonstrativas
- Persistência local de publicações, curtidas, comentários, itens salvos e perfis seguidos usando `localStorage`

## Tecnologias

- **HTML5** — estrutura da aplicação
- **CSS3** — layout responsivo com Grid, Flexbox e media queries
- **JavaScript** — manipulação do DOM, eventos e armazenamento local

## Executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/neskauz/vibes-social.git
   cd vibes-social
   ```
2. Abra a pasta no VS Code.
3. Abra o `index.html` no navegador. Para desenvolvimento, você também pode usar a extensão Live Server.

Não é necessário instalar dependências.

## Estrutura

```text
vibes-social/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Limitações da demonstração

Esta é uma aplicação exclusivamente front-end. Os dados ficam armazenados no navegador por meio de `localStorage` e não são compartilhados entre dispositivos ou usuários. Autenticação real, banco de dados, upload permanente de imagens, mensagens privadas e sincronização multiusuário exigiriam um backend.

## Objetivo do projeto

Praticar desenvolvimento front-end, construção de interfaces responsivas, manipulação do DOM, tratamento de eventos e persistência de dados no navegador.
