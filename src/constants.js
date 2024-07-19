import cardioImage from "./images/cardio.jpg";
import olympicWeightLiftingImage from "./images/olympic_weight_lifting.jpg";
import plyometricsImage from "./images/plyometrics.jpg";
import powerLiftingImage from "./images/power_lifting.jpg";
import strengthTrainingImage from "./images/strength_training.jpg";
import stretchingImage from "./images/stretching.jpg";
import strongmanImage from "./images/strongman_training.jpg";

const API_KEY = "RXXBjk0enqz6wI+hIibTPA==pRWGKdIWKIgkSfvA";

const allExerciseTypes = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];
const images = new Map([
  ["cardio", cardioImage],
  ["olympic_weightlifting", olympicWeightLiftingImage],
  ["plyometrics", plyometricsImage],
  ["powerlifting", powerLiftingImage],
  ["strength", strengthTrainingImage],
  ["stretching", stretchingImage],
  ["strongman", strongmanImage],
]);
const allMuscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];
const allDifficulties = ["beginner", "intermediate", "expert"];
const snakeCaseToProperString = function (string, firstNameCapital = true) {
  const firstLetter = firstNameCapital
    ? string[0].toUpperCase()
    : string[0].toLowerCase();
  return firstLetter + string.slice(1).toLowerCase().replaceAll("_", " ");
};

export {
  API_KEY,
  allExerciseTypes,
  allMuscleGroups,
  images,
  allDifficulties,
  snakeCaseToProperString,
};
