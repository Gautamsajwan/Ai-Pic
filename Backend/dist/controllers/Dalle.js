import OpenAI from 'openai';
import 'dotenv/config';
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API,
});
const generateImageController = async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });
        const image = response.data[0].b64_json;
        res.status(200).json({
            success: true,
            photo: image,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};
export { generateImageController };
//# sourceMappingURL=Dalle.js.map