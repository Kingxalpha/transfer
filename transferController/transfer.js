const express = require('express')
const axios = require('axios');


const makeTransfer = async (req, res) => {
    const { fromAccount, toAccount, amount, currency } = req.body;
  
    try {
      const response = await axios.post(PAYMENT_GATEWAY_API_URL, {
        fromAccount,
        toAccount,
        amount,
        currency
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error making transfer:', error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'Failed to make transfer' });
      }
    }
};

const transferStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await axios.get(`${PAYMENT_GATEWAY_API_URL}/${id}/status`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error checking transfer status:', error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'Failed to check transfer status' });
      }
    }
};

const getTransfers = async (req, res) => {
    try {
      const transfers = [
        { id: '1', fromAccount: '12345', toAccount: '67890', amount: 100, currency: 'USD', status: 'completed' },
        { id: '2', fromAccount: '12345', toAccount: '67891', amount: 200, currency: 'USD', status: 'pending' }
      ];
      res.status(200).json(transfers);
    } catch (error) {
      console.error('Error listing transfers:', error);
      res.status(500).json({ error: 'Failed to list transfers' });
    }
  };




module.exports = {
    makeTransfer,
    transferStatus,
    getTransfers
}
  