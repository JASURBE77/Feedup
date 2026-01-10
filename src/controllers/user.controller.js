const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Telefon raqam majburiy" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone });
    }

    return res.status(200).json({
      message: "Telegram bot orqali kod oling",
      phone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.verifyCode = async (req, res) => {
  try {
    const { phone, code } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.code !== code) {
      return res.status(400).json({ message: "Kod noto‘g‘ri" });
    }

    user.code = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Tasdiqlandi ✅",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.completeProfile = async (req, res) => {
  try {
    const { phone, name, surname } = req.body;

    const user = await User.findOne({ phone });

    if (!user || !user.isVerified) {
      return res.status(403).json({ message: "Tasdiqlanmagan" });
    }

    user.name = name;
    user.surname = surname;
    await user.save();

    res.status(200).json({ message: "Profil to‘ldirildi", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getallUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({ message: "Profil to‘ldirildi", user })
  } catch (error) {
    
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({ message: "Profil to‘ldirildi", user })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}