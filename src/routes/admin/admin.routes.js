const express = require('express');
const auth = require('../../middlewares/admin/auth');
const { loginAdmin, logoutAdmin, protectedRoute, registerAdmin } = require('../../controllers/admin/admin.controller');

const router = express.Router();

// Register Admin Route
router.post('/register', registerAdmin);

// Login Route
router.post('/login', loginAdmin);

// Logout Route
router.post('/logout', auth, logoutAdmin);

// Protected Route
router.get('/protected', auth, protectedRoute);

module.exports = router;
