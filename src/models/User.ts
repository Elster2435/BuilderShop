import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 64 })
  username: string

  @Column({ unique: true })
  email: string

  @Column({ length: 255 })
  password: string

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
  }
}