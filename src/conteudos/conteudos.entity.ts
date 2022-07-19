import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsIn } from 'class-validator';

@Entity()
export class Conteudos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nome: string;

  @Column()
  @IsString()
  descricao: string;

  @Column()
  @IsString()
  @IsIn(['video', 'pdf', 'image'])
  tipo: string;

  // Devido ao SQLite não trabalhar com arrays, vamos salvar os ids dos usuários em uma string
  @Column()
  @IsString()
  visualizacao: string = "";
}