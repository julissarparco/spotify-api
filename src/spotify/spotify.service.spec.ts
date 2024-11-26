import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { Token } from 'src/schemas/token.schema';
import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let service: SpotifyService;

  const mockTokenModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    create: jest.fn(),
  };

  const mockConfigurationService = {
    spotify: jest.fn().mockReturnValue({
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      redirectUri: 'http://localhost:3000/auth/callback',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotifyService,
        {
          provide: ConfigurationService,
          useValue: mockConfigurationService,
        },
        {
          provide: getModelToken(Token.name),
          useValue: mockTokenModel,
        },
      ],
    }).compile();

    service = module.get<SpotifyService>(SpotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
