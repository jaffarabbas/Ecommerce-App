import { User } from "./users";

export interface AccountType {
    id: number;
    name: string;
    acStatus: boolean | null;
    users: User[]; // You need to define the User interface
}