### SociWave Backend
This is the backend for the SociWave project. It is a RESTful API built using the REST Framework. It is currently hosted on Railways at [here](https://sociwave-backend.up.railway.app/).

### Installation
1. Clone the repository
2. Install the dependencies using `npm install`
3. You need `.env` file to run the project. Contact the maintainers for the same.
4. Run the project using `npm start`

### Features
1. User authentication
2. User Wallet management
3. Purchase management
4. Email Notifications for purchases
5. Forgot Password feature using email

### Working
1. The user can register and login to the system from the frontend.
2. The user can add money to his wallet using the payment gateway.
3. The user can purchase items from the store using the money in his wallet.
4. User will receive an email notification for every purchase.
5. User's last transction details stored in the database can only be accessed by the admin.
6. Cloud Database is used to store the data.

### Tech Stack
1. Node.js
2. Express.js
3. MongoDB
4. NodeMailer
5. Razorpay
6. Axios
7. JWT
8. Bcrypt
9. Sha256
11. Dotenv
12. Nodemon