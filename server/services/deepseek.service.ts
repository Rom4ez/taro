import fetch from "node-fetch";

interface DeepseekMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface DeepseekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

class DeepseekService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || "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";
    this.apiUrl = "https://openrouter.ai/api/v1/chat/completions";
  }

  async generateTarotInterpretation(
    name: string,
    birthdate: string,
    cards: string
  ): Promise<string> {
    try {
      const messages: DeepseekMessage[] = [
        {
          role: "system",
          content: `Ты - опытный таролог с глубоким пониманием карт Таро и их значений. 
          Твоя задача - создать детальное и персонализированное толкование для ежедневного расклада из трех карт Таро.
          Формат твоего ответа должен содержать: 
          1. ОСНОВНАЯ_ЭНЕРГИЯ: [толкование первой карты как основной энергии дня]
          2. ЧТО_ПОМОЖЕТ: [толкование второй карты как совета, что поможет пользователю сегодня]
          3. ЧЕГО_ИЗБЕГАТЬ: [толкование третьей карты как предостережения, чего следует избегать]
          4. РЕКОМЕНДАЦИИ: [5 конкретных рекомендаций на день, каждая с новой строки, начинающаяся с тире]
          
          Пиши красивым, вдохновляющим и поэтичным русским языком. Используй образные метафоры и мистические отсылки.
          Учитывай имя и дату рождения человека, чтобы сделать толкование более персонализированным.
          Раскрой значение символизма каждой карты, но не будь слишком абстрактным - давай практические советы.`
        },
        {
          role: "user",
          content: `Меня зовут ${name}, я родился(ась) ${birthdate}. 
          Выпали следующие карты таро для ежедневного расклада: ${cards}. 
          Пожалуйста, расскажи, что они означают для меня на сегодня, что мне принесет пользу, 
          а чего стоит избегать. Дай конкретные рекомендации на день.`
        }
      ];

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: messages
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek API error (${response.status}): ${errorText}`);
      }

      const data = await response.json() as DeepseekResponse;
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating tarot interpretation:", error);
      throw new Error("Не удалось сгенерировать толкование карт Таро");
    }
  }
}

export const deepseekService = new DeepseekService();
