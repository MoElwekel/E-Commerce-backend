const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')


exports.deleteOne = (Model) => asyncHandler( async (req,res,next)=>{
  const {id} = req.params;
  const document = await Model.findByIdAndDelete(id)
  if(!document){
    next(new ApiError(`no product found for ${id}`,404))
  }else{
    res.status(204).send()
  }
})


exports.updateOne = (Model) => asyncHandler(async(req,res,next)=>{

  const document = await Model.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  )
  
  if(!document){
    next(new ApiError(`no brand found for ${req.params.id}`,404))
  }else{
    res.status(200).json({ data:document })
  }
})

exports.createOne = model => asyncHandler(async(req,res)=>{
  const brand = await model.create(req.body)
  res.status(201).json( { data: brand})
})


exports.getOne = (model) => asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const document = await model.findById(id);
  if(!document){
    // res.status(404).json({msg: `no category found for ${id}`})
    next(new ApiError(`no document found for ${id}`,404))
  }else{
    res.status(200).json({ data:document })
  }
})

exports.getAll = (model, modelName = '') => asyncHandler( async(req,res)=>{
  let filter = {};
  if (req.filterObject) {
    filter = req.filterObject;
  }
  
  // Buld query //
  const countDocuments = await model.countDocuments();
  const apiFeatures = new ApiFeatures(model.find(filter), req.query)
    .paginate(countDocuments)
    .filter()
    .sort()
    .fields()
    .search(modelName)
    
  // Execute query //
  const { mongooseQuery, paginationResult } = apiFeatures;
  const documents = await mongooseQuery;

  res.status(200).json({ results: documents.length, paginationResult ,data: documents });
})
