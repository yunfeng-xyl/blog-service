import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  login(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async addUser(
    username: string,
    password: string,
    salt: string,
    phone?: string,
    email?: string,
  ): Promise<UserEntity> {
    const user = new UserEntity();

    user.username = username;
    user.password = password;
    user.passwordSalt = salt;
    user.phone = phone;
    user.email = email;

    return await this.usersRepository.save(user);
  }
}
