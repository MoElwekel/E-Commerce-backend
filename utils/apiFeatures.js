class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  ///// Filtering /////
  filter() {
    // Create a copy of req.query to use for filtering
    const queryObj = { ...this.queryString };
    // Remove fields that shouldn't be used in filtering
    const excludedFields = ['page', 'limit', 'sort', 'fields','keyword'];
    excludedFields.forEach(field => delete queryObj[field]);
    // Advanced Filtering: replace gt, gte, lt, lte, in with $gt, $gte, $lt, $lte, $in
    const mongoQuery = {};
    Object.keys(queryObj).forEach((key) => {
      const match = key.match(/^(\w+)\[(gte|gt|lte|lt|in)\]$/);
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        if (!mongoQuery[field]) mongoQuery[field] = {};
        mongoQuery[field][operator] = Number.isNaN(Number(queryObj[key])) ? queryObj[key] : +queryObj[key];
      } else {
        mongoQuery[key] = Number.isNaN(Number(queryObj[key])) ? queryObj[key] : +queryObj[key];
      }
    });
    this.mongooseQuery = this.mongooseQuery.find( mongoQuery );
    return this;
  }

  ///// Sorting /////
  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort)
    // price, -sold ==> [price, -sold] ==> price -sold
    const sortBy = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery =  this.mongooseQuery.sort(sortBy); 
    }else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt'); // default sort by createdAt
    }
    return this;
  }

  ////// Limiting Fields //////
  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }else{
        this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  ////// Searching //////
  search(modelName) {
    if (this.queryString.keyword) {
      let query = {}
      
      if (modelName === 'Product') {
        // Use regex for case-insensitive search
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: 'i' } },
          { description: { $regex: this.queryString.keyword, $options: 'i' } }
        ];
      }else {
        query = { name: { $regex: this.queryString.keyword, $options: 'i' } }
      }
      
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }


  ///// Pagination //////
  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 4;
    const skip = (page - 1) * limit //page3 => (3-1)*4 = 8
    const endIndex = page * limit; // 2*4 = 8

    // pagination results
    const pagination = {}
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);
 
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.previous = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}


module.exports = ApiFeatures;





