"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from "@/hooks/useAuthModal";

import Modal from './Modal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal 
      title="Bienvenido" 
      description="Inicia sesión o registrate para continuar" 
      isOpen={isOpen} 
      onChange={onChange} 
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={['google', 'spotify', 'discord']}
        magicLink={true}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Contraseña",
              email_input_placeholder: "Email",
              password_input_placeholder: "Contraseña",
              button_label: "Registrarse",
              loading_button_label: "Registrandote ...",
              social_provider_text: "Inicia sesion rapidamente con  {{provider}}",
              link_text: "¿No tienes ninguna cuenta? Registrate",
              confirmation_text: "Te hemos enviado un email de confirmacion, revisa la carpeta spam."
            },
            sign_in: {
              email_label: "Email",
              password_label: "Contraseña",
              email_input_placeholder: "Email",
              password_input_placeholder: "Contraseña",
              button_label: "Iniciar sesion",
              loading_button_label: "Iniciando sesion  ...",
              social_provider_text: "Inicia sesion rapidamente con  {{provider}}",
              link_text: "¿Ya tienes una cuenta? Inicia sesion",
            },
            magic_link: {
              email_input_placeholder: "Tu direccion de correo electronico",
              button_label: "Enviar link de inicio de sesion rapido",
              loading_button_label: "Enviando ...",
              link_text: "Inicio de sesion rapido",
              confirmation_text: "Te hemos enviado un email, revisa la carpeta spam.",
            },
            "forgotten_password": {
              "email_label": "Email",
              "password_label": "Contraseña ",
              "email_input_placeholder": "Email",
              "button_label": "Enviar las instrucciones para restablecer tu contraseña",
              "loading_button_label": "Enviando ...",
              "link_text": "¿Has olvidado tu contraseña?",
              "confirmation_text": "Revisa tu email para encontrar las instrucciones de restablecimiento de contraseña."
            },
            "update_password": {
              "password_label": "Nueva contraseña",
              "password_input_placeholder": "Tu nueva contraseña",
              "button_label": "Actualizar contraseña",
              "loading_button_label": "Actualizando contraseña ...",
              "confirmation_text": "Tu contraseña ha sido actualizada."
            },
            "verify_otp": {
              "email_input_label": "Direccion de email",
              "email_input_placeholder": "Tu direccion de email",
              "phone_input_label": "Numero de telefono",
              "phone_input_placeholder": "Tu numero de telefono",
              "token_input_label": "Codigo",
              "token_input_placeholder": "Tu codigo de verificacion",
              "button_label": "Verificar codigo",
              "loading_button_label": "Iniciando sesion ..."
            }
          }
          }
        }
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'

              }
            }
            
          }
        }}
        theme="dark"
      />
    </Modal>
  );
}

export default AuthModal;