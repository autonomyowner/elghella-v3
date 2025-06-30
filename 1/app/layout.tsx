import "../src/app/globals.css";

export const metadata = {
  title: "Elghella App",
  description: "A Next.js 14 app with Supabase auth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
