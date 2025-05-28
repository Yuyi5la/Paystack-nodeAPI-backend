# Paystack Node API Backend

A simple Node.js backend API to initiate and verify payments using the Paystack payment gateway.

---

## Features

- Initialize payment with customer details and amount
- Verify payment status by reference
- Uses Paystack API with secret key authentication
- Stores payment info locally (for demo purposes — use a database in production)

---

## Technologies Used

- Node.js
- Express.js
- Axios
- dotenv

---

## Getting Started

### Prerequisites

- Node.js installed
- A Paystack account to get your API secret key
- Git (optional for cloning)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Yuyi5la/Paystack-nodeAPI-backend.git
cd Paystack-nodeAPI-backend


2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Paystack secret key:

```env
PORT=3000
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
```

### Running the server

```bash
npm start
```

The server will start on the port specified in your `.env` file (default 3000).

---

## API Endpoints

### 1. Initiate Payment

* **URL:** `/api/v1/payments/initiate`
* **Method:** POST
* **Body Parameters:**

  * `customer_name` (string) — Customer's name
  * `customer_email` (string) — Customer's email
  * `amount` (number) — Amount to pay (in Naira, converted to kobo internally)
* **Response:**
  Returns payment initiation status and payment authorization URL.

### 2. Verify Payment Status

* **URL:** `/api/v1/payments/:id`
* **Method:** GET
* **URL Parameters:**

  * `id` — Payment reference returned from initiation
* **Response:**
  Returns payment status and details.

---

## Testing

You can test the API endpoints with tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

---

## Deployment

You can deploy this app on services like Render, Heroku, or any Node.js compatible platform.

---

## Notes

* This demo stores payment info in memory, which means data will be lost on server restart. Use a proper database for production.
* Always protect your Paystack secret key; never expose it publicly.
* Make sure to handle Paystack webhooks for production use to update payment statuses automatically.

---

## License

MIT License

---

## Author

[Emmy Red](https://github.com/Yuyi5la)

