const MongoLib = require('../lib/mongo');

class CoworkingService {
  constructor() {
    this.collection = 'coworking';
    this.mongoDB = new MongoLib();
  }

  async getCoworkingAll() {
    const coworkingList = await this.mongoDB.getAll(this.collection, {});
    return coworkingList || [];
  };

  async getCoworkingById({ cowId }) {
    const cow = await this.mongoDB.get(this.collection, cowId);
    return cow || {};
  }

  async createCow({ cow }) {
    const createdCowId = await this.mongoDB.create(this.collection, cow);
    return createdCowId;
  }

  async updateCow({ cowId, cow } = {}) {
    const updatedCowId = await this.mongoDB.update(this.collection, cowId, cow);
    return updatedCowId;
  }

  async deleteCow({ cowId }) {
    const deletedCowId = await this.mongoDB.delete(this.collection, cowId);
    return deletedCowId;
  }

}

 module.exports = CoworkingService;
