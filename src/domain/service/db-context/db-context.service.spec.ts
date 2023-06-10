import { Test, TestingModule } from '@nestjs/testing';
import { DbContextService } from './db-context.service';

describe('DbContextService', () => {
  let service: DbContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbContextService],
    }).compile();

    service = module.get<DbContextService>(DbContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
