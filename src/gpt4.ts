import { OPENAI_TOKEN } from "./secrets";

interface Gpt4Response {
  id: string;
  object: "text_completion";
  created: number;
  model: string;
  choices: {
    message: {
      role: "user" | "system";
      content: string;
    };
    index: 0;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: 5;
    completion_tokens: 7;
    total_tokens: 12;
  };
}

function makeBlogPostPrompt(spokenInput: string) {
  return [
    {
      role: "system",
      content: `
Write an entertaining blog post from this spoken input. The blog post should have a short, catchy title.

Important! Answer only in Markdown format`.trim(),
    },
    { role: "user", content: spokenInput.trim() },
  ];
}

/**
 * Text to blog post using GPT-4
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
  const req = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_TOKEN}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: makeBlogPostPrompt(spokenInput),
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });
  const res: Gpt4Response = await req.json();
  return res.choices[0].message.content;
}
