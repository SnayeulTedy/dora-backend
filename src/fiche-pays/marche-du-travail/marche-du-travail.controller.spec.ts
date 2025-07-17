import { Test, TestingModule } from '@nestjs/testing';
import { MarcheDuTravailController } from './marche-du-travail.controller';

describe('MarcheDuTravailController', () => {
  let controller: MarcheDuTravailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcheDuTravailController],
    }).compile();

    controller = module.get<MarcheDuTravailController>(MarcheDuTravailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
