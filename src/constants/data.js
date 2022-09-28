export const ItemTypes = {
  QUESTION: "question",
};

export const questions = [
  {
    id: 1,
    questiontext: "hello?",
    questionType: "radio",
    options: [
      { optionText: "option 1" },
      { optionText: "option 2" },
      { optionText: "option 3" },
      { optionText: "option 4" },
    ],
    open: true,
    required: false,
  },
  {
    id: 2,
    questiontext: "wow?",
    questionType: "radio",
    options: [
      { optionText: "option 1" },
      { optionText: "option 2" },
      { optionText: "option 3" },
      { optionText: "option 4" },
    ],
    open: true,
    required: false,
  },
  {
    id: 3,
    questiontext: "hi?",
    questionType: "checkbox",
    options: [
      { optionText: "option 1" },
      { optionText: "option 2" },
      { optionText: "option 3" },
      { optionText: "option 4" },
    ],
    open: true,
    required: false,
  },
];
