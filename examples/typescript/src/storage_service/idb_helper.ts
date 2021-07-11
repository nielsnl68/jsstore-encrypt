import { IDataBase, DATA_TYPE, ITable, Connection } from 'jsstore';
import { encryptPlugin } from "jsstore-encrypt";

const getWorkerPath = () => {
    if (process.env.NODE_ENV === 'development') {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
    }
    else {
        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
    }
};

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.
const workerPath = getWorkerPath().default;

export const idbCon = new Connection(new Worker(workerPath));
export const dbname = 'Demo';

const getDatabase = () => {
    const tblStudent: ITable = {
        name: 'Students',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            gender: {
                dataType: DATA_TYPE.String,
                default: 'male'
            },
            country: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            city: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            secret: {
                dataType: DATA_TYPE.String,
                notNull: true,
                encrypt: true,

                // i won't be able to search anything in encrypted data, so let's turn off index
                enableSearch: false
            }
        }
    };
    const dataBase: IDataBase = {
        name: dbname,
        tables: [tblStudent]
    };
    return dataBase;
};

export const initJsStore = () => {
    const dataBase = getDatabase();
    return Promise.all([
        idbCon.initDb(dataBase),
        idbCon.addPlugin(encryptPlugin, "/static/jsstore-encrypt.js"),
    ]);
};
