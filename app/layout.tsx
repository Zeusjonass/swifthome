import "./globals.css";
import ClientLayout from './ClientLayout';

export const metadata = {
  title: "SwiftHome - Tu asistente inmobiliario inteligente",
  description: "Encuentra la propiedad perfecta con la ayuda de inteligencia artificial",
  keywords: "inmobiliaria, propiedades, AI, inteligencia artificial, casas, departamentos",
  authors: [{ name: "Deux Team" }],
  creator: "Deux",
  publisher: "Deux",
  openGraph: {
    title: "SwiftHome - Tu asistente inmobiliario inteligente",
    description: "Encuentra la propiedad perfecta con la ayuda de inteligencia artificial",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftHome - Tu asistente inmobiliario inteligente",
    description: "Encuentra la propiedad perfecta con la ayuda de inteligencia artificial",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}