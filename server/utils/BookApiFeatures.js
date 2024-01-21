

class BookApiFeatures {
    constructor(query, queryStr) {
        this.query = query,
        this.queryStr = queryStr;
    }

    filter () {
        let queryString = JSON.stringify(this.queryStr);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryString);

        delete queryObj.sort;

        this.query = this.query.find(queryObj);

        return this;
    }

    sort() {
        if(this.query.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-price')
        }
        return this;
    }
}

module.exports=BookApiFeatures;