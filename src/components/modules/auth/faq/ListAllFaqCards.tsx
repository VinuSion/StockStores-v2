import FaqCard from '@modules/auth/faq/FaqCard'
import { cardsData } from '@utils/constants/faq/faqCardsData';
import { Link } from 'react-router-dom'

const ListAllCards: React.FC = () => {
  return (
    <>
      {cardsData.map((card) => (
          <Link to={`/faq/${card.title}`}>
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

export { ListAllCards }