import UserModel from '../Models/User.js';
import encode from "../utils/utils.js";
import dotenv from "dotenv";

dotenv.config();

export default function home(req, res) {
  res.render("home");
}

export const createUser = async (req, res) => {
  let message = '';
  try {
    //Vérif mdp et confirm mdp sont identiques
    if(req.body.password === req.body.password_confirm){

      //Vérif que l'utilisateur n'existe pas en bdd
      const users = await UserModel.find({email: req.body.email});
      if(users.length === 0){
        const user =  new UserModel(req.body);
        if(user.password !== '') user.password = encode(req.body.password);
        await user.save();
        res.redirect("/login")
      } else {
        message = "Cet utilisateur existe déjà";
        res.render("home", { message });
      }
    } else {
      message = "Les mdps ne sont pas identiques";
      res.render("home", { message });
    }
  } catch (error) {
    let messages = error.errors;
    res.render("home", { messages });
  }
}
