const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,}$/; 

// regex for min 6 dig pass

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password msust be at least 6 characters'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: 'User registered successfully'
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.cookie("token", generateToken(user._id), {
      httpOnly: true,
      secure: true,
    });

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};



const logoutController = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};





module.exports = {
  registerController,
  loginController,
  getMe,
  logoutController
};