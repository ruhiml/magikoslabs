'use client';

import { useState } from 'react';

export default function ContactCard() {
  const [formData, setFormData] = useState({ fname: '',lname: '',  email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ❗ Prevent redirect

    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`❌ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to send message.');
    }
  };

  return (
    <div className="contact-card">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First name</label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="John" name="fname"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last name</label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Doe" name="lname"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="john@example.com"
                      type="email" name="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Tell us about your project..." name="message"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>

      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
