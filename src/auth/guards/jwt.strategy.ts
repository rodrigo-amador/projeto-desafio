import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Para não expirar o token e poder ser utilizado em testes futuros
            ignoreExpiration: true,
            // Por ser um projeto demo a secretKey vai estar hardcoded e visivel no projeto, 
            // mas obviamente o correto seria utilizar um .env ou outro mecanismo para salvar o dado e fazer o import quando fosse necessário
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: any) {
        return payload;
    }
}