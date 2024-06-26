import { Link } from 'react-router-dom'

import { FaqCard } from '@modules/auth/faq/FaqCard'
import { cardsData } from '@utils/constants/faqCardsData'

const ListFaqCards: React.FC = () => {
  return (
    <>
      {cardsData.map((card, index) => (
        <Link key={index} to={`/faq/${card.title}`}>
          <FaqCard
            image={card.image}
            title={card.title}
            description={card.description}
          />
        </Link>
      ))}
    </>
  )
}

export { ListFaqCards }
