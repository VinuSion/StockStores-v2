import { useState, useEffect } from 'react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { faqData } from '@utils/constants/faqCardsData'

const Faq: React.FC = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null)
  const [selectedCard, setSelectedCard] = useState<string>('')

  useEffect(() => {
    const urlSegments = window.location.pathname.split('/')
    setSelectedCard(urlSegments[urlSegments.length - 1])
  }, [])

  const handleQuestionClick = (index: number) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index)
  }

  const filteredQuestions = faqData.filter(
    (faq) => faq.section === selectedCard
  )

  return (
    <section className="my-5">
      <div className="flex gap-2 items-center px-4 md:w-full md:px-8 py-5">
        <h1 className="text-2xl md:text-3xl font-extrabold">{selectedCard}</h1>
      </div>
      <div className="flex flex-col w-full px-8 md:px-8">
        {filteredQuestions.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => handleQuestionClick(index)}
              className="rounded-lg p-2 hover:text-primary hover:bg-secondary focus:outline-none delay-50 transition-all duration-300 ease-in-out"
            >
              {faq.question}
            </button>
            <div
              className={`px-8 md:px-8 mt-2 transition-opacity duration-300 opacity-${
                selectedQuestionIndex === index ? '100' : '0'
              }`}
            >
              {selectedQuestionIndex === index && (
                <>
                  <h2 className="text-lg font-semibold mb-2">Respuesta:</h2>
                  <p className="py-2">{faq.answer}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AuthLayout(Faq)
