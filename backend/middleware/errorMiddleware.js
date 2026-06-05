const errorMiddleware = (

  err,
  req,
  res,
  next

) => {





  console.log(err);





  // Default Status Code

  const statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;





  res.status(statusCode).json({

    success: false,

    message:
      err.message ||
      "Internal Server Error"

  });

};




module.exports = errorMiddleware;