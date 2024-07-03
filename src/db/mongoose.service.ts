// mongoose.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, createConnection, Model } from 'mongoose';

@Injectable()
export class MongooseService {
  private connections: { [key: string]: Connection } = {};

  async switchDatabase(dbname: string): Promise<void> {
    if (!this.connections[dbname]) {
      const uri = `mongodb://localhost:27017/${dbname}`;
      this.connections[dbname] = createConnection(uri, {
      });
    }
    await this.connections[dbname].useDb(dbname);
  }

  getModel(dbname: string, modelName: string): Model<any> {
    if (!this.connections[dbname]) {
      throw new Error(`Database connection '${dbname}' not established.`);
    }
    return this.connections[dbname].model(modelName);
  }
}
