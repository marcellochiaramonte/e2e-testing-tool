import dotenv from "dotenv";
import path from "path";
import { credentials, Credentials } from "./credentials";
import { Environment } from "./environment";

export class Configuration {
  constructor(
    private credentials: Credentials,
    private environment: Environment,
    private baseUrl: string
  ) {
    if (!this.credentials.username || !this.credentials.password) {
      throw new Error("Missing required configuration: Username or Password");
    }
  }

  getCredentials(): Credentials {
    return this.credentials;
  }

  getUsername(): string {
    return this.credentials.username;
  }

  getPassword(): string {
    return this.credentials.password;
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

  static getConfiguration(): Configuration {
    return new Configuration(
      credentials.admin,
      Environment.LOCAL,
      "http://localhost:4200"
    );
  }

  loadConfiguration() {
    // currently not used
    // Load .env file
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    const env = process.env.ENVIRONMENT;

    console.log("Environment:", env);

    if (env) {
      switch (env) {
        // case Environment.PROD:
        //   config.environment = Environment.PROD;
        //   break;
        // case Environment.VNV:
        //   config.environment = Environment.VNV;
        //   break;
        case Environment.TEST:
          this.environment = Environment.TEST;
          this.baseUrl = "https://medical-portal-test.hamilton.ch";
          break;
        default:
          this.environment = Environment.LOCAL;
          this.baseUrl = "http://localhost:4200";
          break;
      }
    }
    return this;
  }
}
