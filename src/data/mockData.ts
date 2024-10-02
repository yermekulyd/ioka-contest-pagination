export interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
}));

export default users;
