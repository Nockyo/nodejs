import UserModel from "../Models/User.js";
import encode from "../utils/utils.js";

export function login(req, res) {
    res.render("login");
  }

export const logUser = async (req, res) => {
    try {
        req.session.auth = false;
        const userLogin = await UserModel.findOne(
            {email: req.body.email, password: encode(req.body.password)}
        );

        if(userLogin !== null){
            req.session.auth = true;
            res.redirect('/dashboard');
        } else {
            let message = "Mail et/ou mot de passe incorrect";
            res.render("login", { message });
        }
    } catch (error) {
        let messages = error.errors;
        res.render("login", { messages });
    }
}