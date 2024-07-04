const express = require('express');
const { body, param, validationResult } = require('express-validator');
const morgan = require('morgan');



const validateTransfer = [
    body('fromAccount').isString().notEmpty(),
    body('toAccount').isString().notEmpty(),
    body('amount').isFloat({ gt: 0 }),
    body('currency').isString().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];

const validateTransferId = [
    param('id').isString().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];

module.exports = {
    validateTransfer,
    validateTransferId
}