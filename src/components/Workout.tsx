import { useState } from "react";
import type { ExerciseContractor } from "../features/core";
import { Test } from ".";

const Workout = ({exerciseContractor, level, repetations} : {exerciseContractor: ExerciseContractor, level: number, repetations: number}) => {
    const [excesirse] = useState(new exerciseContractor(level, repetations));
    return (
        <Test exercise={excesirse}></Test>
    )
};

export { Workout }