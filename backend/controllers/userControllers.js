import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//Auth User & get token
//POST/api/users/login
//access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//Regitered new user
//POST/api/users
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // 400 means bad reqst
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      //201 means something created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // 400 means bad reqst
    throw new Error("Invalid User data");
  }
});

//GEt user profile
//GET/api/users/profile
//access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});

//UPDATE user profile
//PUT/api/users/profile
//access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    

    res.status(201).json({  //201 means something created
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        token:generateToken(updatedUser._id)
     })

  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});


//GEt all users
//GET/api/users
//access private/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users)
  // console.log(users.length)
});

//DELETE  user
//DELETE/api/users/:id
//access private/admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(user){
   await user.remove()
   res.json({message:'User Removed'})
  }else{
    res.status(404)
    throw new Error('user not found')
  }
  // console.log(users.length)
});

export { authUser, registerUser, getUserProfile,updateUserProfile,getUsers,deleteUser };
