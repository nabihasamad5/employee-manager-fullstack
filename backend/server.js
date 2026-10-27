// For local development only (npm run dev). Vercel does not use this file.
const app = require('./app');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
