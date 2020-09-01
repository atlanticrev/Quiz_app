import Events from './components/base/Events';

const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

/**
 * @type {Object<string, Object>}
 */
const IDBSCHEMA = {
    test: {
        version:      1,
        objectStores: new Map(),
    },
};

IDBSCHEMA.test.objectStores.set("KeyValue", {
    primaryKey:    "key",
    primaryColumn: "code",
    index:         {
        code:   {unique: false},
        userId: {unique: false},
    },
});

class IndexedDB extends Events {

    constructor(name) {
        super();
        this.db = null;
        this.dbName = name;
        this.schema = IDBSCHEMA;
    }

    createDB () {
        if (!window.indexedDB) {
            throw new Error('indexedDB is not supported in this browser');
        }
        if (this.db) {
            return this.db;
        } else {
            this.db = window.indexedDB;
        }
    }

    open () {
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open(this.dbName, this.db.version);
            request.onerror = (e) => {
                // Сделать что-то при ошибке request.errorCode!
                alert("Database error: " + e.target['errorCode']);
            };
            request.onsuccess = (e) => {
                // Выполнить какой-то код если запрос успешный request.result!
                this.db = e.target['result'];
                reject();
            };
            request.onupgradeneeded = (e) => {
                this.db = e.target['result'];
                // Создаем хранилище объектов для этой базы данных
                const objectStore = this.createObjectStore("customers", { keyPath: "ssn" });
                for (const i of customerData) {
                    this.addEntry(objectStore, customerData[i]);
                }
                resolve();
            };
        });
    }

    createObjectStore (name, value) {
        return this.db.createObjectStore(name, value);
    }

    addEntry (objectStore, entry) {
        objectStore.add(entry);
    }

}

const db = new IndexedDB('test');
db.open();