import { User } from '../db/models/users.js'
import { validateUsername, validatePassword } from './validation.js'

export async function addUser(user) {
    try {
        const isUsernameValid = validateUsername(user.username);
        if (!isUsernameValid) {
            throw new Error("Invalid username");
        }

        const isPasswordValid = validatePassword(user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }


        const newUser = new User({
            username: user.username,
            password: user.password
        });

        const savedUser = await newUser.save();
        return { success: true, user: savedUser };
    } catch (error) {
        console.error("Error adding user:", error.message);
        return { success: false, error: error.message };
    }
}