import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Point } from 'geojson';
import { Unit } from '../../unit/entities/unit.entity';
import { PropertyType } from '../enum/unit-type.enum';
import { LeasedProperties } from '../../leased_properties/entities/leased-properties.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column()
  property_type: PropertyType;

  @Column()
  price_per_sqm: number;

  @Column()
  number_of_rooms: number;

  @OneToMany(
    () => LeasedProperties,
    (leasedProperties) => leasedProperties.property,
  )
  leased_properties: LeasedProperties[];

  @OneToMany(() => Unit, (unit) => unit.property)
  units: Unit[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @DeleteDateColumn()
  public deleted_at: Date;
}
