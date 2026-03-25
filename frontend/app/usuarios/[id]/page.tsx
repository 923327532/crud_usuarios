"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { apiClient, Usuario } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { ArrowLeft, Mail, Calendar, User } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function UsuarioDetallePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: usuario,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["usuario", id],
    queryFn: () => apiClient.getUsuario(Number(id)),
    enabled: !!id,
    retry: 3,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Cargando detalles del usuario...</span>
        </div>
      </div>
    );
  }

  if (error || !usuario) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Usuario no encontrado</h1>
          <p className="text-muted-foreground mb-4">
            El usuario que buscas no existe o hubo un error al cargarlo.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la lista
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight">Detalles del Usuario</h1>
        <p className="text-muted-foreground">
          Información completa del usuario seleccionado
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <p className="text-lg font-semibold">#{usuario.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
              <p className="text-lg">{usuario.nombre}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <p className="text-lg">{usuario.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Información del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Fecha de Registro</label>
              <p className="text-lg">
                {new Date(usuario.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hora de Registro</label>
              <p className="text-lg">
                {new Date(usuario.createdAt).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estado</label>
              <div className="mt-1">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Activo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => router.push(`/usuarios`)}
              variant="outline"
            >
              Ver todos los usuarios
            </Button>
            <Button 
              onClick={() => router.push(`/usuarios`)}
            >
              Editar usuario
            </Button>
          </div>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
