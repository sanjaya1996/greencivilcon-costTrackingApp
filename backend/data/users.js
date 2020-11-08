import bcrypt from 'bcryptjs';

export const USERS = [
  {
    email: 'san@yahoo.com',
    password: bcrypt.hashSync('abcd1234', 10),
  },
  {
    email: 'san1@yahoo.com',
    password: bcrypt.hashSync('abcd1234', 10),
  },
  {
    email: 'sweta@yahoo.com',
    password: bcrypt.hashSync('abcd1234', 10),
  },
];
