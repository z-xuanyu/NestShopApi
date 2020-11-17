import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { Member } from '@libs/db/models/member.model';

export class PortalLocalStrategy extends PassportStrategy(
  Strategy,
  'portalLocal',
) {
  constructor(
    @InjectModel(Member) private memberModel: ReturnModelType<typeof Member>,
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    } as IStrategyOptions);
  }
  // 校验用户账号和密码
  async validate(phone: string, password: string):Promise<any> {
    const user = await this.memberModel.findOne({ phone }).select('+password');
    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    return user;
  }
}
