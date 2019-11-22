const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { email, firstName, lastName, password, isAdmin } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUserId = await this.mongoDB.create(this.collection, {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin)
    });

    return createdUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if(queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }
}

module.exports = UsersService;
