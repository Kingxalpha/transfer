const express = require('express');
const { makeTransfer, transferStatus, getTransfers } = require('../transferController/transfer');
const router = express.Router()

router.route("/transfer").post(makeTransfer)
router.route("/transfer/:id/status").get(transferStatus)
router.route("/all-transfers").get(getTransfers)



module.exports ={router}