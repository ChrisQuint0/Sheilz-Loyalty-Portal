export interface SkeletonBlockProps {
  className?: string;
  height?: string;
  width?: string;
}

export function SkeletonBlock({ className = "", height = "h-6", width = "w-full" }: SkeletonBlockProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`bg-muted/60 rounded ${height} ${width} animate-pulse ${className}`}
    />
  );
}
