import express, { Application, Request, Response, NextFunction } from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import quizRoutes from "./routes/quizRoutes"
import quizAttemptRoutes from "./routes/quizAttemptRoutes" 
import topicRoutes from "./routes/topicRoutes"
import recentQuizRoutes from "./routes/recentQuizRoutes"
 
const app: Application = express();

// CORS Configuration 
const corsOptions = {
  origin: "https://quizmastrr.vercel.app",  // "http://localhost:3000", Replace with your frontend URL
  credentials: true, // Allow server to accept cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


// Global CORS Headers Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && corsOptions.origin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! again');
});


// Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1", userRoutes)
app.use("/api/v1", topicRoutes)
app.use("/api/v1/quizzes", quizRoutes); 
app.use("/api/v1", quizAttemptRoutes)
app.use("/api/v1/recent", recentQuizRoutes);


export default app;