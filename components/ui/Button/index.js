import Link from "next/link";

export default function Button({ href, children, variant = "default", className = "", ...props }) {
  const classes = `ui-button ui-button-${variant} ${className}`.trim();
  if (href) return <Link href={href} className={classes} {...props}>{children}</Link>;
  return <button type="button" className={classes} {...props}>{children}</button>;
}
