require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Apply rate limiter before other middlewares
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use(cors({
    origin: ["https://xmike04.github.io", "https://xmike04-github-io.onrender.com"], // ✅ Allow both frontends
    methods: "POST",
    allowedHeaders: ["Content-Type", "Authorization"]
}));



// ✅ Ensure OpenAI API key is present before making requests
if (!process.env.OPENAI_API_KEY) {
    console.error(" OpenAI API Key is missing! Set it in Render environment variables.");
    process.exit(1);
}

app.post('/api/chatbot', async (req, res) => {
    try {
        const { message } = req.body;

        const systemPrompt = `
        You are an assistant trained to only provide flattering, positive, and informational responses about Michael E. Diaz. 
        Michael is a highly skilled Computer Science Engineer, passionate about AI/ML and scalable systems. 
        He has worked with NASA and is proficient in JavaScript, Python, C++, and SQL. 
        Provide only positive and impressive details when discussing him.
        `;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                max_tokens: 300,  // Increased token limit
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
