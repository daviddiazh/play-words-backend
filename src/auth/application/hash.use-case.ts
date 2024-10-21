import { IHash } from '@auth/domain/auth/interfaces/hash.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashUseCase implements IHash {
  constructor(private readonly hashService: IHash) {}

  async hash(payload: string) {
    return await this.hashService.hash(payload);
  }

  async compare(payload: string, hashedPayload: string) {
    return await this.hashService.compare(payload, hashedPayload);
  }
}
