import { ScanFaceIcon, Coins, Truck, InfoIcon } from 'lucide-react'

export const cardsData = [
  {
    image: <ScanFaceIcon className={`w-28 h-28`} />,
    title: 'Cuenta',
    description:
      'Aqui encontraras preguntas relacionadas con el manejo de tu cuenta, como eliminar una cuenta, etc.',
  },
  {
    image: <Coins className={`w-28 h-28`} />,
    title: 'Pagos',
    description:
      'Informacion acerca de los diferentes metodos de pago, asi como preguntas mas frecuentes con errores de pago.',
  },
  {
    image: <Truck className={`w-28 h-28`} />,
    title: 'Envio',
    description:
      'Preguntas relacionadas con el retraso de envios, acerca de las empresas de envios que disponemos actualmente, etc.',
  },
  {
    image: <InfoIcon className={`w-28 h-28`} />,
    title: 'Nosotros',
    description: 'Conoce acerca de nosotros.',
  },
]

export const faqData = [
  {
    section: 'Cuenta',
    question: '¿Cómo puedo restablecer mi contraseña?',
    answer:
      'Puedes restablecer tu contraseña haciendo clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión y siguiendo las instrucciones.',
  },
  {
    section: 'Cuenta',
    question: '¿Puedo eliminar mi cuenta?',
    answer:
      'Si, puedes eliminar tu cuenta dirigiendote a configuraciones, recuerda que eliminar tu cuenta eliminara tambien las tiendas que tengas asociadas a ella.',
  },
  {
    section: 'Cuenta',
    question: '¿Como cambio mi usuario?',
    answer:
      'Dirigete a configuracion, en la pestaña de cuenta podras cambiar tu nombre de usuario, recuerda que solo puedes cambiar tu nombre una vez cada 3 meses.',
  },
  {
    section: 'Cuenta',
    question: '¿Cómo puedo ponerme en contacto con soporte técnico?',
    answer:
      'Puedes ponerte en contacto con nuestro equipo de soporte técnico enviando un correo electrónico a support@example.com o llamando al +123456789.',
  },
  {
    section: 'Pagos',
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos tarjetas de crédito/débito Visa, Mastercard y American Express, así como PayPal y transferencias bancarias.',
  },
  {
    section: 'Envio',
    question: '¿Cuál es el tiempo de entrega estándar?',
    answer:
      'Nuestro tiempo de entrega estándar es de 3-5 días hábiles dentro del país y 7-14 días hábiles para envíos internacionales.',
  },
  {
    section: 'Nosotros',
    question: '¿Quienes somos?',
    answer:
      'Somos un equipo pequeño de desarrollo sin animos de lucro, con el fin de ayudar a la comunidad Barranquillera.',
  },
]
