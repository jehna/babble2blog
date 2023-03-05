import fs from "fs/promises";
import { OPENAI_TOKEN } from "./secrets";

type WhisperResponse =
  | {
      text: string;
    }
  | { error: { message: string; type: string; param: any; code: any } };

/**
 * Whisper API
 *
 * CURL Example:
 * curl --request POST \
 *   --url https://api.openai.com/v1/audio/transcriptions \
 *   --header 'Authorization: Bearer TOKEN' \
 *   --header 'Content-Type: multipart/form-data' \
 *   --form file=@/path/to/file/openai.mp3 \
 * --form model=whisper-1
 */
export async function whisper(audioFilePath: string) {
  const data = await fs.readFile(audioFilePath);
  const form = new FormData();
  form.append("model", "whisper-1");
  form.append("file", new Blob([data], { type: "audio/mpeg" }), "openai.mp3");
  const req = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_TOKEN}`,
    },
    body: form,
  });
  const res: WhisperResponse = await req.json();
  if ("error" in res) {
    throw new Error(res.error.message);
  }
  return res.text;
}
