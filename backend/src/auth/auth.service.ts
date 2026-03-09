import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';
import { RegisterNineraDto } from './dto/register-ninera.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async login(dto: LoginDto) {
    const supabase = this.supabaseService.getPublicClient();
    const admin = this.supabaseService.getAdminClient();

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: dto.correo,
        password: dto.password,
      });

    if (authError || !authData.user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const authUserId = authData.user.id;

    const { data: usuario, error: usuarioError } = await admin
      .from('usuario')
      .select('id, auth_id, correo, rol, fecha_registro')
      .eq('auth_id', authUserId)
      .single();

    if (usuarioError) {
      throw new UnauthorizedException(
        'El usuario autenticado no existe en la tabla usuario',
      );
    }

    return {
      message: 'Login exitoso',
      session: authData.session,
      user: usuario,
    };
  }

  async registerNinera(dto: RegisterNineraDto) {
    const admin = this.supabaseService.getAdminClient();

    // 1. Crear usuario en Supabase Auth
    const { data: authCreated, error: authError } =
      await admin.auth.admin.createUser({
        email: dto.correo,
        password: dto.password,
        email_confirm: true,
      });

    if (authError || !authCreated.user) {
      throw new BadRequestException(
        authError?.message || 'No se pudo crear el usuario en Auth',
      );
    }

    const authUserId = authCreated.user.id;

    // 2. Crear registro en tabla usuario
    const { data: usuario, error: usuarioError } = await admin
      .from('usuario')
      .insert({
        auth_id: authUserId,
        correo: dto.correo,
        rol: 'ninera',
      })
      .select()
      .single();

    if (usuarioError || !usuario) {
      throw new BadRequestException(
        usuarioError?.message || 'No se pudo crear el usuario en tabla usuario',
      );
    }

    // 3. Crear registro en persona
    const { data: persona, error: personaError } = await admin
      .from('persona')
      .insert({
        nombre: dto.nombre,
        apellido: dto.apellido,
        telefono: dto.telefono,
        ubicacion: dto.ubicacion,
        fecha_nacimiento: dto.fecha_nacimiento || null,
        foto_url: dto.foto_url || null,
      })
      .select()
      .single();

    if (personaError || !persona) {
      throw new BadRequestException(
        personaError?.message || 'No se pudo crear la persona',
      );
    }

    // 4. Crear registro en ninera
    const { data: ninera, error: nineraError } = await admin
      .from('ninera')
      .insert({
        persona_id: persona.id,
        usuario_id: usuario.id,
        presentacion: dto.presentacion ?? null,
        experiencia: dto.experiencia ?? null,
      })
      .select()
      .single();

    if (nineraError || !ninera) {
      throw new BadRequestException(
        nineraError?.message || 'No se pudo crear la niñera',
      );
    }

    return {
      message: 'Niñera registrada correctamente',
      user: {
        auth_id: authUserId,
        usuario,
        persona,
        ninera,
      },
    };
  }
}