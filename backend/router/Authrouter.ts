const express = require('express');

import {  login,AddIcons, signup } from "../controller/Auth"
const router = express.Router();


router.use('/signup',signup);
router.use('/login',login);
router.post('/icons',AddIcons);
// router.use('/show-user',ShowUser);
// router.use('/delete-User',deleteUser);
// router.use('/update-role',UpdateRole);

// router.get("/google", googleAuth);
export default router;
