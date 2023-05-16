import { UserInterface } from "../models/userInterface";

export const getUsers = async():Promise<UserInterface[] | undefined> => {
    try {
        const users = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await users.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}