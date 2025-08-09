import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = {
      signin: jest.fn().mockResolvedValue('fake-token'),
    } as unknown as jest.Mocked<AuthService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return token', async () => {
    const result = await authService.signin({
      username: 'taw',
      password: '123',
    });
    expect(result).toEqual('fake-token');
  });
});
