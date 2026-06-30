import axios from 'axios'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { prompt } = req.body

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { 'X-goog-api-key': process.env.VITE_GEMINI_KEY } }
        )

        const data = response.data
        if (!data.candidates) {
            return res.status(500).json({ error: data })
        }

        res.status(200).json({ result: data.candidates[0].content.parts[0].text })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}