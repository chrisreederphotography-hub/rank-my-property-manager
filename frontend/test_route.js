const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCVsa71BZ7PAXNNUXW06bTt7x6V-g_zDhA");

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    const systemPrompt = "You are a concierge.";
    const history = [{ role: 'user', content: 'hello' }];
    
    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
      systemInstruction: { parts: [{ text: systemPrompt }], role: 'model' }
    });
    
    const result = await chat.sendMessage("anyone in nj?");
    console.log("SUCCESS:", result.response.text());
  } catch (e) {
    console.error("ERROR:", e);
  }
}
run();
