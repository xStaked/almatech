"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Save,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Camera
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const userData = {
  firstName: "Carolina",
  lastName: "Martinez",
  email: "carolina@email.com",
  phone: "3001234567",
  avatar: null,
}

const addresses = [
  { 
    id: 1, 
    name: "Casa", 
    address: "Calle 123 #45-67", 
    city: "Bogota", 
    department: "Cundinamarca",
    zipCode: "110111",
    isDefault: true 
  },
  { 
    id: 2, 
    name: "Oficina", 
    address: "Carrera 7 #32-16, Oficina 501", 
    city: "Bogota", 
    department: "Cundinamarca",
    zipCode: "110231",
    isDefault: false 
  },
]

const notificationSettings = {
  orderUpdates: true,
  promotions: true,
  newProducts: false,
  petBirthday: true,
  pointsExpiry: true,
  newsletter: false,
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(userData)
  const [notifications, setNotifications] = useState(notificationSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [savedSection, setSavedSection] = useState<string | null>(null)

  const handleSave = (section: string) => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSavedSection(section)
      setTimeout(() => setSavedSection(null), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
        <p className="text-muted-foreground">Administra tu informacion personal y preferencias</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="addresses">Direcciones</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Informacion Personal
              </CardTitle>
              <CardDescription>
                Actualiza tu informacion de contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{profile.firstName} {profile.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Cambiar foto de perfil
                  </Button>
                </div>
              </div>

              {/* Form */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input 
                    id="firstName" 
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input 
                    id="lastName" 
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electronico</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input 
                    id="phone" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                {savedSection === 'personal' ? (
                  <span className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Cambios guardados
                  </span>
                ) : (
                  <span />
                )}
                <Button onClick={() => handleSave('personal')} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-foreground">Mis Direcciones</h3>
                <p className="text-sm text-muted-foreground">Administra tus direcciones de envio</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Direccion
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <Card key={address.id} className={address.isDefault ? 'ring-2 ring-primary' : ''}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-foreground">{address.name}</span>
                        {address.isDefault && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Principal
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{address.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.department} - {address.zipCode}
                    </p>
                    {!address.isDefault && (
                      <Button variant="link" className="h-auto p-0 mt-2 text-sm">
                        Establecer como principal
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Preferencias de Notificaciones
              </CardTitle>
              <CardDescription>
                Elige que notificaciones quieres recibir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Actualizaciones de pedidos</p>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones sobre el estado de tus pedidos</p>
                  </div>
                  <Switch 
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Promociones y ofertas</p>
                    <p className="text-sm text-muted-foreground">Enterate de descuentos y ofertas especiales</p>
                  </div>
                  <Switch 
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Nuevos productos</p>
                    <p className="text-sm text-muted-foreground">Se el primero en conocer nuestros lanzamientos</p>
                  </div>
                  <Switch 
                    checked={notifications.newProducts}
                    onCheckedChange={(checked) => setNotifications({...notifications, newProducts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Cumpleanos de mascotas</p>
                    <p className="text-sm text-muted-foreground">Recordatorios del cumpleanos de tus peluditos</p>
                  </div>
                  <Switch 
                    checked={notifications.petBirthday}
                    onCheckedChange={(checked) => setNotifications({...notifications, petBirthday: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Puntos por vencer</p>
                    <p className="text-sm text-muted-foreground">Alertas cuando tus puntos esten proximos a vencer</p>
                  </div>
                  <Switch 
                    checked={notifications.pointsExpiry}
                    onCheckedChange={(checked) => setNotifications({...notifications, pointsExpiry: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Consejos de cuidado y novedades del mundo pet</p>
                  </div>
                  <Switch 
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({...notifications, newsletter: checked})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                {savedSection === 'notifications' ? (
                  <span className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Preferencias guardadas
                  </span>
                ) : (
                  <span />
                )}
                <Button onClick={() => handleSave('notifications')}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Preferencias
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Cambiar Contrasena
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contrasena Actual</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva Contrasena</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contrasena</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Actualizar Contrasena</Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Eliminar mi cuenta</p>
                    <p className="text-sm text-muted-foreground">Esta accion es irreversible y eliminara todos tus datos</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Eliminar Cuenta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
