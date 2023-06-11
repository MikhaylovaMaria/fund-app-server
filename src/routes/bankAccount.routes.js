const express = require("express");
const router = express.Router({ mergeParams: true });
const BankAccount = require("../models/BankAccount");
const Operation = require("../models/Operation");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
  try {
    const newBankAccount = await BankAccount.create(req.body);
    res.status(201).send(newBankAccount);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { equalTo } = req.query;
    const list = await BankAccount.find({ userId: equalTo });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const deletedAccount = BankAccount.findById(accountId);
    if (deletedAccount.type !== "main") {
      await BankAccount.findByIdAndDelete(accountId);
      await Operation.deleteMany({ account: accountId });
      return res.send(null);
    } else {
      return res.status(400).json({
        error: {
          message: "Невозможно удалить счет",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:accountId", auth, async (req, res) => {
  try {
    const { accountId } = req.params;
    const updatedAccount = await BankAccount.findByIdAndUpdate(
      accountId,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updatedAccount);
  } catch (error) {
    res.status(500).json({
      message:
        "На сервере произошла ошибка с обновление аккаунта. Попробуйте позже",
    });
  }
});

module.exports = router;
