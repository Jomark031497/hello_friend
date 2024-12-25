import { logger } from "./utils/logger.js";
import { createApp } from "./utils/app.js";

async function main() {
  const app = createApp();
  const PORT = process.env.PORT;

  app.listen(8080, () => {
    logger.info(`server started at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
});
