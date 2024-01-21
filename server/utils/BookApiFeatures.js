

class BookApiFeatures {
    constructor(query, queryStr) {
        this.query = query,
        this.queryStr = queryStr;
    }

    filter() {
        let queryString = JSON.stringify(this.queryStr);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let queryObj = JSON.parse(queryString);

        console.log(queryObj);
    }
}

module.exports=BookApiFeatures;