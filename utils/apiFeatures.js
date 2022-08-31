class APIFeatures {
  // query = req.query
  constructor(model, query) {
    this.model = model;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // filter by post containing specific string
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(regex)\b/g, (match) => `$${match}`);

    this.model = this.model.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(',').join(' ');
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.model = this.model.select(fields);
    } else {
      this.model = this.model.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 50;
    const skip = (page - 1) * limit;

    this.model = this.model.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
