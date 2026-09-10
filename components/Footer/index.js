import Link from "next/link";
import Socials from "../Socials";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="site-footer-name">Kelvin Jou</Link>
      <Socials />
    </footer>
  );
}
