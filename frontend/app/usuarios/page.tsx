"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { UsuarioTable } from "@/components/UsuarioTable";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

export default function UsuariosPage() {
  const {
    data: usuarios = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["usuarios"],
    queryFn: apiClient.getUsuarios,
    retry: 3,
  });

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error al cargar usuarios</h1>
          <p className="text-muted-foreground mb-4">
            No se pudo conectar con el servidor. Por favor, verifica tu conexión.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          Administra el sistema de usuarios de TECSUP
        </p>
      </div>
      
      <UsuarioTable 
        usuarios={usuarios} 
        isLoading={isLoading} 
        onRefresh={() => refetch()} 
      />
      
      <Toaster />
    </div>
  );
}
