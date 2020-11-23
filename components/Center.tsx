export default function Center({
  max,
  styles,
  children,
}: {
  max: 'lg' | 'md' | 'sm'
  styles: string
  children: React.ReactNode
}) {
  return (
    <div className={`contianer mx-auto max-w-screen-${max} px-2 ${styles}`}>
      {children}
    </div>
  )
}
