import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fname, lname, email, message } = req.body;

  const handleSubmit = (e) => {
		e.preventDefault();
			resetForm();
	};

  try {
    const data = await resend.emails.send({
      from: 'ruhi@magikoslabs.com',
      to: ['ruhi@magikoslabs.com', 'hardik@magikoslabs.com'], // your work email
      subject: `New contact form submission from ${fname}  ${lname}`,
      html: `
        <h2>New Message from ${fname}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }


}
