import axios from 'axios'

const MAX_PROMPT_LENGTH = 3000

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { prompt } = req.body


    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt نامعتبره' })
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
        return res.status(400).json({ error: 'Prompt خیلی طولانیه' })
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { 'X-goog-api-key': process.env.GEMINI_API_KEY } }
        )

        const data = response.data
        if (!data.candidates) {
            // جزئیات خام خطای Gemini رو مستقیم به کلاینت برنمی‌گردونیم
            console.error('Gemini API error:', data)
            return res.status(500).json({ error: 'خطا در دریافت پاسخ از AI' })
        }

        res.status(200).json({ result: data.candidates[0].content.parts[0].text })
    } catch (err) {
        console.error('Gemini request failed:', err.message)
        res.status(500).json({ error: 'خطای سرور' })
    }
}