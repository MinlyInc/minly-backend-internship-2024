import { generateUuid7 } from 'src/utils/uuid7';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export abstract class AutoTimestamp {

  // @PrimaryColumn({})
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // @Column({ type: 'varchar' })
    // uuid: string;
  
    // @BeforeInsert()
    // setUuid() {
    //   this.uuid = generateUuid7();
    // }

    // @BeforeUpdate()
    // onUpdate() {
    //   this.updated_at = new Date();
    // }
  }