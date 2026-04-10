import { redirect } from "next/navigation";

export default function HajjPage() {
  redirect("/hajj-umrah?type=hajj");
}