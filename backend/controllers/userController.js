import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" })

    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error.stack);
    res.json({ success: false, message: 'Unable to login, try later' })
  }
}

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' })
    }

    // validate email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }
    if (password.length < 6) {
      return res.json({ success: false, message: 'Please enter a strong password' })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error.stack)
    res.json({ success: false, message: 'Unable to register, try later' })
  }
}

// adming login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {
    console.log(error.stack)
    res.json({ success: false, message: "Login failed, try again later" })
  }
}

// delete users
const deleteUsers = async (req, res) => {
  try {
    // const deleteUsers = await userModel.deleteMany({})

    res.json({ success: true, message: 'Users were deleted' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Unable to delete" })
  }
}

export { loginUser, registerUser, adminLogin, deleteUsers }