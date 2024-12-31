const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin Logout
const logoutAdmin = (req, res) => {
    // Logout handled on the frontend by clearing the token
    res.status(200).json({ message: 'Logged out successfully' });
};

// Protected Route Example
const protectedRoute = (req, res) => {
    res.json({ message: 'This is a protected route' });
};

// Register Admin
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create a new admin
        const newAdmin = new Admin({
            email,
            password,
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(newAdmin.password, salt);

        // Save the admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    loginAdmin,
    logoutAdmin,
    protectedRoute,
    registerAdmin,
};
