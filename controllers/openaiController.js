const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const generateOutput = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert in education and career counseling.',
        },
        // The input data along with a prompt is sent in the req.body.prompt!
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4o',
      temperature: 0.5,
    });

    const data = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The output could not be generated',
    });
  }
};

module.exports = { generateOutput };
