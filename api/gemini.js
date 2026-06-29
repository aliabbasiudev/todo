export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { prompt } = req.body

    const response = await fetch(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': process.env.VITE_GEMINI_KEY
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        }
    )

    const data = await response.json()
    console.log('Gemini response:', JSON.stringify(data))
    
    if (!data.candidates) {
        return res.status(500).json({ error: data })
    }

    res.status(200).json({ result: data.candidates[0].content.parts[0].text })
}