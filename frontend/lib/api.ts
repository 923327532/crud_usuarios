const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  createdAt: string;
}

export interface CreateUsuarioRequest {
  nombre: string;
  email: string;
}

export interface UpdateUsuarioRequest {
  nombre: string;
  email: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getUsuarios(): Promise<Usuario[]> {
    return this.request<Usuario[]>('/api/usuarios');
  }

  async getUsuario(id: number): Promise<Usuario> {
    return this.request<Usuario>(`/api/usuarios/${id}`);
  }

  async createUsuario(usuario: CreateUsuarioRequest): Promise<Usuario> {
    return this.request<Usuario>('/api/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuario),
    });
  }

  async updateUsuario(id: number, usuario: UpdateUsuarioRequest): Promise<Usuario> {
    return this.request<Usuario>(`/api/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(usuario),
    });
  }

  async deleteUsuario(id: number): Promise<void> {
    await this.request(`/api/usuarios/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
