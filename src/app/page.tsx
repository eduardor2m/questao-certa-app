'use client'
import styles from '@/styles/pages/Home.module.scss'
import Image from 'next/image'

import { MdOutlineCreate } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'
import { RiTestTubeLine } from 'react-icons/ri'
import { FiInfo } from 'react-icons/fi'
import { CardQuestion } from '@/components/CardQuestion'
import { CardFilter } from '@/components/CardFilter'
import { useState } from 'react'
import { useQuestion } from '@/hooks/useQuestion'
import { CardAlert } from '@/components/cardAlert'

export default function Home() {
  const [modal, setModal] = useState(false)
  const [alert, setAlert] = useState(false)
  const [path, setPath] = useState('create')
  const { questions } = useQuestion()

  function handleShowModal() {
    setModal(!modal)
  }

  function handleShowAlert() {
    setAlert(!alert)
  }
  return (
    <main className={styles.container}>
      {modal && <CardFilter data={{ handleShowModal }} />}
      {alert && <CardAlert data={{ handleShowAlert }} />}
      <div className={styles.content}>
        <section className={styles.header}>
          <Image
            src="/assets/pencil.svg"
            alt="Questão Certa"
            width={100}
            height={70}
            className={styles.img}
          />
          <h1 className={styles.title}>Questão Certa</h1>
          <p className={styles.description}>
            Questão Certa é uma plataforma de questões de múltipla escolha{' '}
            <br /> para estudantes e professores.
          </p>
          <button className={styles.button} onClick={handleShowModal}>
            <MdOutlineCreate
              className={styles.icon}
              color="#0d6fde"
              size={20}
            />
            <p className={styles.text_button}>Criar simulado</p>
          </button>
        </section>

        <section className={styles.body}>
          <section className={styles.body_left}>
            <button
              className={styles.button_body_left}
              style={{
                backgroundColor: path === 'create' ? '#0d6fde1a' : '',
                color: path === 'create' ? '#0d6fde' : '',
              }}
              onClick={() => {
                setPath('create')
                setModal(true)
              }}
            >
              <MdOutlineCreate
                className={styles.icon_body_left}
                size={20}
                style={{
                  color: path === 'create' ? '#0d6fde' : '',
                }}
              />
              <p
                className={styles.text_button_body_left}
                style={{
                  color: path === 'create' ? '#0d6fde' : '',
                }}
              >
                Criar simulado
              </p>
            </button>
            <button
              className={styles.button_body_left}
              style={{
                backgroundColor: path === 'clean' ? '#0d6fde1a' : '',
                color: path === 'clean' ? '#0d6fde' : '',
              }}
              onClick={() => setAlert(true)}
            >
              <AiOutlineClear
                className={styles.icon_body_left}
                size={20}
                style={{
                  color: path === 'clean' ? '#0d6fde' : '',
                }}
              />
              <p
                className={styles.text_button_body_left}
                style={{
                  color: path === 'clean' ? '#0d6fde' : '',
                }}
              >
                Limpar simulado
              </p>
            </button>
            <button
              className={styles.button_body_left}
              style={{
                backgroundColor: path === 'test' ? '#0d6fde1a' : '',
                color: path === 'test' ? '#0d6fde' : '',
              }}
              onClick={() => setAlert(true)}
            >
              <RiTestTubeLine
                className={styles.icon_body_left}
                size={20}
                style={{
                  color: path === 'test' ? '#0d6fde' : '',
                }}
              />
              <p
                className={styles.text_button_body_left}
                style={{
                  color: path === 'test' ? '#0d6fde' : '',
                }}
              >
                Teste de conhecimento
              </p>
            </button>
          </section>
          <section className={styles.body_center}>
            <div className={styles.body_center_list_questions}>
              {questions != null && questions.length > 0 ? (
                questions.map((question) => (
                  <CardQuestion key={question.id} data={question} />
                ))
              ) : (
                <div className={styles.body_center_list_questions_empty}>
                  <p className={styles.body_center_list_questions_empty_text}>
                    Nenhuma questão adicionada
                  </p>
                </div>
              )}
            </div>
            <button className={styles.button_body_center}>
              <p className={styles.text_button_body_center}>Gerar Relatório</p>
            </button>
          </section>
          <section className={styles.body_right}>
            <div className={styles.body_right_informations}>
              <h2 className={styles.title_body_right_informations}>
                <FiInfo
                  className={styles.icon_body_right_informations}
                  size={20}
                />
                Informaticvo
              </h2>
              <p className={styles.body_right_informations_text}>
                Quando você terminar de criar seu simulado, você pode{' '}
                <span>compartilhar</span> com seus amigos e professores, gerando
                um <span>relatório</span>. E também escolher se quer que as{' '}
                <span>respostas</span> sejam mostradas assim que responder ou no
                final do simulado.
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
