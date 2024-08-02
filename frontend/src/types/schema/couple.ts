import { AccountItem } from "./account";

export interface CoupleItem {
    id: String;
    partnerName1: String;
    partnerName2: String;
    status: String;
    weddingDate: String;
    account: AccountItem;
}