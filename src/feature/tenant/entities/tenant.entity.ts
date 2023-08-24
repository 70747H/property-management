import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { LeasedProperties } from './leased-properties.entity';
import { Property } from '../../property/entities/property.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact_details: string;

  @OneToMany(
    () => LeasedProperties,
    (leasedProperties) => leasedProperties.tenant,
  )
  leased_properties: LeasedProperties[];

  @ManyToMany(() => Property)
  @JoinTable({ name: 'tenant_properties' })
  properties: Property[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @DeleteDateColumn()
  public deleted_at: Date;
}
