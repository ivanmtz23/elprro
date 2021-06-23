import { Mongo } from '../../lib/mongo';
import { encrypt } from '../../lib/bycript';

export class AuthService {
    constructor(){
        this.collection = 'Account';
        this.mongoService = new Mongo();
    }

    async create(data){
        const  { email, password } = data;
        const response = await this.mongoService.insert(this.collection, {
            email,
            password: encrypt(password),
        });
        return response;
    }

    async getByQuery(query){
        const response = await this.mongoService.get(this.collection,  query);
        return response;
    }
}