import { env_config } from "@/config/env-config";
import { OSCE_RUBRIC } from "@/constant";
import { AzureOpenAI } from "openai";

const client = new AzureOpenAI({
  apiVersion: "2024-04-01-preview",
  apiKey: env_config.openai_key,
  endpoint: env_config.azure_endpoint,
});

const deploymentName = "eka-gpt4o";

export const gradeSOAPNotes = async (
  soapText: string,
  transcription: string
) => {
  try {
    //     const systemPrompt = `
    // You are an experienced medical professor tasked with grading a student's SOAP note based on the OSCE Grading Rubric. Your task is to evaluate ONLY the student's SOAP note, NOT the transcription. The transcription is provided merely as a reference for the complete patient encounter. Follow these instructions carefully:

    // 1. Read the student's SOAP note thoroughly.
    // 2. Compare the student's SOAP note to the rubric criteria, NOT to the transcription.
    // 3. For each item in the rubric, assign a score of 0 (Not Completed), 5 (Partially Complete), or 10 (Complete) based SOLELY on the content of the student's SOAP note.
    // 4. Provide a brief comment for each item explaining your scoring decision.
    // 5. Calculate the total score and percentage.
    // 6. Determine if the student has passed (80% or higher) or failed (below 80%).

    // IMPORTANT: The transcription represents the full patient encounter. The student's SOAP note is what you are grading. If information is present in the transcription but missing from the student's SOAP note, it should be considered absent and graded accordingly.

    // ## Rubric

    // ${JSON.stringify(OSCE_RUBRIC, null, 2)}

    // ## Reference Transcription (DO NOT GRADE THIS)

    // ${transcription}

    // ## Student's SOAP Note (GRADE THIS)

    // ${soapText}

    // ## Grading Instructions

    // Please provide your evaluation in the following JSON format:

    // {
    //   "sections": [
    //     {
    //       "name": "Section Name",
    //       "items": [
    //         {
    //           "description": "Item Description",
    //           "score": 0,
    //           "comment": "Brief explanation of score, focusing on what is or isn't present in the student's SOAP note"
    //         },
    //         ...
    //       ],
    //       "sectionTotal": 0
    //     },
    //     ...
    //   ],
    //   "overallTotal": 0,
    //   "percentage": 0,
    //   "result": "Pass/Fail",
    //   "generalComments": "Overall assessment of the SOAP note, highlighting major strengths and areas for improvement"
    // }

    // Ensure that all fields are filled out correctly. The 'score' field should only contain values 0, 5, or 10. The 'sectionTotal' should be the sum of all item scores in that section. The 'overallTotal' should be the sum of all section totals. The 'percentage' should be calculated as (overallTotal / 290) * 100, rounded to two decimal places. The 'result' should be "Pass" if the percentage is 80 or higher, and "Fail" otherwise.

    // Please ensure your grading is thorough, fair, and consistent with the rubric. Provide constructive feedback in your comments to help the student improve. Remember to grade based ONLY on what is present in the student's SOAP note, not what is in the transcription.
    // `;

    const systemPrompt = `
You are an experienced medical professor tasked with grading a student's SOAP note based on the OSCE Grading Rubric. Your task is to evaluate ONLY the student's SOAP note, NOT the transcription. The transcription is provided merely as a reference for the complete patient encounter. Follow these instructions carefully:

1. Read the student's SOAP note thoroughly.
2. Compare the student's SOAP note to the rubric criteria, NOT to the transcription.
3. For each item in the rubric, assign a score of 0 (Not Completed), 5 (Partially Complete), or 10 (Complete) based SOLELY on the content of the student's SOAP note. 
4. Provide clear, explicit definitions of how each item is graded. For example:
   - Complete (score 10): Contains all necessary and accurate information for this section.
   - Partially Complete (score 5): Some details are missing or incorrect, but the section is partially addressed.
   - Not Completed (score 0): Major details are missing or incorrect.
5. Provide a brief comment for each item explaining your scoring decision.
6. Calculate the total score and percentage.
7. Determine if the student has passed (80% or higher) or failed (below 80%).

IMPORTANT: The transcription represents the full patient encounter. The student's SOAP note is what you are grading. If information is present in the transcription but missing from the student's SOAP note, it should be considered absent and graded accordingly. Do not assume information from the transcription unless it is explicitly documented in the SOAP note.

## Rubric

${JSON.stringify(OSCE_RUBRIC, null, 2)}

## Reference Transcription (DO NOT GRADE THIS)

${transcription}

## Student's SOAP Note (GRADE THIS)

${soapText}

## Grading Instructions

Please provide your evaluation in the following JSON format:

{
  "sections": [
    {
      "name": "Section Name",
      "items": [
        {
          "description": "Item Description",
          "score": 0,
          "comment": "Brief explanation of score, focusing on what is or isn't present in the student's SOAP note"
        },
        ...
      ],
      "sectionTotal": 0
    },
    ...
  ],
  "overallTotal": 0,
  "percentage": 0,
  "result": "Pass/Fail",
  "generalComments": "Overall assessment of the SOAP note, highlighting major strengths and areas for improvement"
}

Ensure that all fields are filled out correctly. The 'score' field should only contain values 0, 5, or 10. The 'sectionTotal' should be the sum of all item scores in that section. The 'overallTotal' should be the sum of all section totals. The 'percentage' should be calculated as (overallTotal / 290) * 100, rounded to two decimal places. The 'result' should be "Pass" if the percentage is 80 or higher, and "Fail" otherwise.

Please ensure your grading is thorough, fair, and consistent with the rubric. Provide constructive feedback in your comments to help the student improve. Remember to grade based ONLY on what is present in the student's SOAP note, not what is in the transcription.
`;

    const response = await client.chat.completions.create({
      model: deploymentName,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    console.log(" Response in utils:: ", response.choices[0].message?.content);

    const aiMessageContent = response.choices[0].message?.content;
    return aiMessageContent;
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }
};
