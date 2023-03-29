import { OpenAIApi, Configuration } from "openai";

export async function POST(req: Request) {

  try {
    const body = await req.json()
    let apiKey = process.env.OPENAI_API_KEY;

    const userApiKey = req.headers.get("token");
    if (userApiKey) {
      apiKey = userApiKey;
    }

    const configuration = new Configuration({
      apiKey,
      basePath: process.env.BATH_PATH,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createImage({
      prompt: body.prompt,
      n: 2,
      size: "1024x1024",
    });
    return new Response(JSON.stringify(completion.data));
  } catch (e) {
    console.error("[Chat] ", e);
    return new Response(JSON.stringify(e));
  }
}
