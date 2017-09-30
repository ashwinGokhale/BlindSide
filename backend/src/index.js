import express from 'express';

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});

export default app;