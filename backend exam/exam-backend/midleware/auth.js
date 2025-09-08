import jwt from 'jsonwebtoken'

function authenticate(req ,res ,next){
    const cookie = req.headers.cookie
    if(cookie){
        const [name,token] = cookie.trim().split("=")
        if(name=='authToken'){
            const decode = jwt.verify(token,process.env.SCERET_KEY)
            req.name = decode.UserName
            req.role = decode.Role
            next()
        }else{
            console.log('unautherised access');
            res.status(404).json({msg : 'unautherised access'})
        }

    }else{
        console.log('cookie not found..');
        res.status(400).json({msg : 'cookie not found..'})
    }
}

export default authenticate









