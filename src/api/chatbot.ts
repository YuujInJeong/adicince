// src/api/chatbot.ts
import axios from 'axios';

const CHATBOT_API_URL = 'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-DASH-001';

export const getChatbotResponse = async (goal: string): Promise<string> => {
  try {
    const response = await axios.post(CHATBOT_API_URL, {
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
        'X-NCP-CLOVASTUDIO-API-KEY': process.env.REACT_APP_CLOVA_STUDIO_API_KEY,
        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_APIGW_API_KEY
      }
    });

    return response.data.result.message.content;
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    throw error;
  }
};