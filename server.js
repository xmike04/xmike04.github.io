require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const helmet = require('helmet');
app.use(helmet());


app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"]
    }
}));

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
                max_tokens: 250,
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
        console.error('Error calling OpenAI API.');

        res.status(500).json({ error: 'Failed to generate response' });
    }
});

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
