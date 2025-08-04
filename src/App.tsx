import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Workout, Home } from './components';
import { MathExercise, MemoryExercise } from './features';

export default function App() {
  return (
    <BrowserRouter basename="/brain-exercise">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<Workout exerciseContractor={MemoryExercise} level={2} repetations={20}/>} />
        <Route path="/math" element={<Workout exerciseContractor={MathExercise} level={2} repetations={20}/>} />
      </Routes>
    </BrowserRouter>
  );
}

