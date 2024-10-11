interface User {
    id: number;
    name: string;
    age: number;
}

const users: User[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alexxx', age: 25 },
    { id: 3, name: 'Maria', age: 35 }
];


function filter(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);

        return result.filter((user: User) => user.age > 30);
    };

    return descriptor;
}
class UserService {
    private users: User[];

    constructor(users: User[]) {
        this.users = users;
    }

    @filter
    getUsers() {
        return this.users;
    }
}
const userService = new UserService(users);

console.log(userService.getUsers());

