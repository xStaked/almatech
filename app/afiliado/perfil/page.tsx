"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Bell,
  Shield,
  Camera,
  Save,
  CheckCircle2,
  Award,
  Calendar,
  ExternalLink
} from "lucide-react"

// Mock data
const profileData = {
  name: "Maria Garcia",
  email: "maria.garcia@email.com",
  phone: "+57 315 678 9012",
  document: "1234567890",
  documentType: "CC",
  address: "Calle 123 #45-67, Apto 301",
  city: "Bogota",
  department: "Cundinamarca",
  joinDate: "2024-01-15",
  level: "Oro",
  code: "MARIA2024",
  avatar: null,
  bankInfo: {
    bank: "Bancolombia",
    accountType: "Ahorros",
    accountNumber: "****4523",
    nequi: "315****012",
  },
  notifications: {
    email: true,
    push: true,
    sales: true,
    commissions: true,
    marketing: false,
    newsletter: true,
  }
}

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState(profileData)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu informacion personal y preferencias</p>
        </div>
        <Button onClick={handleSave} className="bg-secondary hover:bg-secondary/90">
          {saved ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Guardado
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-accent">
                <AvatarImage src={formData.avatar || undefined} />
                <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-bold">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge className="bg-accent/20 text-accent border-0">
                  <Award className="h-3 w-3 mr-1" />
                  Nivel {formData.level}
                </Badge>
                <Badge variant="outline">
                  Codigo: {formData.code}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  Desde {formData.joinDate}
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <Button variant="outline" size="sm" asChild>
                <a href={`https://almatech.co/r/${formData.code}`} target="_blank">
                  Ver mi tienda
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="personal">
        <TabsList className="mb-4">
          <TabsTrigger value="personal" className="gap-2">
            <User className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="bank" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Datos Bancarios
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informacion Personal</CardTitle>
              <CardDescription>Actualiza tu informacion de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      className="pl-9" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      className="pl-9" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      className="pl-9" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Documento de identidad</Label>
                  <div className="flex gap-2">
                    <Select value={formData.documentType}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CC">CC</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                        <SelectItem value="NIT">NIT</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      value={formData.document}
                      onChange={(e) => setFormData({...formData, document: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Direccion</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="address">Direccion</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="address" 
                        className="pl-9" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="city" 
                        className="pl-9" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Select value={formData.department}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cundinamarca">Cundinamarca</SelectItem>
                        <SelectItem value="Antioquia">Antioquia</SelectItem>
                        <SelectItem value="Valle del Cauca">Valle del Cauca</SelectItem>
                        <SelectItem value="Atlantico">Atlantico</SelectItem>
                        <SelectItem value="Santander">Santander</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Info */}
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Datos Bancarios</CardTitle>
              <CardDescription>Configura como recibiras tus pagos de comisiones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Banco</Label>
                  <Select defaultValue={formData.bankInfo.bank}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bancolombia">Bancolombia</SelectItem>
                      <SelectItem value="Davivienda">Davivienda</SelectItem>
                      <SelectItem value="BBVA">BBVA</SelectItem>
                      <SelectItem value="Banco de Bogota">Banco de Bogota</SelectItem>
                      <SelectItem value="Nequi">Nequi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de cuenta</Label>
                  <Select defaultValue={formData.bankInfo.accountType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ahorros">Ahorros</SelectItem>
                      <SelectItem value="Corriente">Corriente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Numero de cuenta</Label>
                  <Input id="accountNumber" placeholder="Ingresa tu numero de cuenta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nequi">Nequi (opcional)</Label>
                  <Input id="nequi" placeholder="Numero de Nequi" />
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Importante:</strong> La cuenta bancaria debe estar a tu nombre. Los pagos se procesan los dias 1 y 15 de cada mes para saldos mayores a $100.000 COP.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura como quieres recibir alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Notificaciones por email</p>
                    <p className="text-sm text-muted-foreground">Recibe alertas importantes en tu correo</p>
                  </div>
                  <Switch checked={formData.notifications.email} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Notificaciones push</p>
                    <p className="text-sm text-muted-foreground">Alertas en tiempo real en el navegador</p>
                  </div>
                  <Switch checked={formData.notifications.push} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Nuevas ventas</p>
                    <p className="text-sm text-muted-foreground">Notificacion cuando se registre una venta</p>
                  </div>
                  <Switch checked={formData.notifications.sales} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Comisiones pagadas</p>
                    <p className="text-sm text-muted-foreground">Cuando se procese un pago a tu cuenta</p>
                  </div>
                  <Switch checked={formData.notifications.commissions} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Novedades y promociones</p>
                    <p className="text-sm text-muted-foreground">Nuevos productos y campanas de marketing</p>
                  </div>
                  <Switch checked={formData.notifications.marketing} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Newsletter semanal</p>
                    <p className="text-sm text-muted-foreground">Resumen de tu actividad y tips de ventas</p>
                  </div>
                  <Switch checked={formData.notifications.newsletter} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Protege tu cuenta y gestiona el acceso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Cambiar contrasena</p>
                      <p className="text-sm text-muted-foreground">Ultima actualizacion hace 3 meses</p>
                    </div>
                    <Button variant="outline">Cambiar</Button>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Autenticacion de dos factores</p>
                      <p className="text-sm text-muted-foreground">Anade una capa extra de seguridad</p>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-200">No activo</Badge>
                  </div>
                  <Button variant="outline" size="sm">Activar 2FA</Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Sesiones activas</p>
                      <p className="text-sm text-muted-foreground">Gestiona los dispositivos conectados</p>
                    </div>
                    <Badge>2 dispositivos</Badge>
                  </div>
                  <Button variant="outline" size="sm">Ver sesiones</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
