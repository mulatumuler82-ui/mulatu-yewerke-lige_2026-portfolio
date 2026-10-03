import express from 'express';
import { Resend } from 'resend';
// Import your Mongoose contact model if you have one (uncomment the line below and adjust path if needed)
// import Contact from '../models/ContactModel.js'; 

const router = express.Router();

// Initialize Resend securely using environment variables only
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. SAVE TO DATABASE (If you use a Mongoose model, keep this active)
    /*
    await Contact.create({ name, email, message });
    */

    // 2. SEND THE REAL EMAIL TO YOUR INBOX
    const emailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['mulatumuler82@gmail.com'], // <--- YOUR REAL PERSONAL EMAIL
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Resend Email Response:', emailResponse);

    res.status(200).json({ 
      success: true, 
      message: 'Message saved and email sent successfully!' 
    });

  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ success: false, error: 'Failed to process message.' });
  }
});

exports = router; // or export default router depending on your setup, keep what you had if it was export default router
export default router;