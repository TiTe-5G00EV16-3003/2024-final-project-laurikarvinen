const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

const users = require('../models/users');
const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required().min(2),
  password: Joi.string().min(5)
});

const signUpUser = async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  const { name, email, password } = req.body;

  try {
    const results = await users.findByEmail(email);
    if (results.length > 0) {
      return res.status(422).json({ message: "Could not create user, user exists" });
    } 
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password_hash: hashedPassword
  }

  try {
    const result = await users.create(newUser);
    if (!result) {
      res.status(500).json({message: "Something went wrong" })
    } 

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    )   
    
    res.status(201).json(
      { 
        id: newUser.id,
        email: newUser.email,
        token
      }
    );
  } catch (error) {
    res.status(500).json({message: "Signup failed, please try again!"});
  }
};

const loginUser = async (req, res) => {
  // TODO: Validation
  
  const { email, password} = req.body;
  
  let identifiedUser;

  try {
    const result = await users.findByEmail(email);
    if(!result[0]) {
      return res.status(401).json({ message: "Could not identify user, credentials might be wrong" });
    }
    identifiedUser = result[0];
  } catch (error) {
    return res.status(500).json({message: "Something went wrong" });
  }

  try {
    // Comparing password with hash
    const valid = await bcrypt.compare(password, identifiedUser.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Could not identify user, credentials might be wrong" });
    }

    // Create and return the token
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    )   
    
    res.status(201).json(
      { 
        id: identifiedUser.id,
        email: identifiedUser.email,
        token
      }
    );

  } catch (error) {
    return res.status(500).json({message: "Something went wrong with user login" });
  }

}

module.exports = {
  loginUser,
  signUpUser
}