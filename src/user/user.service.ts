import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseAdmin } from 'src/firebase.setup';
import { UserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(private readonly admin: FirebaseAdmin) {}

  async createUser(userRequest: UserDto): Promise<any> {
    const { email, password } = userRequest;
    const app = this.admin.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
      });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
