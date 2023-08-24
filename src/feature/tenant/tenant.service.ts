import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}
  create(createTenantDto: CreateTenantDto) {
    return this.tenantRepository.insert(createTenantDto);
  }

  findAll() {
    return this.tenantRepository.find();
  }

  findOne(id: number) {
    return this.tenantRepository.findOneByOrFail({ id });
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return this.tenantRepository.update({ id }, updateTenantDto);
  }

  remove(id: number) {
    return this.tenantRepository.softRemove({ id });
  }
}
