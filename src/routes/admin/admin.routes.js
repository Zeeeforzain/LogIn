const express = require('express');
const auth = require('../../middlewares/admin/auth');
const { loginAdmin, logoutAdmin, protectedRoute } = require('../../controllers/admin/admin.controller');

const router = express.Router();

// Login Route
router.post('/login', loginAdmin);

// Logout Route
router.post('/logout', auth, logoutAdmin);

// Protected Route
router.get('/protected', auth, protectedRoute);

module.exports = router;
