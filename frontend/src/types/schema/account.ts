import { RoleItem } from "./role";

export interface AccountItem {
    id: String;
    email: String;
    name: String;
    image: String;
    phoneNumber: String;
    address: String;
    status: String;
    provider: String;
    role: RoleItem;
}