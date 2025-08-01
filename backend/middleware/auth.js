import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: 'Not tuthorized, login again' })
  }

  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = token_decoded.id
    next()

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Something went wrong, try loggin in again" })
  }
}

export default authUser