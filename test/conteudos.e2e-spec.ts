import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// seta os 5 tokens, posição 0 = administrador, posições 1-4 = estudantes
const jwtTokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbmlzdHJhZG9yIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoxMDAsImlhdCI6MTY1ODE2MTU1MH0.qtbDWPhf2m1lw-JoUpTq9WrFFxNC-LYDs4jacQ_maIg",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibG9naW4iOiJlc3R1ZGFudGUxIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.mF4YSeOonSJXKAf80aEObrmBGfyZwdntQQnEXSoW9BE",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibG9naW4iOiJlc3R1ZGFudGUyIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.Hx_qc-9G_POsY6hLPK9d_uZA3LkW4TWINtQopQ87eSM",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibG9naW4iOiJlc3R1ZGFudGUzIiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.YtCuW7nC36c8iuH7aYI_bz6tKToTTAWCmyaJx6hJmd4",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibG9naW4iOiJlc3R1ZGFudGU0Iiwic2VuaGEiOiIxMjM0IiwidGlwb191c3VhcmlvIjoyMDAsImlhdCI6MTY1ODE2MTU1MH0.ZzGpqwyKlD6KfyBQkft77Q1dOROFsmfFoiAvoWuMjFg"
];

describe('Authentication System (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    // testes de token
    it('(GET) Retorna erro devido a falta de token', () => {
        return request(app.getHttpServer())
            .get('/conteudos')
            .set('Authorization', 'Bearer ')
            .then((res) => {
                expect(res.statusCode).toEqual(401);
                expect(res.body.message).toEqual('Unauthorized')
            })
    });

    it('(GET) Retorna erro devido a token invalido', () => {
        return request(app.getHttpServer())
            .get('/conteudos')
            .set('Authorization', 'Bearer ' + jwtTokens[0] + 'a')
            .then((res) => {
                expect(res.statusCode).toEqual(401);
                expect(res.body.message).toEqual('Unauthorized')
            })
    });

    it('(POST) Retorna erro devido a token estudante sendo usado em rota de administrador', () => {
        return request(app.getHttpServer())
            .post('/conteudos')
            .send({
                "nome": "Video teste",
                "descricao": "descrição teste",
                "tipo": "video"
            })
            .set('Authorization', 'Bearer ' + jwtTokens[1])
            .then((res) => {
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('Forbidden resource')
            })
    });

    it('(POST) Administrador (jwtTokens[0]) cria um registro', () => {
        return request(app.getHttpServer())
            .post('/conteudos')
            .send({
                "nome": "Video teste",
                "descricao": "descrição teste",
                "tipo": "video"
            })
            .set('Authorization', 'Bearer ' + jwtTokens[0])
            .then((res) => {
                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toBeDefined();
                expect(res.body.nome).toEqual('Video teste');
            })
    });

    it('(POST) Administrador (jwtTokens[0]) erro de tipo video invalido', () => {
        return request(app.getHttpServer())
            .post('/conteudos')
            .send({
                "nome": "Video teste",
                "descricao": "descrição teste",
                "tipo": "video1"
            })
            .set('Authorization', 'Bearer ' + jwtTokens[0])
            .then((res) => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.error).toEqual('Bad Request');
            })
    });

    it('(PATCH) Administrador (jwtTokens[0]) atualiza registro com id 1 criado anteriormente', () => {
        return request(app.getHttpServer())
            .patch('/conteudos/1')
            .send({
                "nome": "Video teste update",
                "tipo": "video"
            })
            .set('Authorization', 'Bearer ' + jwtTokens[0])
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toEqual(1);
                expect(res.body.nome).toEqual('Video teste update');
            })
    });

    it('(PATCH) Administrador (jwtTokens[0]) erro ao atualiza registro com id 1, pois tipo é invalido', () => {
        return request(app.getHttpServer())
            .patch('/conteudos/1')
            .send({
                "descricao": "descrição teste",
                "tipo": "pdff"
            })
            .set('Authorization', 'Bearer ' + jwtTokens[0])
            .then((res) => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.error).toEqual('Bad Request');
            })
    });

    it('(GET) Retorna a listagem de conteudos - com length = 1, pelo registro ter sido criado acima', () => {
        return request(app.getHttpServer())
            .get('/conteudos')
            .set('Authorization', 'Bearer ' + jwtTokens[1])
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toEqual(1);
                // valor atualizado pelo patch
                expect(res.body[0].nome).toEqual('Video teste update');
            })
    });

    it('(GET) Retorna o registro especifico, especificado pelo id na rota, adicionando a visualização unica', () => {
        return request(app.getHttpServer())
            .get('/conteudos/1')
            .set('Authorization', 'Bearer ' + jwtTokens[1])
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toBeDefined();
                // como é a primeira vez que o usuário visualiza adiciona o "id" dele na visualização unica
                expect(res.body.visualizacao.length).toEqual(1);
            })
    });

    it('(GET) Retorna o registro especifico, especificado pelo id na rota não, adicionando a visualização unica', () => {
        return request(app.getHttpServer())
            .get('/conteudos/1')
            .set('Authorization', 'Bearer ' + jwtTokens[1])
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toBeDefined();
                // como é a segunda vez que o usuário visualiza, não adiciona o "id" dele na visualização unica - length não muda
                expect(res.body.visualizacao.length).toEqual(1);
            })
    });

    it('(GET) Retorna o registro especifico, especificado pelo id na rota, adicionando a visualização unica novamente por ser um estudante diferente', () => {
        return request(app.getHttpServer())
            .get('/conteudos/1')
            .set('Authorization', 'Bearer ' + jwtTokens[2])
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toBeDefined();
                // como é a primeira vez que o usuário visualiza adiciona o "id" dele na visualização unica
                // length = 3 por contar a virgula, ex retorno: "2,3"
                expect(res.body.visualizacao.length).toEqual(3);
            })
    });

    it('(DELETE) Administrador (jwtTokens[0]) deleta registro com id 1 criado anteriormente', () => {
        return request(app.getHttpServer())
            .delete('/conteudos/1')
            .set('Authorization', 'Bearer ' + jwtTokens[0])
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            })
    });
});
