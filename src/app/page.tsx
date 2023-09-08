import styles from '@/styles/pages/Home.module.scss';
import Image from 'next/image';

import { MdOutlineCreate } from 'react-icons/md';
import { AiOutlineClear } from 'react-icons/ai';
import { RiTestTubeLine } from 'react-icons/ri';
import { FiInfo } from 'react-icons/fi';
import { CardQuestion } from '@/components/CardQuestion';

const questions = [
  {
    "id": "1",
    "organization": "CESPE",
    "model": "ENEM",
    "year": "2020",
    "content": "Geografia",
    "topic": "Capitais",
    "question": "Qual é a capital do Brasil?",
    "answer": "Brasília",
    "options": ["Rio de Janeiro", "São Paulo", "Brasília", "Belo Horizonte", "Salvador"]
  },
  {
    "id": "2",
    "organization": "FGV",
    "model": "TRT",
    "year": "2019",
    "content": "História",
    "topic": "Presidentes do Brasil",
    "question": "Quem foi o primeiro presidente do Brasil?",
    "answer": "Marechal Deodoro da Fonseca",
    "options": ["Getúlio Vargas", "Juscelino Kubitschek", "Fernando Henrique Cardoso", "Marechal Deodoro da Fonseca", "Luiz Inácio Lula da Silva"]
  },
  {
    "id": "3",
    "organization": "CESGRANRIO",
    "model": "ENEM",
    "year": "2021",
    "content": "Química",
    "topic": "Tabela Periódica",
    "question": "Qual é o símbolo químico do oxigênio?",
    "answer": "O",
    "options": ["N", "H", "C", "O", "He"]
  },
  {
    "id": "4",
    "organization": "FCC",
    "model": "TRE",
    "year": "2020",
    "content": "Geografia",
    "topic": "Estados dos EUA",
    "question": "Quantos estados compõem os Estados Unidos da América?",
    "answer": "50",
    "options": ["48", "49", "50", "51", "52"]
  },
  {
    "id": "5",
    "organization": "IADES",
    "model": "INSS",
    "year": "2018",
    "content": "Astronomia",
    "topic": "Planetas",
    "question": "Qual é o maior planeta do sistema solar?",
    "answer": "Júpiter",
    "options": ["Terra", "Vênus", "Marte", "Júpiter", "Saturno"]
  },
  {
    "id": "6",
    "organization": "CESPE",
    "model": "ENEM",
    "year": "2019",
    "content": "Literatura",
    "topic": "Autores",
    "question": "Quem é o autor da obra 'Dom Casmurro'?",
    "answer": "Machado de Assis",
    "options": ["José de Alencar", "Machado de Assis", "Euclides da Cunha", "Eça de Queirós", "Gonçalves Dias"]
  },
  {
    "id": "7",
    "organization": "FGV",
    "model": "TJ-RJ",
    "year": "2021",
    "content": "História",
    "topic": "Independência do Brasil",
    "question": "Em que ano a independência do Brasil foi proclamada?",
    "answer": "1822",
    "options": ["1810", "1820", "1822", "1830", "1840"]
  },
  {
    "id": "8",
    "organization": "CESGRANRIO",
    "model": "ENEM",
    "year": "2022",
    "content": "Geografia",
    "topic": "Capitais do Mundo",
    "question": "Qual é a capital do Japão?",
    "answer": "Tóquio",
    "options": ["Pequim", "Xangai", "Seul", "Tóquio", "Bangcoc"]
  },
  {
    "id": "9",
    "organization": "FCC",
    "model": "TRE",
    "year": "2021",
    "content": "Geografia",
    "topic": "Rios",
    "question": "Qual é o maior rio do mundo em extensão?",
    "answer": "Rio Amazonas",
    "options": ["Rio Nilo", "Rio Yangtzé", "Rio Misisipi", "Rio Paraná", "Rio Amazonas"]
  },
  {
    "id": "10",
    "organization": "IADES",
    "model": "INSS",
    "year": "2017",
    "content": "Astronomia",
    "topic": "Elementos Químicos",
    "question": "Qual é o átomo mais abundante no universo?",
    "answer": "Hidrogênio",
    "options": ["Hélio", "Lítio", "Carbono", "Oxigênio", "Hidrogênio"]
  }
];


export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <section className={styles.header}>
          <Image src="/assets/pencil.svg" alt="Questão Certa" width={100} height={70} className={styles.img} />
          <h1 className={styles.title}>Questão Certa</h1>
          <p className={styles.description}> 
            Questão Certa é uma plataforma de questões de múltipla escolha <br/> para
            estudantes e professores.
          </p>
          <button className={styles.button}>
            <MdOutlineCreate className={styles.icon} color="#0d6fde" size={20} />
            <p className={styles.text_button}>
              Criar simulado
            </p>
          </button>
        </section>

        <section className={styles.body}>
          <section className={styles.body_left}>
            <button className={styles.button_body_left}>
              <MdOutlineCreate className={styles.icon_body_left} size={20} />
              <p className={styles.text_button_body_left}>
                Criar simulado
              </p>
            </button>
            <button className={styles.button_body_left}>
              <AiOutlineClear className={styles.icon_body_left} size={20} />
              <p className={styles.text_button_body_left}>
                Limpar simulado
              </p>
            </button>
            <button className={styles.button_body_left}>
              <RiTestTubeLine className={styles.icon_body_left} size={20} />
              <p className={styles.text_button_body_left}>
                Teste de conhecimento
              </p>
            </button>
          </section>
          <section className={styles.body_center}>
            <div className={styles.body_center_list_questions}>
              {questions.map((question) => (
                <CardQuestion key={question.id} data={question} />
              ))}
            </div>
            <button className={styles.button_body_center}>
              <p className={styles.text_button_body_center}>
                Gerar Relatório
              </p>
            </button>
          </section>
          <section className={styles.body_right}>
            <div className={styles.body_right_informations}>
              
              <h2 className={styles.title_body_right_informations}>
                <FiInfo className={styles.icon_body_right_informations} size={20} />
                Informaticvo
              </h2>
              <p className={styles.body_right_informations_text}>
                Quando você terminar de criar seu simulado, você pode <span>compartilhar</span> com seus amigos e professores, gerando um <span>relatório</span>.
                E também escolher se quer que as <span>respostas</span> sejam mostradas assim que responder ou no final do simulado.
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
