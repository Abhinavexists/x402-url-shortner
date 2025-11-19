# x402 URL Shortener

A payment-gated URL shortener powered by the x402 protocol.

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Abhinavexists/x402-url-shortner.git
cd x402-url-shortner
pnpm install
```

### 2. Set Up Supabase

Create a [Supabase](https://supabase.com) project and run this SQL:

```sql
CREATE TABLE shortened_urls (
  id TEXT PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  clicks INTEGER DEFAULT 0
);
```

### 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Set Up Wallet

- Install [MetaMask](https://metamask.io/)
- Switch to **Base Sepolia** testnet
- Get test tokens from [Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)
- Connect wallet in the app

## How It Works

1. User enters URL and clicks "Shorten URL"
2. MetaMask prompts for wallet connection
3. x402 protocol processes $0.01 payment on Base Sepolia
4. URL is shortened and stored in Supabase
5. User receives shortened link

## Tech Stack

- **x402 Protocol**: Payment-gated API access
- **Next.js 16 + React 19**: Frontend framework
- **Supabase**: PostgreSQL database
- **viem**: Web3 wallet integration
- **Base Sepolia**: Blockchain network

## x402 Configuration

Edit `middleware.ts` to change recipient address or payment amount:

```typescript
export const middleware = paymentMiddleware(
  "0x48413D8ED233F388eDD2240c9A43675DAf26Eb26",  // Your wallet address
  {
    '/api/shorten': {
      price: '$0.01',           // Payment amount
      network: "base-sepolia",  // Network
    },
  },
  { url: 'https://x402.org/facilitator' }
);
```

---

Made with [x402 Protocol](https://x402.org/)
