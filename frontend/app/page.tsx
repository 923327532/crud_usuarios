"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Database, Globe, Settings } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            CRUD Usuarios
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema de gestión de usuarios - TECSUP
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push("/usuarios")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Users className="mr-2 h-5 w-5" />
            Gestionar Usuarios
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Usuarios registrados
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Base de Datos</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">PostgreSQL</div>
              <p className="text-xs text-muted-foreground">
                Spring Boot JPA
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frontend</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Next.js 14</div>
              <p className="text-xs text-muted-foreground">
                React + Tailwind CSS
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Backend</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Spring Boot</div>
              <p className="text-xs text-muted-foreground">
                Java 21 + REST API
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Características Principales</CardTitle>
              <CardDescription>
                Funcionalidades del sistema CRUD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Crear nuevos usuarios
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Listar todos los usuarios
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Editar usuarios existentes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Eliminar usuarios
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Buscar y filtrar usuarios
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tecnologías Utilizadas</CardTitle>
              <CardDescription>
                Stack tecnológico completo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Backend</h4>
                  <ul className="space-y-1">
                    <li>• Java 21</li>
                    <li>• Spring Boot 3.2.5</li>
                    <li>• Spring Data JPA</li>
                    <li>• PostgreSQL</li>
                    <li>• Maven</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <ul className="space-y-1">
                    <li>• Next.js 14</li>
                    <li>• React 18</li>
                    <li>• Tailwind CSS</li>
                    <li>• shadcn/ui</li>
                    <li>• React Query</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
