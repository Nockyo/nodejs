import UserModel from '../Models/User.js';

export const createUser = async (req, res) => {
    const user =  UserModel(req.body);
    await user.save();
    res.send(user);
}