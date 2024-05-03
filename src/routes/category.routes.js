const express = require("express");
const Category = require("../models/Category");
const Operation = require("../models/Operation");
const BankAccount = require("../models/BankAccount");
const router = express.Router({ mergeParams: true });

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await Category.find({
      type: "base",
    });

    const usersCategory = await Category.find({ userId: userId });

    list.push(...usersCategory);

    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.userId) {
      const newCategory = await Category.create(req.body);
      res.status(201).send(newCategory);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const defaultCategory = await Category.findOne({
      name: "Другое",
      type: "base",
    });

    await Operation.updateMany(
      { category: categoryId },
      { $set: { category: defaultCategory._id } }
    );

    await BankAccount.updateMany(
      { category: categoryId },
      { $set: { category: defaultCategory._id } }
    );
    await Category.findByIdAndDelete(categoryId);
    res.send(null);
  } catch (error) {
    res.status(500).json({
      message:
        "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message:
        "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.get("/", (req,res)=>{
  res.status(200).json({message: "hello"})
})

module.exports = router;
