import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from  "typeorm";

@Entity("usuarios")
class Usuario {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string

  @Column()
  senha: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Usuario;
