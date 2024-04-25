const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  
  if (req.method === 'OPTIONS') {
    console.log("OPTIONS METHOD")
    return next();
  };

  try {
    //Convention is BEARER $TOKEN
    const token = req.headers.authorization.split(' ')[1];

    if(!token) {
      throw new Error("Authorization failed")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.id };

    next();

  } catch (error) {
    return res.status(401).json({message: "Authorization failed"})
  }

}

module.exports = verifyToken;