import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConteudosController } from './conteudos.controller';
import { ConteudosService } from './conteudos.service';
import { Conteudos } from './conteudos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conteudos])],
  controllers: [ConteudosController],
  providers: [ConteudosService]
})

export class ConteudosModule { }
