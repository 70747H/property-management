import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Property } from '../../property/entities/property.entity';

@Entity('leased_properties')
export class LeasedProperties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  end_date: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.leased_properties)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => Property, (property) => property.leased_properties)
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
