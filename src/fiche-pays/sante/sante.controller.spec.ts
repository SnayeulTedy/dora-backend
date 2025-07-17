import { Test, TestingModule } from '@nestjs/testing';
import { SanteController } from './sante.controller';

describe('SanteController', () => {
  let controller: SanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SanteController],
    }).compile();

    controller = module.get<SanteController>(SanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
