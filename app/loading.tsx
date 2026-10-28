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
    <div
      role="status"
      aria-busy="true"
      className="flex min-h-screen flex-col bg-background lg:flex-row"
    >
      <span className="sr-only">Loading page...</span>

      <aside
        aria-hidden="true"
        className="hidden h-screen w-64 shrink-0 flex-col border-r bg-sidebar p-6 lg:flex"
      >
        <Placeholder className="mb-10 h-8 w-40" />
        <div className="space-y-4">
          <Placeholder className="h-10 w-full" />
          <Placeholder className="h-10 w-full" />
          <Placeholder className="h-10 w-full" />
          <Placeholder className="h-10 w-full" />
        </div>
        <div className="mt-auto flex items-center gap-3 border-t pt-5">
          <Placeholder className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <Placeholder className="h-4 w-28" />
            <Placeholder className="h-3 w-20" />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <header
          aria-hidden="true"
          className="flex h-14 items-center border-b px-4 lg:hidden"
        >
          <Placeholder className="h-7 w-36" />
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
            <section aria-hidden="true" className="space-y-3">
              <Placeholder className="h-8 w-56" />
              <Placeholder className="h-4 w-72 max-w-full" />
            </section>

            <section
              aria-hidden="true"
              className="space-y-4 rounded-xl border bg-card p-5 md:p-6"
            >
              <Placeholder className="h-6 w-40" />
              <Placeholder className="h-24 w-full" />
            </section>

            <section
              aria-hidden="true"
              className="grid gap-4 md:grid-cols-2"
            >
              <Placeholder className="h-36 w-full rounded-xl" />
              <Placeholder className="h-36 w-full rounded-xl" />
            </section>
          </div>
        </main>

        <nav
          aria-hidden="true"
          className="fixed inset-x-0 bottom-0 flex h-16 items-center justify-around border-t bg-background px-4 lg:hidden"
        >
          <Placeholder className="h-8 w-10" />
          <Placeholder className="h-8 w-10" />
          <Placeholder className="h-8 w-10" />
          <Placeholder className="h-8 w-10" />
        </nav>
      </div>
    </div>
  );
}
