import { cachedWhisper } from "./src/whisper";
import fs from "fs/promises";
import { textToBlogPost } from "./src/gpt3";

const audioFilePath = process.argv[2];
const blogTextOutputPath = process.argv[3];

console.log(
  `converting ${audioFilePath} to a blog post and saving to ${blogTextOutputPath}`
);

async function run() {
  const text = await cachedWhisper(audioFilePath);
  console.log(text);
  const blogOutput = await textToBlogPost(text);
  console.log(blogOutput);
  fs.writeFile(blogTextOutputPath, blogOutput.trim());
}

run();
