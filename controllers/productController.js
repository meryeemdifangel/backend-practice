const Product = require("../models/Product");
const Productt = require("../Modals/Product")
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name:"dbmsxeuph",
  api_key:"538162754625643",
  api_secret:"4iv_nicR2-Lcf8Wm0F0SPdZlML8",
})

//const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const image=req.body.image


  let imagesLinks = {};

  
    const result = await cloudinary.v2.uploader.upload(image,{
      folder: "samples",
    })
    console.log(result)

    imagesLinks={ 
      public_id: result.public_id,
      url: result.secure_url,
    };
  

  req.body.image = imagesLinks;
  req.body.user = req.user.id;
console.log(req.body)
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
 // return next(new ErrorHander("Product not found", 404));

  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  console.log(productsCount)

  let apiFeature = new ApiFeatures(Product.find(), req.query)
  .search()
  .filter()

   console.log(apiFeature+"   kakakakaka")
  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

const a = new ApiFeatures(Product.find(), req.query)  
.search()
.filter()
.pagination(resultPerPage);
    products = await a.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});







exports.createProduct1 = catchAsyncErrors(async (req, res, next) => {
  

const images=req.body.images

  console.log(images)

  let imagesLinks = {};

  
    const result = await cloudinary.v2.uploader.upload(images,{
      folder: "samples",
    })
    console.log(result)

    imagesLinks={ 
      public_id: result.public_id,
      url: result.secure_url,
    };
  

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
console.log(req.body)
  const product = await Productt.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


exports.updateProduct1 = catchAsyncErrors(async (req, res, next) => {
  let product = await Productt.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = {};

 

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    
      await cloudinary.v2.uploader.destroy(product.images.public_id);
  

    const imagesLinks = {};

    
      const result = await cloudinary.v2.uploader.upload(images, {
        folder: "productts",
      });

      imagesLinks={
        public_id: result.public_id,
        url: result.secure_url,
      };
  }

    req.body.image = imagesLinks;
  

  product = await Productt.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

