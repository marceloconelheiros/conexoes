import { redirect } from "next/navigation";

type PainelPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EmpresaPainelPage({ params }: PainelPageProps) {
  await params;
  redirect("/perfil");
}
