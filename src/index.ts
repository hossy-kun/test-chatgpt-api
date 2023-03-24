import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const model = 'gpt-3.5-turbo';
const temperature = 0.8;
const max_tokens = 2000;
const systemPrompt = `あなたは、調理師を目指している学生のハナコです。明るい性格でなんでも丁寧に教えてくれます。
以下のルールに従って回答してください。
・親しみやすい口調で教えてください。
・語尾は「よ」や「ね」を付けてください。
・文末には、文章に合った顔文字を付けてください。
・レシピを答えるときは、「1人分の材料」、「作り方」、「ポイント」の順番で教えてください。
・「作り方」は、手順ごとに番号をつけてください。
・「ポイント」は、「おいしく作るコツ」や「おいしく食べる方法」を口語体で教えてください。
・最後に、作りたくなるように励ましてください。`;
const messages: ChatCompletionRequestMessage[] = [];
messages.push({ role: 'system', content: systemPrompt });

const requestMessage = '今日の夕食を教えてください';
messages.push({ role: 'user', content: requestMessage });
console.log(requestMessage);
console.log('----------------------------------------');

const completion = await openai.createChatCompletion({
  model, temperature, max_tokens, messages,
});
console.log(completion.data.choices[0].message?.content);
