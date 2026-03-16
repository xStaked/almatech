import Link from "next/link"
import { PawPrint, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  productos: [
    { label: "Silygran-Pro", href: "/productos/silygran-pro" },
    { label: "Nano-Lyptus", href: "/productos/nano-lyptus" },
    { label: "Glucopass", href: "/productos/glucopass" },
    { label: "Todos los productos", href: "/productos" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "/nosotros" },
    { label: "Nuestro Equipo", href: "/equipo" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ],
  afiliados: [
    { label: "Unete Ahora", href: "/afiliados" },
    { label: "Plan de Compensacion", href: "/compensacion" },
    { label: "Historias de Exito", href: "/testimonios" },
    { label: "Recursos", href: "/recursos" },
  ],
  legal: [
    { label: "Terminos y Condiciones", href: "/terminos" },
    { label: "Politica de Privacidad", href: "/privacidad" },
    { label: "Politica de Devoluciones", href: "/devoluciones" },
    { label: "FAQ", href: "/faq" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center">
                <Image
                  src="/logo-cream.png"
                  alt="Almatech"
                  width={200}
                  height={50}
                  className="h-25 w-auto"
                  priority
                />
              </div>
            </Link>

            <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-sm">
              Productos veterinarios con nanotecnologia avanzada.
              Cuidamos a quienes te aman sin condicion.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:info@almatech.co"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@almatech.co
              </a>
              <a
                href="tel:+573001234567"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +57 300 123 4567
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Bogota, Colombia</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Productos</h3>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliates */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Afiliados</h3>
            <ul className="space-y-3">
              {footerLinks.afiliados.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              {new Date().getFullYear()} Almatech. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary-foreground group-hover:text-secondary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
