//salom
const User = require("../models/user.model");

exports.register  = async(req, res) => {
try {
        const {name, surname, phone, code} = req.body;
    if(!name || !surname || !phone || !code) {
        return res.status(400).json({message: "Iltimos barcha malumotlarni toldiring"});
    }
    const userExists = await User.findOne({phone});
    if(userExists) {
        return res.status(400).json({message: "Bunday foydalanuvchi mavjud"});
    }
    const user = await User.create({name, surname, phone});
    res.status(201).json(user);
} catch (error) {
 res.status(500).json({message: error.message});   
}
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return res.status(500).json({ message: "Server xatosi" });
  }
};