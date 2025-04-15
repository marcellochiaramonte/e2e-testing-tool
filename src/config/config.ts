import dotenv from "dotenv";
import path from "path";

export interface Credentials {
  username: string;
  password: string;
}

export enum Environment {
  PROD = "PROD",
  VNV = "VNV",
  TEST = "TEST",
  LOCAL = "LOCAL",
}

export class Configuration {
  constructor(
    private credentials: Credentials,
    private environment: Environment,
    private baseUrl: string
  ) {}

  getCredentials(): Credentials {
    return this.credentials;
  }

  setCredentials(credentials: Credentials): void {
    this.credentials = credentials;
  }

  getEnvironment(): Environment {
    return this.environment;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const credentials = {
  developer: {
    username: "automate-it_developer",
    password: "automate-it_developer123.",
  },
  admin: {
    username: "automate-it_admin",
    password: "automate-it_admin456.",
  },
};

const appConfig: {
  credentials: Credentials;
  environment: Environment;
  baseUrl: string;
} = {
  credentials: credentials.admin,
  environment: Environment.LOCAL,
  baseUrl: "http://localhost:4200",
};

function setConfig() {
  const env = process.env.ENVIRONMENT;

  if (env) {
    switch (env) {
      // case Environment.PROD:
      //   config.environment = Environment.PROD;
      //   break;
      // case Environment.VNV:
      //   config.environment = Environment.VNV;
      //   break;
      case Environment.TEST:
        appConfig.environment = Environment.TEST;
        appConfig.baseUrl = "https://medical-portal-test.hamilton.ch";
        break;
      default:
        appConfig.environment = Environment.LOCAL;
        appConfig.baseUrl = "http://localhost:4200";
        break;
    }
  }
}

if (!appConfig.credentials.username || !appConfig.credentials.password) {
  throw new Error("Missing required configuration: Username or Password");
}

setConfig();

export const configuration = new Configuration(
  credentials.admin,
  Environment.LOCAL,
  appConfig.baseUrl
);

console.log(configuration);
