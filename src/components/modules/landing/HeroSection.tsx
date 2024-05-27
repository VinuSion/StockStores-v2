import { Hero } from '@utils/types/hero.types'

const HeroSection: React.FC<Hero> = ({
  phrase,
  title,
  info,
  image,
  children,
  elementPosition,
}) => {
  return (
    <section className={`flex ${elementPosition} items-center justify-between`}>
      <div className="w-2/6">
        <h3 className="text-lg text-primary">{phrase}</h3>
        <h1 className="font-semibold text-4xl">{title}</h1>
        {info && <p className="text-sm py-2 text-muted-foreground">{info}</p>}
        {children && <>{children}</>}
      </div>
      <div className="w-2/3">
        <img src={`/${image}`} className="w-4/5 h-4/5" />
      </div>
    </section>
  )
}

export { HeroSection }