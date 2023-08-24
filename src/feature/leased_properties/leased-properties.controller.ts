import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LeasedPropertiesService } from './leased-properties.service';
import { CreateLeasedPropertiesDto } from './dto/create-lease-properties.dto';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(
    private readonly leasedPropertiesService: LeasedPropertiesService,
  ) {}

  @Post('lease')
  leaseProperty(@Body() createLeasedPropertiesDto: CreateLeasedPropertiesDto) {
    return this.leasedPropertiesService.lease(createLeasedPropertiesDto);
  }
}
