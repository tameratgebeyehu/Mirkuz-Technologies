export default async function handler(req, res) {
  // Ensure CORS is restricted or handled (Vercel handles same-origin by default)
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const formspreeUrl = process.env.VITE_FORMSPREE_URL;
    if (!formspreeUrl) {
      console.error('Server configuration error: VITE_FORMSPREE_URL environment variable is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send payload to Formspree
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errBody = await response.json().catch(() => ({}));
      console.error('Formspree endpoint error response:', errBody);
      return res.status(response.status).json({ error: 'Failed to submit contact request.' });
    }

  } catch (error) {
    console.error('Serverless function contact handler crashed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
