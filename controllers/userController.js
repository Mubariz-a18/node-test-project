const Users = require('../models/User.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userController = {

    registertUser: async (req, res) => {
        try {
            const {
                user_name,
                user_email,
                user_password,
                user_image,
                total_orders
            } = req.body;
            const hashedPassword = await bcrypt.hash(user_password, +process.env.SALT);
            const newUser = await Users.create({
                user_name,
                user_email,
                user_password: hashedPassword,
                user_image,
                total_orders,
            });
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: error.message });
        }
    },
    insertUser: async (req, res) => {
        try {
            const {
                user_name,
                user_email,
                user_password,
                user_image,
                total_orders
            } = req.body;
            const hashedPassword = await bcrypt.hash(user_password, 10);
            const newUser = await Users.create({
                user_name,
                user_email,
                user_password: hashedPassword,
                user_image,
                total_orders,
            });
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: error.message });
        }
    },
    getUserDetails: async (req, res) => {
        const { user_id } = req.params;

        try {
            const user = await Users.findOne({ user_id });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        const { user_id } = req.params;
        const updatedDetails = req.body;

        try {
            const user = await Users.findByPk(user_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.update(updatedDetails);

            return res.json({ message: 'User details updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    deleteUser: async (req, res) => {
        const { user_id } = req.params;

        try {
            const user = await Users.findByPk(user_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.destroy();

            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    getUserImage: async (req, res) => {
        const { user_id } = req.params;

        try {
            const user = await Users.findByPk(user_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (!user.user_image) {
                return res.status(404).json({ error: 'User image not found' });
            }


            return res.json({ imageUrl: user.user_image });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        const { user_email, user_password } = req.body;

        try {
            const user = await Users.findOne({
                where: { user_email },
            });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(user_password, user.user_password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);

            return res.json({ token });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};

module.exports = userController;
