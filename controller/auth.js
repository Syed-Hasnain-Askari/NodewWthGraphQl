const UserModal = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signUp = async ({ email, password }) => {
	try {
	  const result = await UserModal.findOne({ email });
	  if (result) {
		throw new Error('User already exists');
	  }
	  const hashPassword = await bcrypt.hash(password, 12);
	  const user = new UserModal({
		email: email,
		password: hashPassword,
	  });
	  const savedUser = await user.save();
	  return savedUser;
	} catch (error) {
	  throw error;
	}
  };
  
const login = async (email, password) => {
	try {
		const result = await UserModal.findOne({email:email})
		if (!result) {
			throw new Error("Invalid email or password")
		}
		const isEqual = await bcrypt.compare(password,result.password)
		if(!isEqual){
			throw new Error("Invalid email or password")
		}
		const token = jwt.sign({userId:result._id,email:result.email},'secretkey',{
			expiresIn: '1h',
		});
		return {userId:result._id,token:token,tokenExpiration:1}
	} catch (error) {
		throw new Error(error);
	}
};
module.exports = {
	signUp,
	login
};
