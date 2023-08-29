import React, { useState } from 'react';
import './App.css';

interface Training {
  date: string;
  distance: number;
}

const TrainingApp: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const date = form.date.value;
    const distance = parseFloat(form.distance.value);

    const existingTrainingIndex = trainings.findIndex(training => training.date === date);

    if (existingTrainingIndex !== -1) {
      trainings[existingTrainingIndex].distance += distance;
      setTrainings([...trainings]);
    } else {
      setTrainings([{ date, distance }, ...trainings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    form.reset();
  };

  const handleDelete = (date: string) => {
    const updatedTrainings = trainings.filter(training => training.date !== date);
    setTrainings(updatedTrainings);
  };

  return (
    <div className="App">
      <h1>Учет тренировок</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Дата:
          <input type="date" name="date" required />
        </label>
        <label>
          Пройдено км:
          <input type="number" name="distance" required />
        </label>
        <button type="submit">Добавить</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Км</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(training => (
            <tr key={training.date}>
              <td>{training.date}</td>
              <td>{training.distance.toFixed(1)}</td>
              <td>
                <button onClick={() => handleDelete(training.date)}>✘</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainingApp;


