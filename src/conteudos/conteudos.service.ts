import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conteudos } from './conteudos.entity';
import { CreateConteudoDto } from './dtos/create-conteudo-dto';


@Injectable()
export class ConteudosService {
	constructor(@InjectRepository(Conteudos) private repo: Repository<Conteudos>,) { }

	findAll() {
		return this.repo.find();
	}

	async findOne(id: number, user: any) {
		if (!id) {
			return null;
		}

		let conteudo = await this.repo.findOneBy({ id });

		if (!conteudo) {
			throw new NotFoundException('Conteudo não encontrado.');
		}

		// Valida se o usuário já tinha visualizado o video, caso não atualiza a tabela de conteudo com o ID do usuário
		if (user) {
			let visualizar = conteudo.visualizacao.length ? conteudo.visualizacao.split(',').map(Number) : [];

			if (!visualizar.find(idUsuario => idUsuario === user.id)) {
				visualizar[visualizar.length] = user.id;
				conteudo.visualizacao = visualizar.toString();

				// retorna o registro com o 
				conteudo = await this.update(id, conteudo)
			}
		}

		return conteudo;
	}

	// Rotas de Administrador:
	create(body: CreateConteudoDto) {
		// Possivel adicionar validação de campos, por exemplo criar um findOneByNome, onde validasse se o nome já existe, caso sim bloqueia a criação de um novo.
		const conteudo = this.repo.create(body);

		return this.repo.save(conteudo);
	}

	async update(id: number, body: Partial<Conteudos>) {
		// Chamada da função findOne, retornando o registro caso exista, senão a propria função já da o throw de um NotFoundException
		const conteudo = await this.findOne(id, null);

		Object.assign(conteudo, body);

		return this.repo.save(conteudo);
	}

	async remove(id: number) {
		// Chamada da função findOne, retornando o registro caso exista, senão a propria função já da o throw de um NotFoundException
		const conteudo = await this.findOne(id, null);

		return this.repo.remove(conteudo);
	}
}
