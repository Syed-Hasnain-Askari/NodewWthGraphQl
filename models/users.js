const mongoose = require('mongoose');
const user = new mongoose.Schema({
	email: String,
	password: String,
});
const UserModal = mongoose.model('users', user);
module.exports = UserModal;
