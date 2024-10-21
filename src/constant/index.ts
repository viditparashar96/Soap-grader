export const OSCE_RUBRIC = {
  rubricName: "OSCE Grading Rubric",
  totalPoints: 290,
  passingPercentage: 80,
  sections: [
    {
      name: "Introduction",
      items: [
        {
          description: "Introduced themselves & confirmed patient's name",
          points: 10,
        },
        {
          description: "Confirmed Chief Complaint",
          points: 10,
        },
      ],
    },
    {
      name: "History",
      items: [
        {
          description: "History of Present Illness - OPQRST",
          points: 10,
        },
        {
          description: "Past Medical History – Hospitalizations, Trauma, etc.",
          points: 10,
        },
        {
          description: "Medications – dose, frequency, compliance",
          points: 10,
        },
        {
          description: "Allergies",
          points: 10,
        },
        {
          description: "Social History - Smoking, Alcohol, Drugs",
          points: 10,
        },
        {
          description: "Family History – one generation (mother, father)",
          points: 10,
        },
        {
          description: "Patient's self-rated health status",
          points: 10,
        },
        {
          description: "Prevention and Health Promotion – age specific",
          points: 10,
        },
      ],
    },
    {
      name: "Review of Systems",
      items: [
        {
          description: "General/skin/sleep",
          points: 10,
        },
        {
          description: "HEENT",
          points: 10,
        },
        {
          description: "Respiratory",
          points: 10,
        },
        {
          description: "Cardiovascular",
          points: 10,
        },
        {
          description: "Musculoskeletal",
          points: 10,
        },
        {
          description: "Endocrine",
          points: 10,
        },
        {
          description: "Gastrointestinal and Urinary",
          points: 10,
        },
        {
          description: "Neuro/psych",
          points: 10,
        },
      ],
    },
    {
      name: "Physical Exam of Body Systems",
      items: [
        {
          description: "HEENT",
          points: 10,
        },
        {
          description: "Respiratory",
          points: 10,
        },
        {
          description: "Cardiovascular",
          points: 10,
        },
      ],
    },
    {
      name: "Diagnosis",
      items: [
        {
          description: "Patient provided a differential diagnosis",
          points: 10,
        },
        {
          description: "Patient provided a correct diagnosis",
          points: 10,
        },
      ],
    },
    {
      name: "Treatment Plan",
      items: [
        {
          description: "Provided a correct and complete treatment plan",
          points: 10,
        },
        {
          description: "Medications ordered correctly",
          points: 10,
        },
        {
          description: "Testing & Procedures ordered correctly",
          points: 10,
        },
      ],
    },
    {
      name: "Patient Interactions & Education",
      items: [
        {
          description: "Actively engaged and listened to the patient",
          points: 10,
        },
        {
          description: "Provided complete patient education",
          points: 10,
        },
        {
          description: "Asked if there were questions when concluding",
          points: 10,
        },
      ],
    },
  ],
};
