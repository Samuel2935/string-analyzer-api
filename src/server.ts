
import app from './app.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` String Analyzer API running on port ${PORT}`);
});
