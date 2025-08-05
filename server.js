const express = require('express')
const dotenv = require ('dotenv')
const morgan = require('morgan')
// eslint-disable-next-line import/no-extraneous-dependencies
const { rateLimit } = require('express-rate-limit')



dotenv.config({path : 'config.env'})

const dbConnection = require('./config/database')
const ApiError = require('./utils/apiError')
const globalError = require('./middlewares/errorMiddleWare')

// Routes
const categoryRoute = require('./routes/categoryRoute')
const subCategoryRoute = require('./routes/subCategoryRoute')
const brandRoute = require('./routes/brandRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
// express app
const app = express();

// connect with db
dbConnection();

 
// middlewares
app.use(express.json({limit:"20kb"}))


if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
  console.log(`mode : ${process.env.NODE_ENV}`)
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: 'Too many requests, please try again later', 
})

// Apply the rate limiting middleware to all requests.
app.use('/api',limiter)


// Mount Routes
app.use('/api/v1/categories',categoryRoute)
app.use('/api/v1/subcategories',subCategoryRoute)
app.use('/api/v1/brands',brandRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/auth',authRoute)

app.all("/{*any}", (req,res,next)=>{
  next(new ApiError(`Can't find this URL: ${req.originalUrl}`,400))
})

// Global error handling middleware for express
app.use(globalError)


const PORT =process.env.PORT || 8000;
const server = app.listen(PORT,()=>{
  console.log(`App running on PORT ${PORT}`)
})

// Global error handling middleware outside express
// Events ==> listen ==> callback(err)
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(()=>{
    console.error(`Shutting down.....`);
    process.exit(1);
  })
  
});
