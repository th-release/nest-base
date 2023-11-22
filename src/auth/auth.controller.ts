import { Body, Controller, ForbiddenException, Get, Headers, HttpCode, HttpStatus, InternalServerErrorException, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import SignInRequestDto from './dto/request/SignInRequest.dto';
import { AuthService } from './auth.service';
import SignUpRequestDto from './dto/request/SignUpRequest.dto';
import hash from 'src/utils/hash';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import SignInResponseDto from './dto/response/SignInResponse.dto';
import SuccessResponseDto from '../dto/success.dto';
import { AuthGuard } from './auth.guard';
import MeResponseDto from './dto/response/meResponse.dto';

@Controller('auth')
@ApiTags('유저 API')
export class AuthController {
  constructor(private readonly authService: AuthService) { };

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '로그인이 되면 토큰을 반환' })
  @ApiOkResponse({ description: '로그인 성공', type: SignInResponseDto })
  @HttpCode(HttpStatus.OK)
  async SignIn(@Body() body: SignInRequestDto) {
    const user = await this.authService.findOneByUsernameOrEmail(body.id);

    if (user === null) throw new UnauthorizedException({ success: false, message: '아이디 혹은 비밀번호를 확인해주세요.' });
    else {
      if (user.password === hash(body.password + user.salt)) {
        return this.authService.createToken(user.uuid);
      } else throw new UnauthorizedException({ success: false, message: '아이디 혹은 비밀번호를 확인해주세요.' });
    }
  }

  @Post('/signup')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiCreatedResponse({ description: '회원가입 성공', type: SuccessResponseDto })
  @HttpCode(HttpStatus.CREATED)
  async SignUp(@Body() body: SignUpRequestDto) {
    const email = await this.authService.findOneByEmail(body.email)
    const username = await this.authService.findOneByUsername(body.username)

    if (email)
      throw new UnauthorizedException({
        success: false,
        message: '이미 해당 이메일을 사용 중인 유저가 있습니다.'
      })
    if (username)
      throw new UnauthorizedException({
        success: false,
        message: '이미 해당 아이디를 사용 중인 유저가 있습니다.'
      })

    await this.authService.insertUser(body.email, body.username, body.password);

    return { success: true }
  }

  @Get('/@me')
  @ApiOperation({ summary: '@me', description: '내 정보 가져오기' })
  @ApiOkResponse({ description: '자신의 정보', type: MeResponseDto })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async Me(@Headers("Authorization") token: string) {
    const verify = await this.authService.verifyToken(token);
    if (!verify) throw new UnauthorizedException({ success: false, message: '비 정상적인 토큰 입니다.' })

    const user = await this.authService.findOneByUUID(verify.payload.uuid)
    const format = {
      ...user,
      password: undefined,
      salt: undefined
    }

    return { success: true, user: format }
  }
}
