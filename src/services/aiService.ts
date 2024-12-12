import axios from 'axios';
import { marked } from 'marked';

interface AiRecipeResponse {
  choices: Array<{
    message?: {
      content?: string;
    };
  }>;
}

class AiRecipeService {
  private apiUrl = `https://api.cloudflare.com/client/v4/accounts/${import.meta.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions`;
  private apiKey = import.meta.env.CLOUDFLARE_AI_API_KEY;
  private model = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

  async generateRecipeRecommendation(preferences: string): Promise<string> {
    try {
      const prompt = `
        作为一个AI厨师助手，使用 Markdown 格式，根据以下用户偏好生成一个详细的菜谱推荐：
        用户偏好：${preferences}

        ## 菜谱详情

        ### 菜品名称

        ### 烹饪难度

        ### 准备时间

        ### 食材清单
        - 

        ### 烹饪步骤
        1. 

        ### 营养价值
      `;

      const response = await axios.post<AiRecipeResponse>(
        this.apiUrl, 
        {
          messages: [
            { role: 'user', content: prompt }
          ],
          stream: false,
          model: this.model,
          temperature: 0.5,
          presence_penalty: 0,
          frequency_penalty: 0,
          top_p: 1
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const fullResponse = response.data.choices
        .map(choice => choice.message?.content || '')
        .filter(content => content.trim() !== '')
        .join('');

      // 将 Markdown 转换为 HTML
      const htmlContent = marked.parse(fullResponse);

      return htmlContent;
    } catch (error) {
      console.error('AI Recipe Generation Error:', error);
      throw new Error('无法生成菜谱推荐');
    }
  }
}

export default new AiRecipeService(); 