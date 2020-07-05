import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PortalLocalStrategy } from './portal.local.strategy';
import { PortalJwtStrategy } from './portal.jwt.strategy';
@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    PortalLocalStrategy,
    PortalJwtStrategy,
  ],
})
export class AuthModule {}
