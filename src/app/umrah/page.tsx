import { redirect } from "next/navigation";

export default function UmrahPage() {
  redirect("/hajj-umrah?type=umrah");
}