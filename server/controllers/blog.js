import User from "../models/user";
import Blog from "../models/blog";
import { Configuration, OpenAIApi } from "openai";
import slugify from "slugify";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// create blog
export const blog = async (req, res) => {
  try {
    // console.log(req.body);
    const { topic, keywords } = req.body;
    // validation
    if (!topic) return res.status(400).send("Name is required");
    if (!keywords) return res.status(400).send("Keywords are required.");
    // let blogExist = await Blog.findOne({ slug }).exec();
    // if (blogExist) return res.status(400).send("Blog is taken");

    const postContentResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a blog post generator.",
        },
        {
          role: "user",
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
      ],
      temperature: 0,
    });

    const postContent = postContentResult.data.choices[0].message.content;

    const titleResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a blog post generator.",
        },
        {
          role: "user",
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
        {
          role: "assistant",
          content: postContent,
        },
        {
          role: "user",
          content:
            "Generate appropriate title tag text for the above blog post",
        },
      ],
      temperature: 0,
    });

    const metaDescriptionResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a blog post generator.",
        },
        {
          role: "user",
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
        {
          role: "assistant",
          content: postContent,
        },
        {
          role: "user",
          content:
            "Generate SEO-friendly meta description content for the above blog post",
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data.choices[0].message.content;
    const metaDescription =
      metaDescriptionResult.data.choices[0].message.content;

    console.log("POST CONTENT: ", postContent);
    console.log("TITLE: ", title);
    console.log("META DESCRIPTION: ", metaDescription);

    // create blog
    const blog = new Blog({
      postContent: postContent || "",
      title: title || "",
      slug: slugify(title),
      metaDescription: metaDescription || "",
      topic: topic || "",
      keywords: keywords || "",
      author: req.user._id,
      created: new Date(),
    });
    await blog.save();
    // console.log("saved blog", blog);
    res.json(blog);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// read one blog
export const blogOne = async (req, res) => {
  try {
    const blog = await Blog.findOne().exec();
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

// get all blogs
export const blogs = async (req, res) => {
  const all = await Blog.find({}).exec();
  res.json(all);
};
