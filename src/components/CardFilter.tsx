'use client'

import { useQuestion } from '@/hooks/useQuestion'
import styles from '@/styles/components/CardFilter.module.scss'
import { useState } from 'react'

type CardFilterProps = {
  data: {
    handleShowModal: () => void
  }
}

type QuestionFilterProps = {
  organization: string
  year: string
  content: string
  topic: string
  quantity: number
}

export const CardFilter = ({ data }: CardFilterProps) => {
  const { generateQuestions } = useQuestion()
  const [filter, setFilter] = useState<QuestionFilterProps>(
    {} as QuestionFilterProps,
  )

  async function handleGenerateQuestions() {
    await generateQuestions({
      data: {
        organization: filter.organization,
        year: filter.year,
        content: filter.content,
        topic: filter.topic,
        quantity: filter.quantity,
      },
    })
  }

  return (
    <div className={styles.container} onClick={data.handleShowModal}>
      <div
        className={styles.content}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <div className={styles.title}>
          <h2>Gerar Simulado</h2>
        </div>
        <div className={styles.body}>
          <div
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault()
              handleGenerateQuestions()
            }}
          >
            <div className={styles.form_group}>
              <label htmlFor="subject">Matéria</label>
              <select
                name="subject"
                id="subject"
                onChange={(event) => {
                  setFilter({
                    ...filter,
                    content: event.target.value,
                  })
                }}
              >
                <option value="matematica">Matemática</option>
                <option value="portugues">Português</option>
                <option value="historia">História</option>
                <option value="geografia">Geografia</option>
                <option value="fisica">Física</option>
              </select>
              <label htmlFor="subject">Banca</label>
              <select
                name="subject"
                id="subject"
                onChange={(event) => {
                  setFilter({
                    ...filter,
                    organization: event.target.value,
                  })
                }}
              >
                <option value="cespe">CESPE</option>
                <option value="fgv">FGV</option>
                <option value="fmp">FMP</option>
                <option value="fcc">FCC</option>
                <option value="vunesp">VUNESP</option>
              </select>
              <label htmlFor="subject">Ano</label>
              <select
                name="subject"
                id="subject"
                onChange={(event) => {
                  setFilter({
                    ...filter,
                    year: event.target.value,
                  })
                }}
              >
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="subject">Quantidade de questões</label>
              <input
                type="range"
                max={10}
                min={0}
                step={1}
                onChange={(event) => {
                  setFilter({
                    ...filter,
                    quantity: Number(event.target.value),
                  })
                }}
              />
            </div>
            <div className={styles.form_button}>
              <button
                type="submit"
                className={styles.button}
                value="Gerar"
                onClick={() => {
                  handleGenerateQuestions()
                  data.handleShowModal()
                }}
              >
                Gerar Simulado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
