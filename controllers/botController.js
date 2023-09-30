const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.API_KEY
const configuration = new Configuration({
    apiKey
});
const openai = new OpenAIApi(configuration);

class botController {
    static async quotes(req, res) {
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Berikan 1 quotes islam`,
                    },
                ],
                max_tokens: 4000,
                temperature: 0.8,
            });
            const result = completion.data.choices[0].message.content
            res.status(200).json({ result });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}






module.exports = botController