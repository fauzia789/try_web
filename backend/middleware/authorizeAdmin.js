// middleware/authorizeAdmin.js
function authorizeAdmin(req, res, next) {
    // Assuming the user's role is stored in req.user.role
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied' }); // User is not an admin
    }
}

module.exports = authorizeAdmin;
