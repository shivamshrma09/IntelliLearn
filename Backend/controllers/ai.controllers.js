const aiServices = require("../services/ai.services");

module.exports.getresponse = async (req, res) => {
  try {
    const { type, course } = req.query;

    if (!type || !course) {
      return res.status(400).json({ message: "Both 'type' and 'course' query parameters are required." });
    }

    const validTypes = ['internship', 'hackathon'];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({ message: "Invalid 'type' parameter. Must be 'internship' or 'hackathon'." });
    }

    let promptForAI = '';
    let jsonSchemaDescription = '';
    const lowerCaseType = type.toLowerCase();

    // Define common schema structure for better prompt clarity
    const commonItemSchema = {
      name: "string (e.g., 'Software Dev Intern')",
      organization: "string (e.g., 'TCS', 'Flipkart')",
      description: "string (a brief, 1-2 sentence description)",
      location: "string (e.g., 'Bangalore', 'Delhi-NCR', 'Remote')",
      sourcePlatform: "string (e.g., 'Unstop', 'LinkedIn Jobs', 'Devpost')",
      link: "string (a realistic placeholder or example URL for application/registration)",
      eligibility: "string (e.g., 'B.Tech CS 3rd year', 'Any student pursuing relevant degree')",
      image: "string (a placeholder image URL, e.g., 'https://via.placeholder.com/400x200?text=Opportunity')"
    };

    if (lowerCaseType === 'internship') {
      promptForAI = `Generate a list of exactly 10 relevant ${course} internships currently available or upcoming in **India**.
      Focus on providing high-quality, realistic data for each field.
      Each item in the list should be a JSON object with the following keys and appropriate values:
      - name: string (e.g., 'Machine Learning Intern')
      - organization: string (e.g., 'Infosys', 'Wipro')
      - description: string (a brief, 1-2 sentence description of the role/responsibilities)
      - location: string (e.g., 'Bengaluru', 'Pune', 'Remote - India')
      - sourcePlatform: string (the platform where it's likely found, e.g., 'Unstop', 'LinkedIn Jobs', 'Internshala', 'Company Website')
      - stipend: string (e.g., 'INR 25,000/month', 'Unpaid', 'Competitive')
      - applicationDeadline: string (a plausible future deadline in 'Month Day, Year' format, e.g., 'August 15, 2025' or 'Rolling applications')
      - eligibility: string (e.g., 'B.E./B.Tech in CS/IT', 'Final year students')
      - link: string (a plausible example URL for applying, e.g., 'https://careers.example.com/jobid')
      - skills: array of strings (e.g., ['Python', 'Data Analysis', 'SQL', 'Machine Learning'])
      - image: string (a placeholder image URL related to the opportunity, e.g., 'https://via.placeholder.com/400x200?text=Internship')

      Provide ONLY a JSON array as your response. Do not include any other text, explanations, or code outside the JSON block. Ensure exactly 10 distinct, well-formed JSON objects are in the array.
      `;
      jsonSchemaDescription = JSON.stringify([
        {
          ...commonItemSchema,
          stipend: "string (e.g., 'INR 25,000/month', 'Unpaid')",
          applicationDeadline: "string (e.g., 'August 15, 2025', 'Rolling')",
          skills: "array of strings (e.g., ['Python', 'Machine Learning', 'SQL'])"
        }
      ], null, 2);
    } else if (lowerCaseType === 'hackathon') {
      promptForAI = `Generate a list of exactly 10 relevant ${course} hackathons currently available or upcoming in **India**.
      Focus on providing high-quality, realistic data for each field.
      Each item in the list should be a JSON object with the following keys and appropriate values:
      - name: string (e.g., 'Smart India Hackathon')
      - organization: string (e.g., 'Ministry of Education, Govt. of India', 'IIT Bombay')
      - description: string (a brief, 1-2 sentence description of the theme/focus)
      - location: string (e.g., 'Online', 'Hybrid - Delhi', 'Mumbai')
      - sourcePlatform: string (the platform where it's likely found, e.g., 'Devpost', 'Unstop', 'Major League Hacking')
      - registrationDeadline: string (a plausible future deadline in 'Month Day, Year' format, e.g., 'July 30, 2025' or 'No specific deadline')
      - eventDates: string (the dates of the event, e.g., 'August 1-3, 2025' or 'Ongoing until September')
      - eligibility: string (e.g., 'Open to all Indian students', 'Teams of 2-4')
      - prizePool: "string (e.g., 'INR 1,00,000 + goodies', 'Job interview opportunities', 'No monetary prizes')"
      - link: "string (a plausible example URL for registration, e.g., 'https://hackathon.example.com/register')"
      - themes: "array of strings (e.g., ['FinTech', 'Healthcare AI', 'Sustainability', 'Web3'])"
      - image: "string (a placeholder image URL related to the hackathon, e.g., 'https://via.placeholder.com/400x200?text=Hackathon')"

      Provide ONLY a JSON array as your response. Do not include any other text, explanations, or code outside the JSON block. Ensure exactly 10 distinct, well-formed JSON objects are in the array.
      `;
      jsonSchemaDescription = JSON.stringify([
        {
          ...commonItemSchema,
          registrationDeadline: "string (e.g., 'July 30, 2025')",
          eventDates: "string (e.g., 'August 1-3, 2025')",
          prizePool: "string (e.g., 'INR 1,00,000 + goodies')",
          themes: "array of strings (e.g., ['FinTech', 'Healthcare AI'])"
        }
      ], null, 2);
    }

    const finalPrompt = `${promptForAI}\n\nExample JSON structure:\n\`\`\`json\n${jsonSchemaDescription}\n\`\`\``;

    console.log("Sending prompt to AI:\n", finalPrompt);

    const aiRawResponse = await aiServices.generateResponse(finalPrompt);

    let jsonString = aiRawResponse;
    // Tweak the regex to be less greedy if necessary, but this one is generally robust
    // It captures everything between the first ```json and the *last* ```
    const jsonMatch = aiRawResponse.match(/```json\n?([\s\S]*?)```(?!\S)/); 
    // If the AI sometimes omits the ending ```, this fallback is crucial
    if (jsonMatch && jsonMatch[1]) {
        jsonString = jsonMatch[1].trim(); 
    } else {
        // Fallback if no code block markers are found. 
        // Try to find the start of a JSON array/object and the end, then trim.
        // This is a more aggressive fallback for severely malformed responses.
        const firstBracket = aiRawResponse.indexOf('[');
        const lastBracket = aiRawResponse.lastIndexOf(']');
        const firstBrace = aiRawResponse.indexOf('{');
        const lastBrace = aiRawResponse.lastIndexOf('}');

        if (firstBracket !== -1 && lastBracket > firstBracket) {
            jsonString = aiRawResponse.substring(firstBracket, lastBracket + 1);
        } else if (firstBrace !== -1 && lastBrace > firstBrace) { // In case it's a single object (less likely for this prompt)
            jsonString = aiRawResponse.substring(firstBrace, lastBrace + 1);
        } else {
            jsonString = aiRawResponse.trim(); // Just trim whitespace as a last resort
        }
        console.warn("AI Controller: JSON code block delimiters not found. Attempting lenient extraction.");
    }

    let parsedAiResponse;
    try {
      parsedAiResponse = JSON.parse(jsonString); // Parse the cleaned string

      if (!Array.isArray(parsedAiResponse)) {
        console.warn('AI did not return a valid JSON array after cleaning:', jsonString);
        throw new Error("AI response was not a valid JSON array after cleaning. Please try refining your query.");
      }
      
      // We expect 10 items, but don't hard fail if it's not exact.
      if (parsedAiResponse.length === 0) {
        console.warn('AI returned an empty array after cleaning.');
        // Optionally, throw an error or return a specific message for empty array
      } else if (parsedAiResponse.length !== 10) {
          console.warn(`AI returned ${parsedAiResponse.length} items, expected 10. Sending what was received.`);
      }

    } catch (parseError) {
      console.error('AI Controller: Failed to parse cleaned AI response as JSON:', parseError);
      return res.status(500).json({
        message: "AI did not return a valid JSON response after internal cleaning. It might still contain malformed JSON or unexpected characters.",
        rawAiResponse: aiRawResponse, // Still include raw response for detailed debugging
        cleanedStringAttempt: jsonString // Show what was *attempted* to be parsed
      });
    }

    res.json(parsedAiResponse);

  } catch (error) {
    console.error('AI Controller Error:', error);
    if (error.message.includes('Generated response was empty')) {
      return res.status(500).json({ message: "AI service generated an empty response." });
    }
    if (error.message.includes('API key not valid') || error.message.includes('AUTHENTICATION_ERROR')) {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing API key for AI service. Please check your key." });
    }
    res.status(500).json({ message: "Error processing your request.", details: error.message });
  }
};