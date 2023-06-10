import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbContextService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$on('beforeExit', () => {
      console.log('DB Disconnect');
    });
  }
}
