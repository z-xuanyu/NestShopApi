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
      secretOrKey: 'xuanyu',
    } as StrategyOptions);
  }

  async validate(id): Promise<Member> {
    return await this.memberModel.findById(id);
  }
}
