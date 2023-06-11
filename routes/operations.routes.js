const express = require("express");
const Operation = require("../models/Operation");
const BankAccount = require("../models/BankAccount");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router.post("/", auth, async (req, res) => {
  try {
    const { account, summa, type } = req.body;
    const newOperation = await Operation.create({ ...req.body });
    const bankAccountUpdateSum = await BankAccount.findById(account);
    if (type === "income") {
      bankAccountUpdateSum.balance += summa;
      const updateBankAccount = await BankAccount.findByIdAndUpdate(
        account,
        bankAccountUpdateSum,
        {
          new: true,
        }
      );
      res.status(201).send({ newOperation, updateBankAccount });
    } else {
      bankAccountUpdateSum.balance -= summa;
      const updateBankAccount = await BankAccount.findByIdAndUpdate(
        account,
        bankAccountUpdateSum,
        {
          new: true,
        }
      );
      res.status(201).send({ newOperation, updateBankAccount });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { equalTo } = req.query;
    const list = await Operation.find({ userId: equalTo });
    const a = list.sort((op1, op2) => op1.createdAt - op2.createdAt);
    res.status(200).send(a);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:operationId", auth, async (req, res) => {
  try {
    const { operationId } = req.params;
    const deletedOperation = await Operation.findById(operationId);
    const updatedAccount = await BankAccount.findById(deletedOperation.account);
    if (deletedOperation.type === "income") {
      updatedAccount.balance -= deletedOperation.summa;
      await BankAccount.findByIdAndUpdate(updatedAccount._id, updatedAccount, {
        new: true,
      });
      await Operation.findByIdAndDelete(operationId);
      res.send(null);
    } else {
      updatedAccount.balance += deletedOperation.summa;
      await BankAccount.findByIdAndUpdate(updatedAccount._id, updatedAccount, {
        new: true,
      });
      await Operation.findByIdAndDelete(operationId);
      res.send(null);
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:operationId", auth, async (req, res) => {
  try {
    const { operationId } = req.params;
    const updatedOperationId = await Operation.findByIdAndUpdate(
      operationId,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updatedOperationId);
  } catch (error) {
    res.status(500).json({
      message:
        "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
