// src/api/chatbot.ts
import axios from 'axios';

const CLOVA_STUDIO_API_URL = 'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-DASH-001';

export const getChatbotResponse = async (goal: string): Promise<string> => {
  const clovaStudioApiKey = process.env.REACT_APP_CLOVA_STUDIO_API_KEY;
  const naverApigwApiKey = process.env.REACT_APP_NAVER_APIGW_API_KEY;

  if (!clovaStudioApiKey || !naverApigwApiKey) {
    console.error('CLOVA Studio API key or NAVER APIGW API key is not set');
    throw new Error('API keys are missing');
  }

  try {
    const response = await axios.post(CLOVA_STUDIO_API_URL, {
      messages: [
        { role: "system", content: "당신은 전문적인 목표 관리 및 일정 계획 도우미입니다." },
        { role: "user", content: goal }
      ],
      topP: 0.8,
      topK: 0,
      maxTokens: 1000,
      temperature: 0.5,
      repeatPenalty: 5.0,
      stopBefore: [],
      includeAiFilters: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-CLOVASTUDIO-API-KEY': clovaStudioApiKey,
        'X-NCP-APIGW-API-KEY': naverApigwApiKey
      }
    });

    console.log('CLOVA Studio API Response:', response.data);

    if (response.data && response.data.result && response.data.result.message && response.data.result.message.content) {
      return response.data.result.message.content;
    } else {
      console.error('Unexpected API response structure:', response.data);
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('CLOVA Studio API error:', error.response?.data || error.message);
      throw new Error(`CLOVA Studio API error: ${error.response?.data?.error?.message || error.message}`);
    } else {
      console.error('Error calling CLOVA Studio API:', error);
      throw new Error('Unknown error occurred while calling CLOVA Studio API');
    }
  }
};