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

module.exports = {
    loginAdmin,
    logoutAdmin,
    protectedRoute,
};
