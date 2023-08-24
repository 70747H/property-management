import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}
  create(createUnitDto: CreateUnitDto) {
    return this.unitRepository.insert(createUnitDto);
  }

  findAll() {
    return this.unitRepository.find();
  }

  findOne(id: number) {
    return this.unitRepository.findOneByOrFail({ id });
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return this.unitRepository.update({ id }, updateUnitDto);
  }

  remove(id: number) {
    return this.unitRepository.softRemove({ id });
  }
}
