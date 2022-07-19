import { IsString, IsIn } from 'class-validator';

export class CreateConteudoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  @IsIn(['video', 'pdf', 'image'])
  tipo: string;
}