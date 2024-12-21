import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consultório Odontologico Bitar',
  description: 'Criado por Myllena Bitar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
