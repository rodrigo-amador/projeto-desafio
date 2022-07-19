import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      // Por ser um projeto demo a secretKey vai estar hardcoded e visivel no projeto, 
      // mas obviamente o correto seria utilizar um .env ou outro mecanismo para salvar o dado e fazer o import quando fosse necessário
      secret: 'secretKey',
      verifyOptions: {
        // Para não expirar o token e poder ser utilizado em testes futuros
        ignoreExpiration: true
      }
    })],
  providers: [JwtStrategy],
  exports: [],
  controllers: []
})
export class AuthModule { }
