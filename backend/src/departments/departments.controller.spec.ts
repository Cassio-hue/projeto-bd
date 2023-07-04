import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentsController } from './departments.controller';
import { DepartamentsService } from './departments.service';

describe('DepartamentsController', () => {
  let controller: DepartamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentsController],
      providers: [DepartamentsService],
    }).compile();

    controller = module.get<DepartamentsController>(DepartamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
