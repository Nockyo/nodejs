/*
  Voici la structure d'un document Utilisateur sur lequel vous vous baserez pour faire le Schéma mongoose :

  {
    firstName  // type String, obligatoire
    lastName  // type String, obligatoire
    email  // type String, obligatoire
    password  // type String, obligatoire
  }
  
*/

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: value => {
      if(value === "" || value.length <= 2){
        throw new Error("champ vide ou trop court")
      }
    },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: value => {
      if(value === "" || value.length <= 2){
        throw new Error("champ vide ou trop court")
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: value => {
      if(value === "" || value.length < 4){
        throw new Error("champ vide ou trop court")
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: value => {
      if(value === "" || value.length < 4){
        throw new Error("champ vide ou trop court")
      }
    },
  },
});

const UserModel = model("users", UserSchema);
export default UserModel