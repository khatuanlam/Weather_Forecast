import '@/app/ui/global.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId='1022068372555-8sjovk57k2k0847tkkhlb4di8q9cirj9.apps.googleusercontent.com'>
        <body>{children}</body>
      </GoogleOAuthProvider>
    </html>
  );
}
