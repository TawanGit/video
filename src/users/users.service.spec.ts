import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    userService = {
      fetchUsers: jest.fn().mockResolvedValue([]),
    } as unknown as jest.Mocked<UsersService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return users', async () => {
    const result = await userService.fetchUsers();
    expect(result).toEqual([]);
  });
});
