import { APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Conteudos } from './conteudos/conteudos.entity';
import { ConteudosModule } from './conteudos/conteudos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // conexão com BD: 
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
      entities: [
        Conteudos
      ],
      synchronize: true
    }),
    ConteudosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ]
})

export class AppModule { }
