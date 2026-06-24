import jwt from "jsonwebtoken";

export const isLoggedIn = (req,res,next) => {
    const authHeader = req.cookies.token;
    let token;
    if(req.cookies.token){
        token = req.cookies.token
        }else if(authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1];
        }
        if(!token) return res.status(401).send({message:"Please! Login first",error});
        try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       req.user = decoded;
       next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:"Server Error",error})
    }
}

