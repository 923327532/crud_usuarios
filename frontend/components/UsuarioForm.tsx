"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiClient, CreateUsuarioRequest, UpdateUsuarioRequest } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const usuarioSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
});

type UsuarioFormData = z.infer<typeof usuarioSchema>;

interface UsuarioFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario?: {
    id: number;
    nombre: string;
    email: string;
  };
  onSuccess: () => void;
}

export function UsuarioForm({ open, onOpenChange, usuario, onSuccess }: UsuarioFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nombre: usuario?.nombre || "",
      email: usuario?.email || "",
    },
  });

  const onSubmit = async (data: UsuarioFormData) => {
    setIsLoading(true);
    try {
      if (usuario) {
        await apiClient.updateUsuario(usuario.id, data as UpdateUsuarioRequest);
        toast({
          title: "Éxito",
          description: "Usuario actualizado correctamente",
        });
      } else {
        await apiClient.createUsuario(data as CreateUsuarioRequest);
        toast({
          title: "Éxito",
          description: "Usuario creado correctamente",
        });
      }
      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: usuario ? "Error al actualizar usuario" : "Error al crear usuario",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {usuario ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </DialogTitle>
          <DialogDescription>
            {usuario 
              ? "Modifica los datos del usuario seleccionado."
              : "Completa el formulario para crear un nuevo usuario."
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Ingrese el email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {usuario ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
