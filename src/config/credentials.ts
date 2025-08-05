export interface Credentials {
  username: string;
  password: string;
}

export const credentials: Record<string, Credentials> = {
  developer: {
    username: "automate-it_developer",
    password: "automate-it_developer123.",
  },
  admin: {
    username: "automate-it_admin",
    password: "automate-it_admin456.",
  },
};
