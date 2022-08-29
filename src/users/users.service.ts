import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { encrypte } from 'src/common/encryption';
import { Role } from 'src/common/roles.decorator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './user.entity';

// This should be a real class/interface representing a user entity
// export type User = {
//   username: string;
//   password: string;
//   roles: Role[];
// };

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({username})
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async createUser(user: CreateUserDto) {
    console.log('....user', user);
    
    return this.usersRepository.save({
      ...user,
      password: encrypte(user.password),
    })
  }

  async updateUser(user: UpdateUserDto) {
    const currentUser = await this.findOne(user.username)    
    console.log('.....user',user,currentUser);
    
    if (!currentUser) throw new NotFoundException();
    
    return this.usersRepository.save({
      id: currentUser.id,
      ...user
    })
  }
}