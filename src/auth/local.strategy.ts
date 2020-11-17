import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 校验管理端 用户和密码
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    if (user.status !== 1) {
      throw new BadRequestException('用户已被禁用');
    }
    return user;
  }
}
