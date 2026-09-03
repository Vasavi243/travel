import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom dev middleware plugin to simulate Vercel serverless /api/gemini route locally
function devApiPlugin() {
  return {
    name: 'dev-api-gemini-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url !== '/api/gemini') {
          return next();
        }

        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 200;
          return res.end();
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end('Method Not Allowed');
        }

        const buffers = [];
        req.on('data', chunk => {
          buffers.push(chunk);
        });

        req.on('end', async () => {
          let body = {};
          try {
            const str = Buffer.concat(buffers).toString('utf8');
            body = JSON.parse(str || '{}');
          } catch {
            body = {};
          }

          req.body = body;
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };

          try {
            const { default: handler } = await import('./api/gemini.js');
            await handler(req, res);
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load environment variables so process.env has GEMINI_API_KEY during dev
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      devApiPlugin()
    ]
  };
})
