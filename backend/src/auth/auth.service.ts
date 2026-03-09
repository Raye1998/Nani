import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';

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
}