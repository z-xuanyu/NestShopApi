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
import { PortalRegisterDto } from './dto/portalRegister.dto';
import { Member, MemberDocument } from '@libs/db/models/member.model';
import { PortalLoginDto } from './dto/portalLogin.dto';
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
    const { username, password, isSuper, avatarImg, email, status } = dto;
    const user = await this.userModel.create({
      username,
      password,
      isSuper,
      avatarImg,
      email,
      status
    });
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('admin/login')
  @ApiOperation({ summary: '管理登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      code:20000,
      token: this.jwtService.sign(String(user._id)),
      message:'登录成功'
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

  // H5注册
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('portal/register')
  @ApiOperation({ summary: 'H5注册' })
  async portalRegister(@Body() dto: PortalRegisterDto) {
    const {
      phone,
      name,
      password,
      avatarImg,
      gender,
      email
    } = dto;
    const user = await this.memberModel.create({
      phone,
      password,
      name,
      avatarImg,
      gender,
      email
    });

    return user;
  }

  // H5登录
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('portal/login')
  @ApiOperation({ summary: 'H5登录' })
  @UseGuards(AuthGuard('portalLocal'))
  async portalLogin(
    @Body() dto: PortalLoginDto,
    @CurrentUser() user: MemberDocument,
  ) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  // 获取登录会员信息
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('member/info')
  @ApiOperation({ summary: '会员信息' })
  @UseGuards(AuthGuard('portalJwt'))
  @ApiBearerAuth()
  async getMemberInfo(@CurrentUser() user: MemberDocument) {
    return user;
  }
}
