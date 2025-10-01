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
      size="lg"
      variant="outline"
      className="border-white bg-gray-500 text-white cursor-not-allowed"
      disabled
    >
      Registration Closed
    </Button>
  );
}
