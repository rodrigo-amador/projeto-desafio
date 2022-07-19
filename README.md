# projeto-desafio

Desenvolvido no Windows 10

Versão node/npm:
- node 16.16
- npm 8.4.1

-------------------------------------------------------------------------------------------------------------------------------

tecnologias:
- BD: SQLite (Para facilitar o processo no geral)
- Test: Jest
- Framework: Nest.js (Pacotes com as versões mais atuais)

-------------------------------------------------------------------------------------------------------------------------------

Dados BD:
- Para chamadas de rota dev vai utilizar o BD db.sqlite (arquivo encontra-se no root do projeto e é gerado ao rodar o script)

- Para os testes vai utilizar o BD test.sqlite (arquivo encontra-se no root do projeto e é gerado ao rodar o script, com seus registros zerados ao final da bateria de testes)

- Para visualizar o DB pode utilizar a Extensão SQLite (primeira opção - circulo azul com uma pena branca dentro) -> Clicar em Ver (aba superior) -> Paleta de Comandos -> SQLite: Open Database -> db.sqlite. Nisso uma nova opção vai aparecer na barra lateral: SQLITE EXPLORER, onde pode-se visualizar as tabelas, suas estruturas e os registros salvos.

-------------------------------------------------------------------------------------------------------------------------------
Comandos para rodar o projeto:

iniciar projeto: npm run start:dev

teste integração: npm run test:e2e

-------------------------------------------------------------------------------------------------------------------------------

Tokens:
- Administrador: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbmlzdHJhZG9yIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoxMDAsImlhdCI6MTY1ODE2MTU1MH0.qtbDWPhf2m1lw-JoUpTq9WrFFxNC-LYDs4jacQ_maIg`

- Estudante 1: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibG9naW4iOiJlc3R1ZGFudGUxIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.mF4YSeOonSJXKAf80aEObrmBGfyZwdntQQnEXSoW9BE`

- Estudante 2: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibG9naW4iOiJlc3R1ZGFudGUyIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.Hx_qc-9G_POsY6hLPK9d_uZA3LkW4TWINtQopQ87eSM`

- Estudante 3: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibG9naW4iOiJlc3R1ZGFudGUzIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.YtCuW7nC36c8iuH7aYI_bz6tKToTTAWCmyaJx6hJmd4`

- Estudante 4: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibG9naW4iOiJlc3R1ZGFudGU0Iiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.ZzGpqwyKlD6KfyBQkft77Q1dOROFsmfFoiAvoWuMjFg`

-------------------------------------------------------------------------------------------------------------------------------

Rotas:
(GET) localhost:3000/conteudos : Retorna a listagem de conteudos (qualquer usuário)
headers: {
    Authorization: `Bearer {token}`
}

(GET) localhost:3000/conteudos/{id} : Retorna o registro do conteudo com o id fornecido na URL via parametro (qualquer usuário)
headers: {
    Authorization: `Bearer {token}`
}

(POST) localhost:3000/conteudos : Cria o registro de conteudo com o body abaixo (somente administrador)
headers: {
    Authorization: `Bearer {token}`
}
body: {
    "nome": "Video teste 4",
    "descricao": "descrição teste 4",
    "tipo": "video"
}

(PATCH) localhost:3000/conteudos/{id} : Edita o registro de conteudo com o id (fornecido na url como parametro) e body fornecido abaixo (somente administrador)
headers: {
    Authorization: `Bearer {token}`
}
body: {
    "nome": "Video teste 4", // opcional
    "descricao": "descrição teste 4", // opcional
    "tipo": "video" // opcional
}

(DELETE) localhost:3000/conteudos/{id} : Deleta o registro de conteudo com o id fornecido na URL via parametro (somente administrador)
headers: {
    Authorization: `Bearer {token}`
}
