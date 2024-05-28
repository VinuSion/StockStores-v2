import { Link } from 'react-router-dom'

import { Button } from '@forms/button'

import { HeroSection } from '@modules/landing/HeroSection'
import { LandingNav } from '@modules/landing/LandingNav'
import { LandingFooter } from '@modules/landing/LandingFooter'

const Home: React.FC = () => {
  return (
    <div>
      <header>
        <LandingNav />
      </header>
      <main className="w-full h-96 absolute bg-gradient-to-b from-primary to-transparent -z-10">
        <div className="w-1/2 h-96 bg-background bg-left absolute -z-10 rounded-tr-2xl"></div>
        <article className="w-3/4 mx-auto">
          <section className="my-28" id="stores">
            <HeroSection
              phrase="Bienvenido a StockStores"
              title="Tu tienda de barrio ¡online!"
              info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
              image="store1.png"
            >
              <Link to="/login">
                <Button className="my-3">Comenzar</Button>
              </Link>
            </HeroSection>
          </section>

          <section className="my-28" id="services">
            <HeroSection
              phrase="A la puerta de tu casa"
              title="Domicilios incluidos"
              info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              elementPosition="flex-row-reverse"
              image="Domicilio.png"
            />
          </section>

          <section className="my-28" id="contact">
            <HeroSection
              phrase="Incluye"
              title="Dasboard del vendedor"
              elementPosition="flex-col-reverse"
              image="dashboardimg.png"
            />
          </section>
        </article>
        <LandingFooter />
      </main>
    </div>
  )
}

export default Home
