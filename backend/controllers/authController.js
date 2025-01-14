const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { IPL_TEAMS } = require('../config/constants');


// Register Function
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
// Login Method
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = {
      user: {
        id: user.id,
        team: user.team
      }
    };

    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            team: user.team
          } 
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, team } = req.body;

    // Find user and update
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name if provided
    if (name) user.name = name;

    // Update team if provided (ensure it's a valid team)
    if (team) {
      const validTeam = IPL_TEAMS.find(t => t.name === team);
      if (!validTeam) {
        return res.status(400).json({ message: 'Invalid team selection' });
      }
      
      user.team = {
        name: validTeam.name,
        logo: validTeam.logo,
        primaryColor: validTeam.primaryColor,
        secondaryColor: validTeam.secondaryColor
      };
    }

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      team: user.team
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};