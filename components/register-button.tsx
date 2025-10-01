import Link from "next/link";
import { Button } from "./ui/button";

export function RegisterButton({
  registrationOpen,
}: {
  registrationOpen?: boolean;
}) {
  return registrationOpen ? (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-white bg-emerald-700 text-white hover:bg-white/20"
    >
      <Link href="/registration">Register Now</Link>
    </Button>
  ) : (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-white  bg-emerald-700 text-white hover:bg-white/20 disabled cursor-not-allowed"
    >
      <Link href="#">Registration is closed</Link>
    </Button>
  );
}
