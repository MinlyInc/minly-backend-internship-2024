import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from './base.entity';

export abstract class BaseEntityUUID extends BaseEntity {
  @Column({ unique: true})
  uuid: string;

  @BeforeInsert()
  generateUUID() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
