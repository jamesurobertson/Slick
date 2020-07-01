 export default {
    environment: process.env.NODE_ENV || "development",
    backendUrl: process.env.NODE_ENV === 'production' ? `https://slick-slack.herokuapp.com` : 'https://localhost:8080/'
  };
