import ErrorTemplate from "@/domains/error/template";

export default async function ErrorPage({ params }: { params: { code: string };}) {
  const { code } = await params;
  return <ErrorTemplate code={Number(code)} />;
}
