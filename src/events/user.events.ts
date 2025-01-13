import * as userRepository from "../repository/user.repository";

export async function createUserEvent(user: { id: number, email: string, password: string, firstName: string,
    lastName: string, phoneNumber: string, role: string }): Promise<void> {
    await userRepository.insertUser(
        user.id, user.email, user.password, user.firstName, user.lastName, user.phoneNumber, user.role
    );
}

export async function updateUserEvent(user: { id: number, email: string, password: string, firstName: string,
    lastName: string, phoneNumber: string, role: string }): Promise<void> {
    await userRepository.updateUser(
        user.id, user.email, user.password, user.firstName, user.lastName, user.phoneNumber, user.role
    );
}

export async function deleteUserEvent(user: { id: number }): Promise<void> {
    await userRepository.deleteUser(user.id);
}