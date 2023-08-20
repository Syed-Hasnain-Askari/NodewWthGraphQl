const UserModal = require('../models/users');
const signUp = async ({ email, password }) => {
	try {
		const result = await UserModal.findOne({ email });
		if (result) {
			throw new Error('User already exists');
		}
		const response = new UserModal({
			email: email,
			password: password,
		});
		return response.save();
	} catch (error) {
		throw error;
	}
};
module.exports = {
	signUp,
};
