import User from "../models/user";
import Image from "../models/image";
import { Configuration, OpenAIApi } from "openai";
import slugify from "slugify";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// create image prompt
export const imagePrompt = async (req, res) => {
  try {
    // console.log(req.body);
    const { prompt } = req.body;
    // validation
    if (!prompt) return res.status(400).send("Image description is required");

    // let blogExist = await Blog.findOne({ slug }).exec();
    // if (blogExist) return res.status(400).send("Blog is taken");

    const imagePromptResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a prompt generator for midjourney image generator.",
        },
        {
          role: "user",
          content: `Take on the persona of a expert midjourney image generation. 
          Keep the prompt concise and clear, typically around 1-3 sentences.
          Please take this description an generate a midjourney prompt: ${prompt}.`,
        },
      ],
      temperature: 0,
    });

    const imagePrompt = imagePromptResult.data.choices[0].message.content;

    const titleResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a prompt generator for midjourney image generator.",
        },

        {
          role: "user",
          content: `Take on the persona of a expert midjourney image generation. 
          Keep the prompt concise and clear, typically around 1-3 sentences.
          Please take this description an generate a midjourney prompt: ${prompt}.`,
        },

        {
          role: "assistant",
          content: imagePrompt,
        },
        {
          role: "user",
          content: "Generate appropriate title for the above image prompt",
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data.choices[0].message.content;

    console.log("POST CONTENT: ", imagePrompt);
    console.log("TITLE: ", title);

    // create blog
    const image = new Image({
      prompt: prompt || "",
      title: title || "",
      slug: slugify(title),
      image_prompt: imagePrompt || "",
      author: req.user._id,
      created: new Date(),
    });
    await image.save();
    // console.log("saved blog", blog);
    res.json(image);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//get one image prompt
export const prompt = async (req, res) => {
  try {
    const image = await Image.findOne().exec();
    res.json(image);
  } catch (err) {
    console.log(err);
  }
};

export const prompts = async (req, res) => {
  const images = await Image.find({}).exec();
  res.json(images);
};
