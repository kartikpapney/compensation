module.exports = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  MONGO_URI: `${process.env.MONGO_URI}/${process.env.MONGO_DB}`,
  SCRAP_DELAY_IN_MS: process.env.SCRAP_DELAY_IN_MS,
  SCRAP_TIMING: process.env.SCRAP_TIMING,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PARSE_TOP: parseInt(process.env.PARSE_TOP ?? "0")
};
