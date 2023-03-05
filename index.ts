import { whisper } from "./src/whisper";
import fs from "fs/promises";

const audioFilePath = process.argv[2];
const textOutputPath = process.argv[3];

console.log(
  `converting ${audioFilePath} to text and saving to ${textOutputPath}`
);

async function run() {
  const text = await whisper(audioFilePath);
  fs.writeFile(textOutputPath, text);
  console.log(text);
}

run();
