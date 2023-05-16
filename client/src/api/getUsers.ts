export const getUsers = async()=> {
    try {
        const users = await fetch('https://jsonplaceholder.typicode.com/posts');
        return users.json();
    } catch (error) {
        console.log(error);
    }
}