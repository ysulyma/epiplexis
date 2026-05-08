import { cn } from "@/lib/utils.ts";

export function ExternalLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "text-blue-800 hover:text-blue-700",
        "dark:text-blue-600 dark:hover:text-blue-500",
        className,
      )}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  );
}
