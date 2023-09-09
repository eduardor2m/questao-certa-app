import styles from '@/styles/components/CardQuestion.module.scss'

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
              <li className={styles.option} key={index}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
