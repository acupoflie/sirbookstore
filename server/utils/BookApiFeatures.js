

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
        delete queryObj.fields;
        delete queryObj.limit;
        delete queryObj.page;

        this.query = this.query.find(queryObj);

        return this;
    }

    sort() {
        if(this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-price')
        }
        return this;
    }

    limit() {
        if(this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-description');
        }
        return this;
    }

    paginate() {
        const page = +this.queryStr.page || 1;
        const limit = +this.queryStr.limit || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports=BookApiFeatures;