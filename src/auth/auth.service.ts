import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import getRandom from 'src/utils/getRandom';
import hash from 'src/utils/hash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  /**
   * @param Authorization - Bearer 토큰 [알아서 split 해줌]
   * @returns 
   */
  public extractTokenFromHeader(Authorization: string): string | undefined {
    const [type, token] = Authorization?.split(' ') ?? [''];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * @param uuid - 유저 고유 uuid
   * @returns Repository<UserEntity>
   */
  async findOneByUUID(uuid: string) {
    return await this.usersRepository.findOne({
      where: {
        uuid
      }
    })
  }

  /**
   * @param username - 아이디
   * @returns Repository<UserEntity>
   */
  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username
      }
    })
  }

  /**
   * @param email - 이메일
   * @returns Repository<UserEntity>
   */
  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email
      }
    })
  }

  /**
   * @param data - 이메일 혹은 아이디
   * @returns Repository<UserEntity>
   */
  async findOneByUsernameOrEmail(data: string) {
    return await this.usersRepository.findOne({
      where: [
        { username: data },
        { email: data }
      ]
    })
  }

  /**
   * @param email - 이메일
   * @param username - 아이디
   * @param password - 비밀번호
   */
  async insertUser(email: string, username: string, password: string): Promise<void> {
    const salt = getRandom("all", 32)

    await this.usersRepository.insert({
      email,
      username,
      password: hash(password + salt),
      salt
    })

    return
  }

  /**
   * @param uuid - 유저 uuid
   */
  async createToken(uuid: string) {
    const user = await this.findOneByUUID(uuid);

    if (user === null) throw new UnauthorizedException({ message: '아이디 혹은 비밀번호를 확인해주세요.' })
    const payload = { uuid: user.uuid }

    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  /**
   * @param data - 토큰
   */
  async verifyToken(data: string) {
    const token = this.extractTokenFromHeader(data);
    try {
      if (token === null) throw new Error();
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: this.configService.get("JWT_SECRET") }
      );

      const user = await this.usersRepository.findOne({
        where: {
          uuid: payload.uuid
        }
      })

      if (payload === null || user === null) return null;
      else {
        return { payload }
      }
    } catch (err) {
      return null;
    }
  }
}
