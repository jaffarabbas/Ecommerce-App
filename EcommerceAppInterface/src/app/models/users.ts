import { AccountType } from "./accountType";

export interface User {
    uid: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    acid: number;
    uStatus: boolean;
    createdAt: Date;
    ac: AccountType | null; // You need to define the AccountType interface
}
  