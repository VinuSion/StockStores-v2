import React from 'react';
import { AuthLayout } from '@pages/layouts/AuthLayout'
import { ListAllCards } from '@components/modules/auth/faq/ListAllFaqCards';
import { LandingNav } from '@modules/landing/LandingNav'

const Faq: React.FC = () => {
  return (
    <section className="my-5">
      <div className="flex gap-2 items-center px-4 md:w-full px-8 py-5">
        <h1 className="text-2xl md:text-3xl font-extrabold">¿Con qué necesitas ayuda?</h1>
      </div>
      <div className="align-center-row grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 gap-8 md:gap-12 w-full px-8 md:px-8">
        <ListAllCards/>
      </div>
    </section>
  );
}

export default AuthLayout(Faq)