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
    LocalStrategy, // 管理端本地策略
    JwtStrategy,   // 管理端jwt策略
    PortalLocalStrategy, // web端本地策略
    PortalJwtStrategy,  // web端jwt策略
  ],
})
export class AuthModule {}
