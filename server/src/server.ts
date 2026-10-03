import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Resend securely using environment variables only
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact Endpoint (Sends real email to your inbox)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send the real email to your personal inbox
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['mulatumuler82@gmail.com'],
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully to your inbox!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});
// Root route so visiting the backend URL directly doesn't show "Cannot GET /"
app.get('/', (req, res) => {
  res.status(200).json({ status: 'online', message: 'Portfolio Backend API is running successfully!' });
});
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => {
    console.log("Connected to MongoDB Atlas / Local DB");
  })
  .catch((err: unknown) => console.error("Database connection error:", err));

// Only call app.listen when running locally, NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// CRITICAL: Export the app for Vercel's serverless function handler
export default app;