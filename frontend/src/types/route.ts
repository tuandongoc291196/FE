export type Role = 'ADMIN' | 'COUPLE' | 'STAFF' | 'SUPPLIER';

export interface User {
    accountId: Number
    token: String
    roleName: Role
    email: String
    status: String
}
