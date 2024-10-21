import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from './infrastructure/driven-adapters/hash-adapter';
import { UserMongoDBRepository } from './infrastructure/driven-adapters/mongo-adapter/repository';
import { JwtStrategy } from './infrastructure/driven-adapters/jwt-adapter';
import { DBUseCase } from '@shared/application/db.use-case';
import { UserSchema } from './infrastructure/driven-adapters/mongo-adapter/schema';
import { LoginUseCase } from './application/login.use-case';
import { HashUseCase } from './application/hash.use-case';
import { EnrollmentUseCase } from './application/enrollment.use-case';
import { VerifyTokenUseCase } from './application/verify-token.use-case';
import { EnrollmentController } from './infrastructure/entry-points/controllers/enrollment.controller';
import { LoginController } from './infrastructure/entry-points/controllers/login.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET') || '',
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [
    BcryptAdapter,
    UserMongoDBRepository,
    // JwtStrategy,

    {
      inject: [UserMongoDBRepository],
      provide: JwtStrategy,
      useFactory: (dbAdapter: DBUseCase) => {
        new JwtStrategy(dbAdapter);
      },
    },
    {
      inject: [UserMongoDBRepository],
      provide: JwtStrategy,
      useFactory: (dbAdapter: DBUseCase) => {
        new JwtStrategy(dbAdapter);
      },
    },
    {
      inject: [UserMongoDBRepository, BcryptAdapter, JwtService],
      provide: LoginUseCase,
      useFactory: (
        dbAdapter: DBUseCase,
        hashAdapter: HashUseCase,
        jwtService: JwtService,
      ) => new LoginUseCase(dbAdapter, hashAdapter, jwtService),
    },
    {
      inject: [BcryptAdapter, UserMongoDBRepository],
      provide: EnrollmentUseCase,
      useFactory: (hashAdapter: HashUseCase, dbAdapter: DBUseCase) =>
        new EnrollmentUseCase(hashAdapter, dbAdapter),
    },
    {
      inject: [JwtService],
      provide: VerifyTokenUseCase,
      useFactory: (jwtService: JwtService) =>
        new VerifyTokenUseCase(jwtService),
    },
  ],
  controllers: [EnrollmentController, LoginController],
})
export class AuthModule {}
