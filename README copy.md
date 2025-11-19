# x402 URL Shortener

A modern, production-ready URL shortener built with Next.js 16, React 19, TypeScript, Prisma, and PostgreSQL. Transform long URLs into short, shareable links with click tracking.

## Features

- **URL Shortening**: Generate short, unique codes for long URLs
- **Smart Deduplication**: Automatically returns existing short URLs for previously shortened links
- **Click Tracking**: Monitor how many times each shortened URL is accessed
- **Modern UI**: Clean, responsive interface with dark mode design
- **Type-Safe**: Built with TypeScript for enhanced developer experience
- **Database-Backed**: PostgreSQL database with Prisma ORM
- **Production Ready**: Optimized for deployment on Vercel

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI**: [React 19](https://react.dev/) with Server Components
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database (local or hosted)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/x402-url-shortners.git
cd x402-url-shortners
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure your database URL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/x402_url_shortener"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
x402-url-shortners/
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── src/
│   ├── app/
│   │   ├── [shortCode]/
│   │   │   └── page.tsx       # Redirect handler
│   │   ├── api/
│   │   │   └── shorten/
│   │   │       └── route.ts   # URL shortening API
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       └── utils.ts           # Utility functions
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## API Reference

### POST /api/shorten

Shorten a URL or retrieve existing short URL.

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response (Success):**
```json
{
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response (Error):**
```json
{
  "error": "Invalid URL format"
}
```

### GET /[shortCode]

Redirect to the original URL and increment click counter.

**Parameters:**
- `shortCode` - The unique code for the shortened URL

**Response:**
- Redirects to original URL
- Returns 404 if short code not found

## Database Schema

```prisma
model Url {
  id          String   @id @default(cuid())
  originalUrl String
  shortCode   String   @unique
  createdAt   DateTime @default(now())
  clicks      Int      @default(0)
}
```

## Features in Detail

### URL Validation
- Validates URL format before shortening
- Only accepts HTTP and HTTPS protocols
- Returns clear error messages for invalid inputs

### Short Code Generation
- Generates 6-character alphanumeric codes
- Collision detection with automatic retry (up to 10 attempts)
- Case-sensitive for maximum uniqueness

### Click Tracking
- Automatically increments click count on each redirect
- Useful for analytics and monitoring link popularity

### Deduplication
- Checks if URL already exists before creating new entry
- Returns existing short URL to prevent duplicates
- Reduces database bloat and maintains consistency

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
4. Deploy

For detailed Vercel setup instructions, see [VERCEL_SETUP.md](VERCEL_SETUP.md).

### Other Platforms

The application can be deployed to any platform supporting Node.js:
- Railway
- Render
- Fly.io
- Digital Ocean App Platform

Ensure your DATABASE_URL environment variable points to a PostgreSQL database.

## Development

### Running Database Studio

View and edit your database with Prisma Studio:
```bash
npx prisma studio
```

### Creating Migrations

After modifying `schema.prisma`:
```bash
npx prisma migrate dev --name your_migration_name
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and TypeScript
