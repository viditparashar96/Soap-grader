import { downloadAndParsePDF } from "@/lib/download-parse-pdf";
import { gradeSOAPNotes } from "@/lib/grade-soap-notes";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { soapText, type, fileUrls } = await req.json();
    console.log("Type of notes: ", type);

    if (type === "text" && !soapText) {
      return NextResponse.json(
        { error: "SOAP Text is required" },
        { status: 400 }
      );
    }

    if (type === "file" && !fileUrls) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    const transcription = `
    Doctor: Good morning, I'm Dr. Smith. Can you please confirm your name and date of birth for me?

Patient: Good morning, Doctor. I'm Sarah Johnson, born on May 15, 1985.

Doctor: Thank you, Sarah. What brings you in today?

Patient: I've been having this persistent pain in my lower right abdomen for about two weeks now.

Doctor: I'm sorry to hear that. Can you tell me more about this pain? When did it start, and how would you describe it?

Patient: It started about two weeks ago. The pain is sharp and comes in waves. It's worse after eating, especially fatty foods. On a scale of 1 to 10, I'd say it's about a 7 when it's at its worst.

Doctor: Thank you for that detailed description. Have you experienced any other symptoms along with the pain?

Patient: Yes, I've been feeling nauseous, and I've vomited a couple of times. I've also noticed I'm more tired than usual.

Doctor: I see. Let's go through your medical history. Have you had any previous hospitalizations or surgeries?

Patient: I had my appendix removed when I was 15, and I gave birth to my daughter two years ago via C-section.

Doctor: Are you currently taking any medications?

Patient: I take a daily multivitamin and occasionally some ibuprofen for headaches.

Doctor: Do you have any allergies to medications or foods?

Patient: I'm allergic to penicillin – it gives me a rash.

Doctor: Thank you. Now, let's talk about your lifestyle. Do you smoke or drink alcohol?

Patient: I don't smoke, but I do have a glass of wine with dinner a couple of times a week.

Doctor: How about your family medical history? Any significant conditions in your parents or siblings?

Patient: My mother has high blood pressure, and my father had a heart attack in his 60s.

Doctor: How would you rate your overall health?

Patient: Before this pain started, I'd say I was in pretty good health. Maybe a 7 out of 10?

Doctor: That's good to hear. Let's talk about prevention. When was your last check-up, and are you up to date on screenings like mammograms and pap smears?

Patient: I had a check-up about 6 months ago, and yes, I'm up to date on my screenings.

Doctor: Excellent. Now, I'd like to go through a review of systems. Have you noticed any changes in your skin, sleep patterns, or overall energy levels?

Patient: My sleep has been a bit disrupted due to the pain, and I feel more tired than usual.

Doctor: Any issues with your eyes, ears, nose, or throat?

Patient: No, everything seems normal there.

Doctor: How about your breathing? Any shortness of breath or coughing?

Patient: No, my breathing is fine.

Doctor: And your heart? Any chest pain, palpitations, or swelling in your legs?

Patient: No heart issues that I've noticed.

Doctor: Any joint pain or muscle weakness?

Patient: No, just the abdominal pain.

Doctor: Have you noticed any changes in your appetite or thirst?

Patient: My appetite has decreased a bit due to the pain and nausea.

Doctor: How about your bowel movements and urination? Any changes there?

Patient: I've been a bit constipated lately, and I've noticed my urine is darker than usual.

Doctor: Any headaches, dizziness, or changes in mood?

Patient: I've had a few headaches, probably from the stress of dealing with this pain.

Doctor: Thank you for going through all of that with me. Now, I'd like to perform a physical examination, focusing on your abdomen. Is that alright with you?

Patient: Yes, that's fine.

[Doctor performs physical examination]

Doctor: Based on your symptoms and the examination, I suspect you might have gallstones, but we'll need to do some tests to confirm. I'd like to order an ultrasound of your abdomen and some blood tests.

Patient: Okay, that sounds reasonable. What should I expect next?

Doctor: I'll put in the order for the ultrasound and blood tests. Once we have the results, we'll discuss the diagnosis and treatment options. In the meantime, try to avoid fatty foods as they seem to trigger your pain. If the pain becomes severe or you develop a fever, please go to the emergency room immediately.

Do you have any questions for me?

Patient: What are the treatment options if it is gallstones?

Doctor: Treatment options can range from dietary changes to medication to dissolve the stones, or in some cases, surgery to remove the gallbladder. But let's not get ahead of ourselves – we'll discuss this in more detail once we have the test results.

Any other questions?

Patient: No, I think that covers everything. Thank you, Doctor.

Doctor: You're welcome, Sarah. The nurse will be in shortly to draw your blood and give you instructions for the ultrasound. Take care, and we'll be in touch soon with the results.

    `;

    let response;

    if (type === "file") {
      const results = [];
      for (const fileUrl of fileUrls) {
        console.log("Processing File URL: ", fileUrl);
        try {
          const pdfText = await downloadAndParsePDF(fileUrl);
          const gradeResult = await gradeSOAPNotes(pdfText, transcription);
          results.push({ fileUrl, gradeResult });
        } catch (error) {
          console.error(`Error processing ${fileUrl}:`, error);
          results.push({ fileUrl, error: "Failed to process file" });
        }
      }
      response = results;
      console.log("Results: ", results);
    } else {
      response = await gradeSOAPNotes(soapText, transcription);
    }

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
