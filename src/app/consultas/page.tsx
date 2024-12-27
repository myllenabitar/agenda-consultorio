'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Home.module.css";
import { format } from "date-fns";


const professionals = ["Dra. Bitar", "Dra. Souza", "Dr. Oliveira"];

export default function Agendamentos() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointments, setAppointments] = useState<
    { date: Date; hour: string; professional: string }[]
  >([]);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [unavailableHours, setUnavailableHours] = useState<
    { date: Date; hour: string }[]
  >([]);

  const generateRandomHours = () => {
    const allHours = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00",
    ];
    const randomHours = allHours
      .sort(() => Math.random() - 0.5)
      .slice(0, 5); 
    setAvailableHours(randomHours);
  };

  const generateRandomUnavailableHours = () => {
    const newUnavailableHours = [];
    for (let i = 0; i < 10; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30));
      const randomHour =
        availableHours[Math.floor(Math.random() * availableHours.length)];
      newUnavailableHours.push({ date: randomDate, hour: randomHour });
    }
    setUnavailableHours(newUnavailableHours);
  };

  useEffect(() => {
    generateRandomHours();
  }, []);

  useEffect(() => {
    if (availableHours.length > 0) {
      generateRandomUnavailableHours();
    }
  }, [availableHours]);

  const openModal = (date: Date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProfessional(null);
  };

  const handleAppointment = (hour: string) => {
    if (!selectedDate || !selectedProfessional) {
      alert("Por favor, selecione um profissional.");
      return;
    }

    setAppointments((prev) => [
      ...prev,
      { date: selectedDate, hour, professional: selectedProfessional },
    ]);
    closeModal();
    alert("Agendamento realizado com sucesso!");
  };

  const isUnavailable = (date: Date, hour: string) => {
    return unavailableHours.some(
      (unavailable) =>
        unavailable.date.toDateString() === date.toDateString() &&
        unavailable.hour === hour
    );
  };

  return (
    <main>
      <nav>
        <Link className="botao-home" href="/">
          ⬅ Home
        </Link>
        <h1>Agendamento</h1>
      </nav>
      <div className={styles.container}>
        <h1 className={styles.title}>Agenda de Consultas</h1>
        <Calendar
          onClickDay={(value) => openModal(value)}
          className={styles.calendar}
        />

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>
            Agendar para{" "}
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar"}
          </h2>
          <div>
            <h3>Selecione um profissional:</h3>
            <select
              value={selectedProfessional || ""}
              onChange={(e) => setSelectedProfessional(e.target.value)}
            >
              <option value="" disabled>
                Escolha um profissional
              </option>
              {professionals.map((professional) => (
                <option key={professional} value={professional}>
                  {professional}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Horários disponíveis:</h3>
            {availableHours.map((hour) =>
              selectedDate && !isUnavailable(selectedDate, hour) ? (
                <button
                  key={hour}
                  className={styles.available}
                  onClick={() => handleAppointment(hour)}
                >
                  {hour}
                </button>
              ) : null
            )}
          </div>
        </Modal>
        <div className={styles.appointments}>
          <h2>Seus Agendamentos:</h2>
          {appointments.map((appt, index) => (
            <p key={index}>
              {appt.date.toLocaleDateString()} às {appt.hour} com{" "}
              {appt.professional}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}

