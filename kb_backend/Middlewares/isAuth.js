const jwt = require("jsonwebtoken");

const isAuth = (req,res,next) => {

    const jwtToken = req.headers.authorization;

    if(jwtToken) {
        const decoded = jwt.verify(jwtToken,process.env.SECRETKEY);
        req.user=decoded;
        next();
    }
    else if(req.session.isAuth) {
        next();
    }
    else
    {
        return res.send({
            status:401,
            message:"Session Expired or Unauthorized , Please login again",
        });
    }
}

module.exports = isAuth;