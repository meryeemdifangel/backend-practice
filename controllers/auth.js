const User = require("./../Modals/User")
const crypto = require("crypto");
const ErrorResponse = require("./../utils/errorResponse")
const sendEmail = require("./../utils/sendEmail")
exports.register= async(req,res,next)=>{
const {username,email,password}= req.body

    try{
const user = await User.create({
    username,
    email,
    password,
})
sendToken(user, 201, res);
console.log(user)

    }
    catch(err)
    {
return next(err);  
    }
}

exports.login= async(req,res,next)=>{
  const  {email , password } = req.body
  if(!email || !password)
  {
    return next(new ErrorResponse("please enter your email and your password",400))
  }

    try{
const user = await User.findOne({email}).select("+password")

if(!user) return next(new ErrorResponse("email not found",400))

const isMatched = await user.matchPassword(password)
if(!isMatched) return next(new ErrorResponse("invalid credentials",400))

sendToken(user, 200, res);

    }
    catch(err)
    {
        return next(err);  
    }
    }

exports.forgotpassword=async(req,res,next)=>{
       const {email} = req.body
       try{
const user = await User.findOne({email})
if(!user) next(new ErrorResponse("email could not be sent",404))
const resetToken = user.getResetPasswordToken()
await user.save()

    // Create reset url to email to provided email
const resetPasswordUrl = `http://localhost:3000/passwordreset/${resetToken}`
//html message
const message = `
<h1>You have requested a password reset</h1>
<p>Please make a put request to the following link:</p>
<a href=${resetPasswordUrl} clicktracking=off>${resetPasswordUrl}</a>
`;

try{
    await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    text: message,
  });
  res.status(200).json({ success: true, data: "Email Sent" });
}
catch(err)
{
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorResponse("Email could not be senttt", 500));
}

       }
       catch(err)
       {
        next(err);
       }
  }




  exports.resetpassword=async(req,res,next)=>{
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
    try{
const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire : { $gt : Date.now() }
})
if(!user)
{
    next(new ErrorResponse("invalid token",400))
}
user.password = req.body.password
user.resetPasswordToken = undefined
user.resetPasswordExpire= undefined
await user.save()
res.status(201).json({
    success: true,
    data: "Password Updated Success",
    token: user.getSignedJwtToken(),
  });
    }
    catch(err)
    {
next(err)
    }
    }


    const sendToken = (user, statusCode, res) => {
        const token = user.getSignedJwtToken();
        console.log(token)
        res.status(statusCode).json({ sucess: true, token });
      };