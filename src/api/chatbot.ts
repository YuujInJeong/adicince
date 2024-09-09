// src/api/chatbot.ts
import axios from 'axios';

const CHATBOT_API_URL = 'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-DASH-001';

export const getChatbotResponse = async (goal: string): Promise<string> => {
  try {
    const response = await axios.post(CHATBOT_API_URL, {
      messages: [
        {
          role: "system",
          content: "당신은 전문적인 목표 관리 및 일정 계획 도우미입니다. 다음 목표를 세분화하고, 우선순위를 매기고, 예상 소요 시간을 측정한 후, 일주일 단위의 활동 계획을 작성해주세요.\n\n\n목표: 새로운 프로그래밍 언어 학습하기\n\n\n1. 목표 세분화\n2. 리커트 척도를 활용하여 중요도와 긴급도를 따져 우선순위 설정 (1-5 척도, 1이 가장 중요)\n3. 각 항목별 예상 소요 시간\n4. 일주일 단위 활동 계획(누적)\n\n\n위 형식에 맞춰 상세히 답변해주세요."
        },
        { role: "user", content: goal }
      ],
      topP: 0.8,
      topK: 8,
      maxTokens: 1024,
      temperature: 0.5,
      repeatPenalty: 8.0,
      stopBefore: [],
      includeAiFilters: true,
      seed: 0
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'X-NCP-CLOVASTUDIO-API-KEY': process.env.REACT_APP_CLOVA_STUDIO_API_KEY,
        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_APIGW_API_KEY,
        'X-NCP-CLOVASTUDIO-REQUEST-ID': generateRequestId()
      }
    });

    return response.data.result.message.content;
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    throw error;
  }
};

function generateRequestId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}