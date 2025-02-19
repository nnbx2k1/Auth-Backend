import { User } from '../db/models/users.js'
import { addUser } from '../services/users.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function authRoutes(app) {
    

    app.post('/register', async (req, res) => {
      const user = req.body;
      try {
        // Check if the user already exists
        const exist = await User.findOne({ username: user.username });
        if (exist) {
          return res.status(400).json({ message: 'Username already taken' });
        }
    
        // Add the new user (ensure `addUser` is implemented properly)
        await addUser(user);
    
        // Generate a JWT token
        const token = jwt.sign(
          {
            username: user.username,
            elo: user.elo,
            matchplayed: user.matchplayed
          },
          process.env.secretKey, // Make sure `process.env.secretKey` is defined
          { expiresIn: '7d' }
        );
    
        // Respond with the token
        res.status(201).json({ token });
      } catch (error) {
        // Log the error and send a response
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
      }
    })   

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        username: user.username,
        elo: user.elo,
        played: user.played
      },
      process.env.secretKey, // Ensure this is defined in your environment
      { expiresIn: '7d' }
    );

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});


}