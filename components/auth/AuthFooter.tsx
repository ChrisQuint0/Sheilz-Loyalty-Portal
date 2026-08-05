import Link from "next/link"
import { cn } from "@/lib/utils"

interface AuthFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  linkText: string
  href: string
}

export function AuthFooter({ text, linkText, href, className, ...props }: AuthFooterProps) {
  return (
    <div className={cn("mt-6 text-center text-sm", className)} {...props}>
      <p className="text-muted-foreground">
        {text}{" "}
        <Link href={href} className="font-medium text-primary hover:underline transition-colors">
          {linkText}
        </Link>
      </p>
    </div>
  )
}
