export function createUser(id: number, email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: string) {
    return {
        id: id,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        role: role
    };
}