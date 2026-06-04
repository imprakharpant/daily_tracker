"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebase_1 = require("../utils/firebase");
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user exists by email query
        const userSnapshot = await firebase_1.db.ref('users').orderByChild('email').equalTo(email).once('value');
        const usersVal = userSnapshot.val();
        if (usersVal) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        const newUserRef = firebase_1.db.ref('users').push();
        const newUser = {
            name,
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
        };
        await newUserRef.set(newUser);
        const userId = newUserRef.key;
        const payload = { userId };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'supersecretkey_change_in_production', { expiresIn: '7d' });
        res.json({ token, user: { id: userId, name: newUser.name, email: newUser.email } });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userSnapshot = await firebase_1.db.ref('users').orderByChild('email').equalTo(email).once('value');
        const usersVal = userSnapshot.val();
        if (!usersVal) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const userId = Object.keys(usersVal)[0];
        const userData = usersVal[userId];
        const isMatch = await bcryptjs_1.default.compare(password, userData.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const payload = { userId };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'supersecretkey_change_in_production', { expiresIn: '7d' });
        res.json({ token, user: { id: userId, name: userData.name, email: userData.email } });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
exports.default = router;
