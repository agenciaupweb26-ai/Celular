---
name: free-apis
description: Catálogo de ~1.400 APIs públicas e gratuitas (lista public-apis/public-apis), organizadas em ~50 categorias como clima, finanças, câmbio, CEP/geocoding, esportes, filmes, música, notícias, comida, jogos, governo, saúde, imagens e dados de teste. Use quando um site, app ou protótipo precisar de dados reais de uma API externa, ou quando o usuário perguntar "tem alguma API de X?".
---

# Free APIs

A lista completa está em `apis-list.md`, nesta pasta. Cada linha da tabela é:

`| [Nome](link da documentação) | Descrição | Auth | HTTPS | CORS |`

- **Auth:** `No` = sem chave; `apiKey` / `OAuth` / `X-Mashape-Key` = precisa cadastro.
- **HTTPS:** prefira `Yes`.
- **CORS:** `Yes` = dá para chamar direto do navegador (front-end puro); `No`/`Unknown` = chame pelo servidor (back-end ou função serverless).

## Como usar

1. Ache a categoria: `grep -n '^### ' apis-list.md`, depois leia só aquela seção (ou `grep -i 'palavra' apis-list.md`).
2. Escolha priorizando: **Auth No → HTTPS Yes → CORS Yes**, para um site estático.
3. Abra o link da documentação antes de usar. A lista é mantida pela comunidade e algumas APIs saem do ar ou mudam de plano. Confirme o endpoint e os limites atuais.
4. Nunca coloque chave de API secreta no front-end. Se precisar de chave, use variável de ambiente no servidor.

## Atalhos úteis para projetos no Brasil

Procure também por: `Brazil`, `BrasilAPI`, `CEP`, `IBGE`, `Banco Central`, `Real`, `Portuguese`.

Fonte: https://github.com/public-apis/public-apis (licença MIT, em `LICENSE`).
