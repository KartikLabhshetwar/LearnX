const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");


const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if((!authHeader) || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "invalid token"
        });
    }

    const token = authHeader.split(' ')[1]
    try{

        const decoded = jwt.verify(token, JWT_SECRET)

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }

        else if(decoded.adminId){
            req.adminId = decoded.adminId;
            next()
        }
        
        else{
            return res.status(403).json({
                message: "invalid token."
            })
        }

    } catch(e){
        return res.status(403).send("error")
    }
    

}


module.exports = authMiddleware;