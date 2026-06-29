import axios from 'axios'

export const getAIInsight = async (tasks) => {
    const prompt = `
    این لیست تسک‌های من هست:
    ${tasks.map(t => `- ${t.title}: ${t.sessions} سشن`).join('\n')}
    یه تحلیل کوتاه فارسی بده.
    `

    const response = await axios.post('/api/gemini', { prompt })
    return response.data.result
}