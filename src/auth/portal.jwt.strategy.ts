/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-07-06 14:47:28
 * @Description: Modify here please
 */
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Member } from '@libs/db/models/member.model';

export class PortalJwtStrategy extends PassportStrategy(Strategy, 'portalJwt') {
  constructor(
    @InjectModel(Member) private memberModel: ReturnModelType<typeof Member>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }

  async validate(id:string): Promise<Member> {
    return await this.memberModel.findById(id);
  }
}
