export default function Alert({ children }: { children: React.ReactNode }) {
  return (
    <article className="mt-1 border-l-2 border-red-800 dark:border-red-200 text-red-800 dark:text-red-200 px-2">
      {children}
    </article>
  )
}
