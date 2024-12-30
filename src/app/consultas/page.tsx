'use client';
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import { format } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Home.module.css";

const professionals = ["Dra. Myllena Bitar", "Dra. Priscilla Souza", "Dr. Pedro Felipe"];

export default function Agendamentos() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointments, setAppointments] = useState<
    { date: Date; hour: string; professional: string }[]
  >([]);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    
    Modal.setAppElement(document.getElementById("__next") || document.body);
  }, []);

  const generateRandomHours = () => {
    const allHours = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00",
    ];
    setAvailableHours(allHours);
  };

  useEffect(() => {
    generateRandomHours();
  }, []);

  const openModal = (date: Date, index: number | null = null) => {
    setSelectedDate(date);
    if (index !== null) {
      setEditingIndex(index);
      setSelectedProfessional(appointments[index].professional);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProfessional(null);
    setEditingIndex(null);
  };

  const handleAppointment = (hour: string) => {
    if (!selectedDate || !selectedProfessional) {
      alert("Por favor, selecione um profissional.");
      return;
    }

    if (editingIndex !== null) {
      setAppointments((prev) =>
        prev.map((appt, index) =>
          index === editingIndex
            ? { date: selectedDate, hour, professional: selectedProfessional }
            : appt
        )
      );
      alert("Agendamento atualizado com sucesso!");
    } else {
      setAppointments((prev) => [
        ...prev,
        { date: selectedDate, hour, professional: selectedProfessional },
      ]);
      alert("Agendamento realizado com sucesso!");
    }

    closeModal();
  };

  const deleteAppointment = (index: number) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index));
    alert("Agendamento removido com sucesso!");
  };

  return (
    <main>
      <nav>
        <h1>Agendamento</h1>
      </nav>
      <div className={styles.container}>
        <h1 className={styles.title}>Agenda de Consultas</h1>
        <Calendar
          onClickDay={(value) => openModal(value)}
          className="react-calendar"
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modalContainer}
      >
        <button onClick={closeModal} className={styles.closeButton}>
          Fechar X
        </button>
        <h2>
          {editingIndex !== null
            ? `Editar agendamento para ${format(selectedDate!, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`
            : `Agendar para ${selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar"}`}
        </h2>
        <div className={styles.professionalSelect}>
          <h3 className={styles.title}>Selecione um Profissional:</h3>
          <select
            value={selectedProfessional || ""}
            onChange={(e) => setSelectedProfessional(e.target.value)}
            className={styles.selectProfessional}
          >
            <option value="" disabled>
              Escolha o seu Dentista
            </option>
            {professionals.map((professional) => (
              <option key={professional} value={professional}>
                {professional}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.hoursSection}>
          <h3 className={styles.title}>Horários disponíveis:</h3>
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
      </Modal>

      <div className={styles.appointments}>
        <h2 className={styles.appointmentsTitle}>Seus Agendamentos:</h2>
        {appointments.map((appt, index) => (
          <div key={index} className={styles.appointmentBlock}>
            <p>
              {appt.date.toLocaleDateString()} às {appt.hour} com {appt.professional}
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.edit}
                onClick={() => openModal(appt.date, index)}
              >
                Editar
              </button>
              <button
                className={styles.delete}
                onClick={() => deleteAppointment(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
