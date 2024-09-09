const fetchTokenFromNaver = async (code: string) => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID || '';
    const clientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET || '';
  
    if (!clientId || !clientSecret) {
      console.error('Missing Naver client credentials');
      return;
    }
  
    try {
      const response = await fetch('https://nid.naver.com/oauth2.0/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };
  