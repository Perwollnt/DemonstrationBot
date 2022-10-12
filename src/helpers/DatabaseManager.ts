// <Imports>
import * as admin from 'firebase-admin';
import { QuickDB } from 'quick.db';

export class DatabaseManager {
    private db!: admin.firestore.Firestore;
    private qdb = new QuickDB();

    constructor() {
        try { admin.initializeApp() } catch (e) {}
        this.db = admin.firestore();
        this.qdb.deleteAll();
    }

    //set data in both databases (path: /path/to/data | data: literally anything)
    async set(path: string, data: any) {
        await this.qdb.set(path, data);
        await this.db.doc(path).set(data, { merge: true })
        return data;
    }

    async setlocal(path: string, data: any) {
        await this.qdb.set(path, data);
        return data;
    }

    //delete data (path: /path/to/data, data: litearlly anything)
    async rem(path: string, data: string) {
        await this.qdb.delete(path);
        await this.db.doc(path).update({
            [data]: admin.firestore.FieldValue.delete()
        })
    }

    //get data from database (if cache good else get from firestore(path: path/to/data, fromServer: straight from firebase)) 
    async get(path: string, fromServer = false) {
        if(fromServer) return await this.getFromServer(path);
        return (await this.getFromCache(path)) || (await this.getFromServer(path));
    }

    //get data from cache
    private async getFromCache(path: string): Promise<any | null> {
        return await this.qdb.get(path) || null;
    }
    
    //get data from firebase
    private async getFromServer(path: string) : Promise<any | null> {
        const doc = await this.db.doc(path).get()
        if(!doc.exists) return null;
        await this.qdb.set(path, doc.data());
        return doc.data();
    }
}