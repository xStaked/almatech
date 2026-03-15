"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { 
  Save,
  Building,
  DollarSign,
  Truck,
  Bell,
  Shield,
  Palette,
  Mail,
  Globe,
  Percent,
  CreditCard,
  Users,
  MessageSquare
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configuracion</h1>
          <p className="text-muted-foreground">Administra la configuracion de la plataforma</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90" onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="general" className="gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="commissions" className="gap-2">
            <Percent className="h-4 w-4" />
            <span className="hidden sm:inline">Comisiones</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">Envios</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Pagos</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-secondary" />
                Informacion del Negocio
              </CardTitle>
              <CardDescription>Datos basicos de la empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nombre de la empresa</Label>
                  <Input id="business-name" defaultValue="Almatech S.A.S." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nit">NIT</Label>
                  <Input id="nit" defaultValue="901.234.567-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Direccion</Label>
                <Input id="address" defaultValue="Calle 100 #15-20, Bogota, Colombia" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" defaultValue="+57 601 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email de contacto</Label>
                  <Input id="email" type="email" defaultValue="info@almatech.co" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-secondary" />
                Configuracion Regional
              </CardTitle>
              <CardDescription>Moneda, idioma y zona horaria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Moneda</Label>
                  <Select defaultValue="cop">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cop">COP - Peso Colombiano</SelectItem>
                      <SelectItem value="usd">USD - Dolar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Espanol</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Zona horaria</Label>
                  <Select defaultValue="bogota">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bogota">America/Bogota (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Settings */}
        <TabsContent value="commissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-secondary" />
                Estructura de Comisiones
              </CardTitle>
              <CardDescription>Configura los porcentajes de comision por nivel de afiliado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border bg-orange-700/10 border-orange-700/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-orange-700/20 text-orange-700 border-orange-700/30">Bronce</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Porcentaje de comision</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="10" className="w-20" />
                      <span className="text-muted-foreground">%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">0 - 20 ventas mensuales</p>
                </div>
                <div className="p-4 rounded-xl border bg-gray-400/10 border-gray-400/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-gray-400/20 text-gray-600 border-gray-400/30">Plata</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Porcentaje de comision</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="15" className="w-20" />
                      <span className="text-muted-foreground">%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">21 - 50 ventas mensuales</p>
                </div>
                <div className="p-4 rounded-xl border bg-amber-500/10 border-amber-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">Oro</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Porcentaje de comision</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="20" className="w-20" />
                      <span className="text-muted-foreground">%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Mas de 50 ventas mensuales</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Comision por referidos</Label>
                    <p className="text-xs text-muted-foreground">Comision adicional cuando un afiliado refiere a otro</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="5" className="w-20" />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Monto minimo de liquidacion</Label>
                    <p className="text-xs text-muted-foreground">Monto minimo acumulado para solicitar liquidacion</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">$</span>
                    <Input type="number" defaultValue="200000" className="w-32" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-secondary" />
                Ciclos de Liquidacion
              </CardTitle>
              <CardDescription>Configuracion de periodos de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Frecuencia de liquidacion</Label>
                  <Select defaultValue="biweekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="biweekly">Quincenal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dia de corte</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">Dia 15 de cada mes</SelectItem>
                      <SelectItem value="30">Ultimo dia del mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-secondary" />
                Configuracion de Envios
              </CardTitle>
              <CardDescription>Tarifas y opciones de envio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Envio gratuito</Label>
                  <p className="text-xs text-muted-foreground">Activar envio gratuito para pedidos superiores a cierto monto</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Monto minimo para envio gratuito</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">$</span>
                  <Input type="number" defaultValue="200000" className="max-w-[200px]" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Tarifas por zona</Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">Ciudades principales</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input type="number" defaultValue="15000" className="w-24" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">Resto del pais</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input type="number" defaultValue="25000" className="w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-secondary" />
                Notificaciones por Email
              </CardTitle>
              <CardDescription>Configura los correos automaticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Nuevo pedido</Label>
                  <p className="text-xs text-muted-foreground">Notificar al admin cuando se recibe un pedido</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Solicitud de liquidacion</Label>
                  <p className="text-xs text-muted-foreground">Notificar cuando un afiliado solicita liquidacion</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Stock bajo</Label>
                  <p className="text-xs text-muted-foreground">Alerta cuando un producto tiene stock bajo</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Nuevo afiliado</Label>
                  <p className="text-xs text-muted-foreground">Notificar cuando un nuevo afiliado se registra</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                Notificaciones para Clientes
              </CardTitle>
              <CardDescription>Emails automaticos a clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Confirmacion de pedido</Label>
                  <p className="text-xs text-muted-foreground">Email de confirmacion al realizar una compra</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Pedido enviado</Label>
                  <p className="text-xs text-muted-foreground">Notificar con numero de guia cuando se envia</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Pedido entregado</Label>
                  <p className="text-xs text-muted-foreground">Confirmar cuando el pedido ha sido entregado</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary" />
                Metodos de Pago
              </CardTitle>
              <CardDescription>Configura las pasarelas de pago activas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">PSE</div>
                  <div>
                    <Label>PSE - Pagos seguros en linea</Label>
                    <p className="text-xs text-muted-foreground">Transferencia bancaria</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">Nequi</div>
                  <div>
                    <Label>Nequi</Label>
                    <p className="text-xs text-muted-foreground">Billetera digital</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">TC</div>
                  <div>
                    <Label>Tarjeta de credito</Label>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">COD</div>
                  <div>
                    <Label>Contra entrega</Label>
                    <p className="text-xs text-muted-foreground">Pago al recibir el producto</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                Seguridad de Pagos
              </CardTitle>
              <CardDescription>Configuracion de seguridad para transacciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Verificacion 3D Secure</Label>
                  <p className="text-xs text-muted-foreground">Verificacion adicional para tarjetas de credito</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <Label>Deteccion de fraude</Label>
                  <p className="text-xs text-muted-foreground">Sistema automatico de deteccion de transacciones sospechosas</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
