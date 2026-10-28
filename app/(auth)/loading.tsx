function Placeholder({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-muted/60 ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <main
      role="status"
      aria-busy="true"
      className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4 py-24 sm:p-8"
    >
      <span className="sr-only">Loading page...</span>
      <section
        aria-hidden="true"
        className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-lg sm:p-8"
      >
        <div className="space-y-3">
          <Placeholder className="mx-auto h-10 w-10 rounded-full" />
          <Placeholder className="mx-auto h-7 w-48" />
          <Placeholder className="mx-auto h-4 w-64 max-w-full" />
        </div>
        <div className="space-y-4">
          <Placeholder className="h-11 w-full" />
          <Placeholder className="h-11 w-full" />
          <Placeholder className="h-11 w-full" />
          <Placeholder className="h-10 w-full" />
        </div>
      </section>
    </main>
  );
}
