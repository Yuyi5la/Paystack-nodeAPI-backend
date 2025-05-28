const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api/v1/payments', paymentRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
