const express = require("express");
const authenticateToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const userController = require("../controllers/user.controller");
const User = require("../models/User");
const userCreateController = require("../controllers/user-create.controller");
const router = express.Router();


/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Missing or invalid token
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("super_admin", "main_admin"),
  userCreateController.createUser
);
router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "fullName", "email", "role", "status"]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: { user }
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users (administrators only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator access required
 */
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a user (administrators only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [super_admin, main_admin, staff, student]
 *                 default: student
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator access required
 *       409:
 *         description: Email already exists
 */

router.get(
  "/",
  authenticateToken,
  authorizeRoles("super_admin", "main_admin"),
  userController.getAllUsers
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID (administrators only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator access required
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("super_admin", "main_admin"),
  userController.getUserById
);

module.exports = router;
