import type { Metadata } from 'next'
import { Outfit, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { CartSidebar } from '@/components/cart-sidebar'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Almatech - Productos Veterinarios con Nanotecnologia',
  description: 'Productos veterinarios con nanotecnologia avanzada para perros y gatos. Silygran-Pro, Nano-Lyptus y mas. Unete a nuestra comunidad de afiliados.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${sourceSans.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
