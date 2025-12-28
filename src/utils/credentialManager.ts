/**
 * Gestor de Credenciales
 * 
 * Sistema seguro para almacenar credenciales OAuth2 y API keys
 * Soporta: Google, OpenAI, Mistral, Groq, Hugging Face
 * 
 * NOTA: En producción, las credenciales deben almacenarse en un servidor seguro
 * con encriptación. Este es un ejemplo básico con localStorage.
 */

interface Credential {
  id: string;
  name: string;
  provider: string;
  type: 'oauth2' | 'api_key' | 'bearer_token';
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  expiresAt?: number;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'workflow_credentials';

export class CredentialManager {
  /**
   * Guardar una credencial
   * @param credential Datos de la credencial a guardar
   */
  static saveCredential(credential: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const credentials = this.getAllCredentials();
      const newCredential: Credential = {
        ...credential,
        id: `${credential.provider}_${Date.now()}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // En producción, encriptar aquí
      credentials.push(newCredential);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));

      return newCredential;
    } catch (error) {
      console.error('Error saving credential:', error);
      throw new Error('No se pudo guardar la credencial');
    }
  }

  /**
   * Obtener una credencial por ID
   */
  static getCredential(id: string): Credential | null {
    try {
      const credentials = this.getAllCredentials();
      return credentials.find((c) => c.id === id) || null;
    } catch (error) {
      console.error('Error getting credential:', error);
      return null;
    }
  }

  /**
   * Obtener todas las credenciales
   */
  static getAllCredentials(): Credential[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting credentials:', error);
      return [];
    }
  }

  /**
   * Obtener credenciales por proveedor
   */
  static getByProvider(provider: string): Credential[] {
    return this.getAllCredentials().filter((c) => c.provider === provider);
  }

  /**
   * Eliminar una credencial
   */
  static deleteCredential(id: string): boolean {
    try {
      const credentials = this.getAllCredentials();
      const filtered = credentials.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting credential:', error);
      return false;
    }
  }

  /**
   * Actualizar una credencial
   */
  static updateCredential(id: string, updates: Partial<Credential>): Credential | null {
    try {
      const credentials = this.getAllCredentials();
      const index = credentials.findIndex((c) => c.id === id);

      if (index === -1) return null;

      credentials[index] = {
        ...credentials[index],
        ...updates,
        updatedAt: Date.now(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
      return credentials[index];
    } catch (error) {
      console.error('Error updating credential:', error);
      return null;
    }
  }

  /**
   * Verificar si hay credenciales expiradas
   */
  static checkExpired(credential: Credential): boolean {
    if (!credential.expiresAt) return false;
    return Date.now() > credential.expiresAt;
  }

  /**
   * Limpiar credenciales expiradas
   */
  static cleanExpired(): void {
    try {
      const credentials = this.getAllCredentials().filter(
        (c) => !this.checkExpired(c)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    } catch (error) {
      console.error('Error cleaning expired credentials:', error);
    }
  }
}

/**
 * Configuración de OAuth2 para diferentes proveedores
 * 
 * NOTA: Los client_id deben estar en variables de entorno
 */
export const OAUTH_CONFIGS = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    scope: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/calendar',
    ],
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest',
      'https://www.googleapis.com/discovery/v1/apis/docs/v1/rest',
    ],
  },
};

/**
 * Configuración de API Keys
 * 
 * Guardar estas en variables de entorno, NO en el código
 */
export const API_KEY_TEMPLATES = {
  openai: {
    name: 'OpenAI API Key',
    placeholder: 'sk-...',
    url: 'https://platform.openai.com/api-keys',
  },
  mistral: {
    name: 'Mistral API Key',
    placeholder: 'mistal-...',
    url: 'https://console.mistral.ai/api-keys/',
  },
  groq: {
    name: 'Groq API Key',
    placeholder: 'gsk_...',
    url: 'https://console.groq.com',
  },
  huggingface: {
    name: 'Hugging Face API Key',
    placeholder: 'hf_...',
    url: 'https://huggingface.co/settings/tokens',
  },
};

export type { Credential };
