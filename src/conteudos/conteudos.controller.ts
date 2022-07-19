import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { ConteudosService } from './conteudos.service';
import { CreateConteudoDto } from './dtos/create-conteudo-dto';
import { UpdateConteudoDto } from './dtos/update-conteudo-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import RoleGuard from '../auth/guards/role.guard';

@Controller('conteudos')
export class ConteudosController {
    constructor(private conteudosService: ConteudosService) { }
    // Rotas de Estudante
    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard('estudante'))
    getAll() {
        return this.conteudosService.findAll();
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard('estudante'))
    getOne(@Request() req: any, @Param('id') id: string) {
        return this.conteudosService.findOne(parseInt(id), req.user);
        
    }

    // Rotas de Administrador:
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard('admin'))
    create(@Body() body: CreateConteudoDto) {
        return this.conteudosService.create(body);
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard('admin'))
    update(@Param('id') id: string, @Body() body: UpdateConteudoDto) {
        return this.conteudosService.update(parseInt(id), body);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RoleGuard('admin'))
    remove(@Param('id') id: string) {
        return this.conteudosService.remove(parseInt(id));
    }
}
