'use client'

import styles from '@/styles/components/CardAlert.module.scss'

import { FiAlertTriangle } from 'react-icons/fi'

type CardFilterProps = {
  data: {
    handleShowAlert: () => void
  }
}

export const CardAlert = ({ data }: CardFilterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <FiAlertTriangle className={styles.icon} color="#0d6fde" size={20} />
          <h2>Alerta</h2>
        </div>
        <div className={styles.body}>
          <p>Funcão em desenvolvimento...</p>
          <button className={styles.button} onClick={data.handleShowAlert}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
