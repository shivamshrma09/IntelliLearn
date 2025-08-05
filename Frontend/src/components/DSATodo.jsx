import React, { useState } from "react";
import { Send, Upload } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const LeetCodeTracker = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [error, setError] = useState("");
  const [chat, setChat] = useState([]);       // [{question, answer}]
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyBT9qazHDn2OdwUaAjYFpzbXIsTioc1ovY");

  const isFileUploaded = file !== null;
  const isReadyToSend = file && text;

  const handleTextChange = (e) => {
    if (!isFileUploaded) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    }
    setText(e.target.value);
  };

  const handleFileChange = async (event) => {
    setError("");
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileUrl(selectedFile ? URL.createObjectURL(selectedFile) : "");

    if (selectedFile) {
      try {
        const text = await extractTextFromPdf(selectedFile);
        setPdfText(text);
        if (!text.trim()) {
          setError("PDF में कोई text नहीं मिला। यह scanned PDF हो सकती है।");
        }
      } catch (err) {
        setError("PDF फाइल पढ़ने में समस्या आ रही है: " + err.message);
      }
    }
  };

  // PDF text extraction logic
  const extractTextFromPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let textOutput = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      textOutput += pageText + "\n";
    }
    return textOutput;
  };

  const handleSubmit = async () => {
    if (!text) return;

    setIsLoading(true);
    const prompt = `You are a tutor. Use this content to answer the user's question: "${pdfText}" Question: "${text}"`;
    
    let responseText = "";
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      responseText = result.response.text() || "No answer received.";
    } catch (err) {
      responseText = "Sorry, something went wrong.";
    } finally {
      setChat((prev) => [
        ...prev,
        { question: text, answer: responseText }
      ]);
      setText(""); // Clear input
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-inter antialiased ml-[250px]">
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white text-xl font-semibold py-4 px-6 shadow-md">
        IntelliLearn Chat
      </div>

      {showAlert && (
        <div className="fixed top-[120px] left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 border border-red-500 px-4 py-2 rounded-md shadow-md z-50">
          ⚠️ First upload the file, then chat with AI.
        </div>
      )}

      {error && (
        <div className="fixed top-[160px] left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 border border-red-500 px-4 py-2 rounded-md shadow-md z-50">
          {error}
        </div>
      )}

      {/* PDF Open Button */}
      {fileUrl && (
        <div className="px-6 py-4 bg-gray-100 rounded-md m-4 max-w-lg flex justify-center">
          <button
            onClick={() => window.open(fileUrl, "_blank")}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Open PDF in New Tab
          </button>
        </div>
      )}

      {/* Chat interface */}
      <div className="flex flex-col flex-1 px-6 py-4 bg-gray-50 overflow-y-auto space-y-4">
        {chat.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">Start chatting after uploading your PDF!</div>
        ) : (
          chat.map((msg, idx) => (
            <div key={idx} className="space-y-3">
              {/* User message - Right side */}
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[70%] shadow-sm">
                  <p className="text-sm">{msg.question}</p>
                </div>
              </div>
              {/* AI message - Left side */}
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 max-w-[70%] shadow-sm">
                  <p className="text-sm whitespace-pre-wrap">{msg.answer}</p>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-500 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="border-t bg-white p-4 shadow-inner">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-purple-600 transition">
            <Upload className="w-5 h-5" />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf"
            />
            {file ? file.name : "Upload File"}
          </label>

          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type your question here..."
            disabled={!isFileUploaded}
            className="flex-1 p-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-gray-100"
            rows={2}
          />

          {isReadyToSend && !isLoading && (
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeTracker;
