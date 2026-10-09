import { useState, type ChangeEvent } from "react";

interface AIResponse {
  result?: string;
  message?: string;
}

function AISchedule() {
  // Store the user's prompt
  const [prompt, setPrompt] = useState<string>("");

  // Store Gemini's response
  const [result, setResult] = useState<string | null>(null);

  // Track whether the request is running
  const [loading, setLoading] = useState<boolean>(false);

  // Store any error message
  const [error, setError] = useState<string | null>(null);

  // Type the input change event
  const handlePromptChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setPrompt(e.target.value);
  };

  const handleGenerate = async (): Promise<void> => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data: AIResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Failed to generate a schedule."
        );
      }

      setResult(data.result ?? "No result returned.");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-schedule">
      <h2>AI Schedule Assistant</h2>

      <input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Example: Meeting with John tomorrow at 2 PM"
        disabled={loading}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Thinking..." : "Generate"}
      </button>

      {error && (
        <p className="ai-error" role="alert">
          {error}
        </p>
      )}

      {result !== null && (
        <div className="ai-result">
          <h3>AI Result</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default AISchedule;
