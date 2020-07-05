import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser } from './current-user.decorator';
import { JwtService } from '@nestjs/jwt';
import { Member } from '@libs/db/models/member.model';
@Controller('auth')
@ApiTags('登录')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    @InjectModel(Member) private memberModel: ReturnModelType<typeof Member>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('admin/register')
  @ApiOperation({ summary: '管理员注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const user = await this.userModel.create({
      username,
      password,
      isSuper: false,
    });
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('admin/login')
  @ApiOperation({ summary: '管理登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('admin/info')
  @ApiOperation({ summary: '管理员信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user;
  }
}
