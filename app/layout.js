import "./globals.css";

export const metadata = {
  title: "Dharma — Hindu Mythology Guide",
  description: "Explore Hindu mythology, gods, epics, and philosophy with Dharma, your AI guide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Tiro+Devanagari+Sanskrit&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}