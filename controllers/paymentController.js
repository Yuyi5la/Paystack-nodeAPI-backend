const axios = require('axios');
const payments = {}; // to store locally, for demo

exports.initiatePayment = async (req, res) => {
  const { customer_name, customer_email, amount } = req.body;

  if (!customer_name || !customer_email || !amount) {
    return res.status(400).json({ status: "error", message: "Missing fields" });
  }

  try {
    // Call Paystack initialize payment endpoint
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: customer_email,
        amount: amount * 100, // Paystack expects kobo (cents)
        metadata: { customer_name }
      },
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      }
    );

    const { authorization_url, reference } = response.data.data;

    // Save payment locally (you should save in DB in real apps)
    payments[reference] = {
      id: reference,
      customer_name,
      customer_email,
      amount,
      status: 'pending',
      authorization_url
    };

    res.status(201).json({
      status: "success",
      message: "Payment initiated",
      payment: payments[reference]
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Payment initiation failed",
      error: error.response ? error.response.data : error.message
    });
  }
};

exports.getPaymentStatus = async (req, res) => {
  const reference = req.params.id;

  if (!payments[reference]) {
    return res.status(404).json({ status: "error", message: "Payment not found" });
  }

  try {
    // Verify payment status with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const status = response.data.data.status; // e.g. 'success' or 'failed'

    // Update local payment status
    payments[reference].status = status;

    res.json({
      status: "success",
      message: "Payment details retrieved successfully",
      payment: payments[reference]
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Could not verify payment",
      error: error.response ? error.response.data : error.message
    });
  }
};
