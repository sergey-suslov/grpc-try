import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { IsEmail } from 'class-validator'
import { generateHash, compareHashes } from 'src/utils/crypto'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  @IsEmail()
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false})
  salt: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: boolean;

  static generateFromEmail(email: string, password: string): User {
    const generates = generateHash(password)
    const user = new User()
    user.email = email
    user.password = generates.hash
    user.salt = generates.salt
    return user
  }

  comparePasswords(password: string): boolean {
    return compareHashes(password, this.password, this.salt)
  }
}