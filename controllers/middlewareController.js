const jwt  = require("jsonwebtoken");
const midlewareController = {
    verifyToken:(req,res,next) =>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                 return res.status(403).json("Token đã bị hết hạn");
                }
                req.user = user;
                next();
            });
        }
        else{
            return res.status(401).json("Bạn chưa được xác thực");
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        midlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                return res.status(403).json("Bạn không thể xóa người khác");
            }
        });
    },
};
module.exports = midlewareController;