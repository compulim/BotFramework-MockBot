import { config } from 'dotenv';

const DEFAULT_CONFIG = {
  ACCESS_CONTROL_ALLOW_ORIGIN: 'http://localhost:3978,https://webchat-mockbot.azurewebsites.net',
  PORT: 3978
};

config();

export default function () {
  const nextEnv: any = {
    ...DEFAULT_CONFIG,
    ...process.env
  };

  process.env = {
    PUBLIC_URL: `http://localhost:${ nextEnv.PORT }/public/`,
    ...nextEnv
  };
}
