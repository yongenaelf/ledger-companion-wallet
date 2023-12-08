export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Ledger wallet</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
