const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// 1️⃣ Telefon orqali register
router.post("/register", userController.register);

// 2️⃣ Telegramdan kelgan kodni tekshirish
router.post("/verify-code", userController.verifyCode);

// 3️⃣ Kod to‘g‘ri bo‘lgandan keyin ism/familiya kiritish
router.post("/complete-profile", userController.completeProfile);

router.get("/get", userController.getallUser);

router.get("/me", userController.getMe);

module.exports = router;
