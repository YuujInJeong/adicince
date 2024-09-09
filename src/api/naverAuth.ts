// src/api/naverAuth.ts
import axios from 'axios';

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';

const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

export const initiateNaverLogin = () => {
  const state = Math.random().toString(36).substr(2, 11);
  localStorage.setItem('naverLoginState', state);
  
  const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;
  window.location.href = authUrl;
};

export const getNaverToken = async (code: string, state: string) => {
  const savedState = localStorage.getItem('naverLoginState');
  if (state !== savedState) {
    throw new Error('Invalid state parameter');
  }

  try {
    const response = await axios.post(NAVER_TOKEN_URL, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        state,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Naver token:', error);
    throw error;
  }
};