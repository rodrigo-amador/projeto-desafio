import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateConteudoDto {
    @IsString()
    @IsOptional()
    nome: string;

    @IsString()
    @IsOptional()
    descricao: string;

    @IsString()
    @IsOptional()
    @IsIn(['video', 'pdf', 'image'])
    tipo: string;
}