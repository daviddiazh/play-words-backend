import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  apply(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false };
    }
  }
}
