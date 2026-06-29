import axios from 'axios'

export const getAIInsight = async (tasks) => {
    const prompt = `
    این لیست تسک‌های من هست:
    ${tasks.map(t => `- ${t.title}: ${t.sessions} سشن`).join('\n')}
    یه تحلیل کوتاه فارسی بده.
    `

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`,
        {
            contents: [{ parts: [{ text: prompt }] }]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': import.meta.env.VITE_GEMINI_KEY
            }
        }
    )
    return response.data.candidates[0].content.parts[0].text
}

/* MODEL -> gemini-1.5-flash

    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,


*/