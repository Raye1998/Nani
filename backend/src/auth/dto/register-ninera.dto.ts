export class RegisterNineraDto {
  correo: string;
  password: string;

  nombre: string;
  apellido: string;
  telefono: string;
  ubicacion: string;

  fecha_nacimiento?: string | null;
  foto_url?: string | null;

  presentacion?: string | null;
  experiencia?: string | null;
}