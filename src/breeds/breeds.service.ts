import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ){}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save( createBreedDto );
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: string) {
    const foundBreed = await this.breedRepository.findOneBy({id});
    if (!foundBreed) {
      // Asegúrate de que el mensaje sea solo un string
      throw new BadRequestException('Breed not found');
    }
    return foundBreed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    const foundBreed = await this.findOne( id ); 
    return await this.breedRepository.update(id, updateBreedDto);
  }

  async remove(id: string) {
    const foundBreed = await this.findOne( id ); 
    return await this.breedRepository.softDelete(id);
  }
}
