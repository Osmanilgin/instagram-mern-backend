import jwt from "jsonwebtoken"

const auth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        let decodedData;
 if(token) {
        decodedData = jwt.verify(token, process.env.TOKEN_SECRET);

        req.userId = decodedData?.id;}
        else res.status(403)

        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth