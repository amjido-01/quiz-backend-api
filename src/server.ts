import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;


// // Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});