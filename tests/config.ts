import dotenv from "dotenv";
import path from "path";

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

enum Environment {
  PROD = "PROD",
  VNV = "VNV",
  TEST = "TEST",
  LOCAL = "LOCAL",
}

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

interface Credential {
  username: string;
  password: string;
}

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
        config.environment = Environment.TEST;
        config.baseUrl = "https://medical-portal-test.hamilton.ch";
        break;
      default:
        config.environment = Environment.LOCAL;
        config.baseUrl = "http://localhost:4200";
        break;
    }
  }
}

export const config: {
  credentials: Credential;
  environment: Environment;
  baseUrl: string;
} = {
  credentials: credentials.admin,
  environment: Environment.LOCAL,
  baseUrl: "http://localhost:4200",
};

if (!config.credentials.username || !config.credentials.password) {
  throw new Error("Missing required configuration: Username or Password");
}

setConfig();

console.log(`Setting configuration for environment: ${config.environment}`);
console.log(`The baseUrl is: ${config.baseUrl}`);
