'use client'

import { useQuestion } from '@/hooks/useQuestion'
import styles from '@/styles/components/CardQuestion.module.scss'
import { useState } from 'react'

type CardQuestionProps = {
  data: {
    id: string
    organization: string
    model: string
    year: string
    content: string
    topic: string
    question: string
    answer: string
    options: string[]
  }
}

export const CardQuestion = ({ data }: CardQuestionProps) => {
  const [correct, setCorrect] = useState('')
  const [incorrect, setIncorrect] = useState('')
  const { generateReport } = useQuestion()

  function handleOptionIsIqualAnswer(option: string) {
    generateReport(data, option)
    const check = option === data.answer

    if (!check && correct !== '') {
      setCorrect(correct)
    } else if (!check && incorrect !== '') {
      setIncorrect(incorrect)
    } else if (check) {
      setCorrect(option)
    } else {
      setIncorrect(option)
      setCorrect(data.answer)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.meta_data}>{data.organization}</p>
          <p className={styles.meta_data}>{data.year}</p>
          <p className={styles.meta_data}>{data.content}</p>
          <p className={styles.meta_data}>{data.topic}</p>
        </div>
        <div className={styles.body}>
          <p className={styles.question}>{data.question}</p>
          <ul className={styles.list_options}>
            {data.options.map((option, index) => (
              <li
                className={styles.option}
                key={index}
                onClick={() => handleOptionIsIqualAnswer(option)}
                style={{
                  backgroundColor:
                    correct === option
                      ? '#c7f9cc'
                      : '' || incorrect === option
                      ? '#ee6055'
                      : '',
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
