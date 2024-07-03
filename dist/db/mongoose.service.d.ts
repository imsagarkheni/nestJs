import { Model } from 'mongoose';
export declare class MongooseService {
    private connections;
    switchDatabase(dbname: string): Promise<void>;
    getModel(dbname: string, modelName: string): Model<any>;
}
