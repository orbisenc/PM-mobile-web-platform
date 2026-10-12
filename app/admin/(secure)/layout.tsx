import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";

export default async function SecureAdminLayout({children}:{children:React.ReactNode}){
  const store=await cookies();
  if(!verifyAdminToken(store.get(ADMIN_COOKIE)?.value)) redirect("/admin/login");
  return children;
}
