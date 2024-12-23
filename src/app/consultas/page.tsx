'use client';
import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Home.module.css";

export default function Consultas() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointments, setAppointments] = useState<{ date: Date | null; hour: string }[]>([]);
  const availableHours = ["09:00", "10:00", "11:00", "14:00", "15:00"];
  const unavailableHours = ["12:00", "13:00"];
  const openModal = (date: Date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAppointment = (hour: string) => {
    setAppointments([...appointments, { date: selectedDate, hour }]);
    closeModal();
    alert("Agendamento realizado com sucesso!");
  };

  return (
    <main>
      <nav>
      <Link className="botao-home" href="/">⬅ Home</Link> 
      <h1>Consultas</h1>
    </nav>
    <div className={styles.container}>
      <h1 className={styles.title}>Agenda de Consultas</h1>
      <Calendar 
        onClickDay={(value) => openModal(value)} 
        className={styles.calendar}
      />

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Agendar para {selectedDate?.toLocaleDateString()}</h2>
        <div>
          <h3>Horários disponíveis:</h3>
          {availableHours.map((hour) => (
            <button
              key={hour}
              className={styles.available}
              onClick={() => handleAppointment(hour)}
            >
              {hour}
            </button>
          ))}
        </div>
        <div>
          <h3>Horários indisponíveis:</h3>
          {unavailableHours.map((hour) => (
            <button key={hour} className={styles.unavailable} disabled>
              {hour}
            </button>
          ))}
        </div>
        <button onClick={closeModal} className={styles.closeButton}>Fechar</button>
      </Modal>

      <div className={styles.appointments}>
        <h2>Seus Agendamentos:</h2>
        {appointments.map((appt, index) => (
          <p key={index}>
            {appt.date ? appt.date.toLocaleDateString() : "Data não disponível"} às {appt.hour}
          </p>
        ))}
      </div>
    </div>
    </main>
  );
}


