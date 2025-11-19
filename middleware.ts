// export default function middleware() {}; 


import { paymentMiddleware, Network } from 'x402-next';

export const middleware = paymentMiddleware(
  "0x48413D8ED233F388eDD2240c9A43675DAf26Eb26",
  {
    '/dashboard': {
      price: '$0.01',
      network: "base-sepolia",
      config: {
        description: 'Access to protected content'
      }
    },
  }, 
  {url: 'https://x402.org/facilitator'}
);

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard',
  ],
  runtime: 'nodejs',
};