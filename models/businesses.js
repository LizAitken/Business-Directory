const db = require('./connect.js');

class Places {
    constructor(id, name, phone, address, type){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.type = type;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from businesstb`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getOne(bus_id) {
        try {
            const response = await db.one(`SELECT id, name, phone, address, type FROM businesstb WHERE businesstb.id = '${bus_id}'`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async update(name, phone, address, type) {
        const query = `INSERT INTO businesstb (name, phone, address, type) VALUES ('${name}', '${phone}', '${address}', '${type}')`;

        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log("ERROR", err.message);
            return err;
        };
    }

}


module.exports = Places;
