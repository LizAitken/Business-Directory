const db = require('./connect.js');

class Reviews {
    constructor(title, text_review, business_id){
        this.title = title;
        this.text_review = text_review;
        this.business_id = business_id;

    }

    static async getAll() {
        try {
            const response = await db.any(`select * from reviewtb`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getAllReviewsFromId(business_id) {
        try {
            const response = await db.any(`SELECT title, text_review FROM reviewtb WHERE business_id = '${business_id}'`);
            console.log('Response is', response);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async update(title, text_review, business_id) {
        const query = `INSERT INTO reviewtb (title, text_review, business_id) VALUES ('${title}', '${text_review}', '${business_id}')`;

        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log("ERROR", err.message);
            return err;
        };
    }
}

module.exports = Reviews;