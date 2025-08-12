import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  const mockCommentsService = {
    getComments: jest.fn(() => [
      { text: 'first comment', videoId: '1', userId: '4' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService, // ✅ mock the service, not the controller
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should return comments', () => {
    const result = controller.getComments(1);
    expect(result).toEqual([
      { text: 'first comment', videoId: '1', userId: '4' },
    ]);
    expect(service.getComments).toHaveBeenCalled();
  });
});
