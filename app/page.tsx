"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) return;

    setIsLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to shorten URL');
        return;
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-950 to-black font-sans p-4">
      <main className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">x402 URL Shortener</h1>
          <p className="text-zinc-400">Transform long URLs into short, shareable links</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Shorten your URL</CardTitle>
            <CardDescription>Enter a long URL below to generate a shortened version</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://en.wikipedia.org/wiki/Cryptographic_hash_function"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                className="flex-1"
              />
              <Button onClick={handleShorten} disabled={!url || isLoading}>
                {isLoading ? "Shortening..." : "Shorten"}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {shortUrl && (
              <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Your shortened URL:</div>
                <div className="flex gap-2 items-center">
                  <Input
                    value={shortUrl}
                    readOnly
                    className="flex-1 bg-background"
                  />
                  <Button variant="outline" onClick={copyToClipboard}>
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Create custom short links for your URLs quickly and easily via x402.
          </p>
        </div>
      </main>
    </div>
  );
}
