import User from "../models/user";
import Script from "../models/script";
import { Configuration, OpenAIApi } from "openai";
import slugify from "slugify";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// create youtube script
export const youtubeScript = async (req, res) => {
  try {
    // console.log(req.body);
    const { length, topic, keywords, tone, style } = req.body;
    // validation
    if (!topic) return res.status(400).send("Image description is required");

    // let blogExist = await Blog.findOne({ slug }).exec();
    // if (blogExist) return res.status(400).send("Blog is taken");

    const scriptContentResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube script generator.",
        },
        {
          role: "user",
          content: `Compose a YouTube script on the subject of ${topic}, ensuring it is ${length} words in length. 
          The script should start with an engaging introduction that hooks the viewer and provides a brief overview 
          of what will be discussed. The body of the script should be structured into clear sections that cover the 
          main points of ${topic}. Don't forget to incorporate the following keywords: ${keywords}. The script should 
          maintain a ${tone} tone throughout and use a ${style} style of presentation. Include specific visual and 
          audio cues where necessary. Conclude the script with a summary of the main points, a call to action, and 
          a teaser for the next video. Also, include points in the script where the audience is prompted to engage, 
          such as answering a question or participating in a poll.`,
        },
      ],
      temperature: 0,
    });

    const scriptResult = scriptContentResult.data.choices[0].message.content;

    const titleResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube script generator.",
        },

        {
          role: "user",
          content: `Compose a YouTube script on the subject of ${topic}, ensuring it is ${length} words in length. 
          The script should start with an engaging introduction that hooks the viewer and provides a brief overview 
          of what will be discussed. The body of the script should be structured into clear sections that cover the 
          main points of ${topic}. Don't forget to incorporate the following keywords: ${keywords}. The script should 
          maintain a ${tone} tone throughout and use a ${style} style of presentation. Include specific visual and 
          audio cues where necessary. Conclude the script with a summary of the main points, a call to action, and 
          a teaser for the next video. Also, include points in the script where the audience is prompted to engage, 
          such as answering a question or participating in a poll.`,
        },

        {
          role: "assistant",
          content: scriptResult,
        },
        {
          role: "user",
          content:
            "Generate SEO-friendly youtube video title for the above youtube script",
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data.choices[0].message.content;

    const descriptionResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube prompt generator.",
        },

        {
          role: "user",
          content: `Compose a YouTube script on the subject of ${topic}, ensuring it is ${length} words in length. 
          The script should start with an engaging introduction that hooks the viewer and provides a brief overview 
          of what will be discussed. The body of the script should be structured into clear sections that cover the 
          main points of ${topic}. Don't forget to incorporate the following keywords: ${keywords}. The script should 
          maintain a ${tone} tone throughout and use a ${style} style of presentation. Include specific visual and 
          audio cues where necessary. Conclude the script with a summary of the main points, a call to action, and 
          a teaser for the next video. Also, include points in the script where the audience is prompted to engage, 
          such as answering a question or participating in a poll.`,
        },

        {
          role: "assistant",
          content: scriptResult,
        },
        {
          role: "user",
          content:
            "Generate SEO-friendly youtube video description for the above youtube script",
        },
      ],
      temperature: 0,
    });

    const description = descriptionResult.data.choices[0].message.content;

    console.log("SCRIPT CONTENT: ", scriptResult);
    console.log("TITLE: ", title);
    console.log("DESCRIPTION: ", description);

    // create blog
    const script = new Script({
      length: length || "",
      topic: topic || "",
      keywords: keywords || "",
      tone: tone || "",
      style: style || "",
      //
      title: title || "",
      slug: slugify(title),
      scriptContent: scriptResult || "",
      description: description || "",
      author: req.user._id,
      created: new Date(),
    });
    await script.save();
    // console.log("saved blog", blog);
    res.json(script);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// get one youtube script
export const script = async (req, res) => {
  try {
    const script = await Script.findOne().exec();
    res.json(script);
  } catch (err) {
    console.log(err);
  }
};

// get all youtube scripts
export const scripts = async (req, res) => {
  const scripts = await Script.find({}).exec();
  res.json(scripts);
};
