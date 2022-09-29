export const ItemTypes = {
  QUESTION: "question",
};

export const newQuestion = {
  questiontext: "",
  questionType: "radio",
  questionimageUrl: "",
  options: [
    { optionText: "", optionImageUrl: "", isCorrect: false },
    { optionText: "", optionImageUrl: "", isCorrect: false },
  ],
  open: true,
  points: 0,
};

export const newOption = {
  optionText: "",
  optionImageUrl: "",
  isCorrect: false,
};

export const initialQuizState = {
  quizeText: "",
  quizeDescription: "",

  quizQuestions: [
    {
      id: 1,
      questiontext: "",
      questionimageUrl: "",
      questionType: "radio",
      options: [
        { optionText: "", optionImageUrl: "", isCorrect: false },
        { optionText: "", optionImageUrl: "", isCorrect: false },
      ],
      open: true,
      points: 0,
    },
  ],
};
