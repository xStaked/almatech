"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  PawPrint, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  Weight, 
  Heart,
  Gift,
  Star,
  Dog,
  Cat,
  MoreVertical,
  Camera,
  Cake,
  Activity,
  Pill,
  ChevronRight
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock pets data
const initialPets = [
  { 
    id: 1,
    name: "Luna", 
    type: "dog", 
    breed: "Golden Retriever", 
    birthday: "2021-05-15",
    weight: 28,
    gender: "female",
    image: null,
    healthNotes: "Alergia al pollo",
    nextBirthday: "15 May",
    daysUntilBirthday: 60,
    favoriteProducts: ["Silygran-Pro", "Nano-Lyptus"]
  },
  { 
    id: 2,
    name: "Milo", 
    type: "cat", 
    breed: "Siames", 
    birthday: "2022-08-03",
    weight: 4.5,
    gender: "male",
    image: null,
    healthNotes: "",
    nextBirthday: "3 Ago",
    daysUntilBirthday: 140,
    favoriteProducts: ["Glucopass"]
  },
]

const dogBreeds = ["Golden Retriever", "Labrador", "Pastor Aleman", "Bulldog Frances", "Beagle", "Poodle", "Chihuahua", "Husky Siberiano", "Boxer", "Otro"]
const catBreeds = ["Siames", "Persa", "Maine Coon", "Bengal", "Ragdoll", "British Shorthair", "Abisinio", "Criollo", "Otro"]

const recommendedProducts = [
  { name: "Silygran-Pro", description: "Protector hepatico", price: 89900, forPets: ["Luna"] },
  { name: "Nano-Lyptus", description: "Sistema respiratorio", price: 75000, forPets: ["Luna", "Milo"] },
]

export default function PetsPage() {
  const [pets, setPets] = useState(initialPets)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<typeof initialPets[0] | null>(null)
  const [newPet, setNewPet] = useState({
    name: "",
    type: "dog",
    breed: "",
    birthday: "",
    weight: "",
    gender: "male",
    healthNotes: ""
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const calculateAge = (birthday: string) => {
    const birth = new Date(birthday)
    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()
    const months = today.getMonth() - birth.getMonth()
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--
    }
    return years
  }

  const handleAddPet = () => {
    const pet = {
      id: pets.length + 1,
      ...newPet,
      weight: parseFloat(newPet.weight) || 0,
      image: null,
      nextBirthday: new Date(newPet.birthday).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }),
      daysUntilBirthday: 100,
      favoriteProducts: []
    }
    setPets([...pets, pet])
    setNewPet({ name: "", type: "dog", breed: "", birthday: "", weight: "", gender: "male", healthNotes: "" })
    setIsAddDialogOpen(false)
  }

  const PetIcon = ({ type }: { type: string }) => {
    return type === "dog" ? <Dog className="h-6 w-6" /> : <Cat className="h-6 w-6" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Mascotas</h1>
          <p className="text-muted-foreground">Registra a tus peluditos para recibir recomendaciones y regalos especiales</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Mascota
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Mascota</DialogTitle>
              <DialogDescription>
                Registra los datos de tu mascota para recomendaciones personalizadas
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Photo upload */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors border-2 border-dashed border-border">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input 
                    id="name" 
                    value={newPet.name}
                    onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                    placeholder="Ej: Luna"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={newPet.type} onValueChange={(value) => setNewPet({...newPet, type: value, breed: ""})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Perro</SelectItem>
                      <SelectItem value="cat">Gato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Raza</Label>
                  <Select value={newPet.breed} onValueChange={(value) => setNewPet({...newPet, breed: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {(newPet.type === "dog" ? dogBreeds : catBreeds).map((breed) => (
                        <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Genero</Label>
                  <Select value={newPet.gender} onValueChange={(value) => setNewPet({...newPet, gender: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Macho</SelectItem>
                      <SelectItem value="female">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthday">Fecha de Nacimiento</Label>
                  <Input 
                    id="birthday" 
                    type="date"
                    value={newPet.birthday}
                    onChange={(e) => setNewPet({...newPet, birthday: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
                    placeholder="Ej: 5.5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthNotes">Notas de Salud (opcional)</Label>
                <Input 
                  id="healthNotes" 
                  value={newPet.healthNotes}
                  onChange={(e) => setNewPet({...newPet, healthNotes: e.target.value})}
                  placeholder="Alergias, condiciones, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddPet} disabled={!newPet.name || !newPet.breed}>
                Guardar Mascota
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Birthday Alert */}
      {pets.some(pet => pet.daysUntilBirthday <= 30) && (
        <Card className="border-accent bg-gradient-to-r from-accent/10 to-accent/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Cake className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Cumpleanos Proximo</p>
              <p className="text-sm text-muted-foreground">
                El cumpleanos de Luna es en {pets[0].daysUntilBirthday} dias. Recibiras 100 AlmaPuntos de regalo.
              </p>
            </div>
            <Gift className="h-8 w-8 text-accent" />
          </CardContent>
        </Card>
      )}

      {/* Pets Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-2 ${pet.type === 'dog' ? 'bg-secondary' : 'bg-accent'}`} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                    pet.type === 'dog' ? 'bg-secondary/10' : 'bg-accent/10'
                  }`}>
                    {pet.image ? (
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <PetIcon type={pet.type} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{pet.name}</h3>
                    <p className="text-muted-foreground">{pet.breed}</p>
                    <Badge variant="secondary" className="mt-1">
                      {pet.type === 'dog' ? 'Perro' : 'Gato'} - {pet.gender === 'male' ? 'Macho' : 'Hembra'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/30 rounded-xl">
                  <Calendar className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground">{calculateAge(pet.birthday)}</p>
                  <p className="text-xs text-muted-foreground">anos</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-xl">
                  <Weight className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground">{pet.weight}</p>
                  <p className="text-xs text-muted-foreground">kg</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-xl">
                  <Cake className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold text-foreground">{pet.nextBirthday}</p>
                  <p className="text-xs text-muted-foreground">cumple</p>
                </div>
              </div>

              {pet.healthNotes && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl mb-4">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm font-medium">Notas de salud:</span>
                  </div>
                  <p className="text-sm text-yellow-600 mt-1">{pet.healthNotes}</p>
                </div>
              )}

              {pet.favoriteProducts.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Productos favoritos:</p>
                  <div className="flex flex-wrap gap-2">
                    {pet.favoriteProducts.map((product) => (
                      <Badge key={product} variant="outline" className="text-xs">
                        <Pill className="mr-1 h-3 w-3" />
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Pet Card */}
        <Card 
          className="border-2 border-dashed border-border hover:border-accent cursor-pointer transition-all group flex items-center justify-center min-h-[300px]"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <CardContent className="text-center py-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Plus className="h-8 w-8 text-muted-foreground group-hover:text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Agregar otra mascota</h3>
            <p className="text-sm text-muted-foreground">
              Registra a todos tus peluditos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Recomendado para tus mascotas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {recommendedProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <PawPrint className="h-3 w-3 text-accent" />
                      <span className="text-xs text-accent">Para {product.forPets.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/producto/${product.name.toLowerCase().replace(' ', '-')}`}>
                  <Button variant="outline" size="sm">
                    Ver <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
