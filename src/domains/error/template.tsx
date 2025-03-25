import Link from "next/link";

interface ErrorTemplateProps {
  code: number;
  href?: string;
}

export default function ErrorTemplate({
  code,
  href = "/",
}: ErrorTemplateProps) {
  const getErrorMessage = () => {
    switch (code) {
      case 404:
        return {
          title: "404 - No Encontrado",
          message: "La página o recurso solicitado no existe.",
        };
      case 500:
        return {
          title: "500 - Error Interno",
          message: "Ocurrió un error en el servidor. Inténtalo más tarde.",
        };
      default:
        return {
          title: "Error Desconocido",
          message: "Algo salió mal. Por favor, intenta nuevamente.",
        };
    }
  };

  const { title, message } = getErrorMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-lg">{message}</p>
      <Link
        href={href}
        className="mt-4 bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-500 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
