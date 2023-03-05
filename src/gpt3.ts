import { OPENAI_TOKEN } from "./secrets";

interface Gpt3Response {
  id: string;
  object: "text_completion";
  created: number;
  model: "text-davinci-003";
  choices: {
    text: string;
    index: 0;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: 5;
    completion_tokens: 7;
    total_tokens: 12;
  };
}

function makeBlogPostPrompt(spokenInput: string) {
  return `
Write an entertaining blog post for a tech blog from this spoken input. The blog post should have:
* A short, catchy title
* Short summary paragraph
* H1 and H2 level headings

Here's the input:
> ${spokenInput.split("\n").join("\n> ")}

Markdown formatted blog post:
`.trim();
}

/**
 * Text to blog post using GPT-3
 *
 * CURL Example:
 * curl https://api.openai.com/v1/completions \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer $OPENAI_API_KEY" \
 *   -d '{
 *   "model": "text-davinci-003",
 *   "prompt": "Write a blog post",
 *   "temperature": 0.7,
 *   "max_tokens": 2000,
 *   "top_p": 1,
 *   "frequency_penalty": 0,
 *   "presence_penalty": 0
 * }'
 */
export async function textToBlogPost(spokenInput: string) {
  const req = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_TOKEN}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: makeBlogPostPrompt(spokenInput),
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });
  const res: Gpt3Response = await req.json();
  return res.choices[0].text;
}
