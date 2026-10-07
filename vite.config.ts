import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        try {
          const parsedUrl = new URL(req.url, 'http://localhost:3000');
          const pathname = parsedUrl.pathname;

          // Polyfill basic Express-like response helpers for serverless handler compatibility
          const resObj = res as any;
          if (!resObj.status) {
            resObj.status = (statusCode: number) => {
              res.statusCode = statusCode;
              return resObj;
            };
          }
          if (!resObj.json) {
            resObj.json = (data: any) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return resObj;
            };
          }

          const reqObj = req as any;
          reqObj.query = Object.fromEntries(parsedUrl.searchParams.entries());

          if (pathname === '/api/health') {
            const healthModule = await import('./api/health.js');
            return await healthModule.default(reqObj, resObj);
          }

          if (pathname === '/api/bus-arrival' || pathname === '/api/busArrival') {
            const busModule = await import('./api/bus-arrival.js');
            return await busModule.default(reqObj, resObj);
          }

          return next();
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal Server Error', message: err?.message }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

