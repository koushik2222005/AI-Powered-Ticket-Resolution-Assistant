import React, { useState } from 'react';

function App() {
  const [ticketDetails, setTicketDetails] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateResolution = async () => {
    if (!ticketDetails) return alert("Please enter ticket details!");
    
    setLoading(true);
    setResult(null); // Clear previous results

    try {
      const response = await fetch('http://127.0.0.1:8000/solve-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details: ticketDetails }),
      });

      const data = await response.json();
      console.log("Backend Response:", data); // Helpful for debugging
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({
        suggested_team: "Connection Error",
        understanding: "Could not reach the backend server.",
        preparation: "Ensure main.py is running on port 8000.",
        steps: ["Check network connectivity", "Verify FastAPI status"],
        final_result: "Failed to fetch."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-500 tracking-tight">AI TICKET SOLVER</h1>
        <p className="text-gray-400 mt-2">Instant technical resolution plans powered by AI</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Input */}
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-blue-600 font-bold mb-4 uppercase tracking-wider">Incoming Ticket</h2>
          <textarea
            className="w-full h-64 p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all resize-none text-lg"
            placeholder="Paste technical logs or issue description here..."
            value={ticketDetails}
            onChange={(e) => setTicketDetails(e.target.value)}
          />
          <button
            onClick={generateResolution}
            disabled={loading}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? "ANALYZING..." : "GENERATE RESOLUTION PLAN"}
          </button>
        </div>

        {/* Right Side: Output */}
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
          {result ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <div className="bg-blue-600 p-2 rounded-lg">🤖</div>
                <div>
                  <p className="text-xs text-blue-400 font-bold uppercase">Recommended Routing</p>
                  <p className="text-xl font-bold text-white">{result.suggested_team}</p>
                </div>
              </div>

              <section>
                <h3 className="text-blue-400 font-bold flex items-center mb-2">
                  <span className="bg-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full mr-2">1</span>
                  CORE UNDERSTANDING
                </h3>
                <p className="text-gray-300 leading-relaxed pl-7">{result.understanding}</p>
              </section>

              <section>
                <h3 className="text-blue-400 font-bold flex items-center mb-2">
                  <span className="bg-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full mr-2">2</span>
                  PRE-FIX PREPARATION
                </h3>
                <p className="text-gray-300 leading-relaxed pl-7">{result.preparation}</p>
              </section>

              <section>
                <h3 className="text-blue-400 font-bold flex items-center mb-2">
                  <span className="bg-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full mr-2">3</span>
                  STEP-BY-STEP RESOLUTION
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 pl-7">
                  {result.steps?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </section>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-green-400 font-bold uppercase text-xs mb-1 italic">4. Expected Outcome</p>
                <p className="text-gray-100 font-medium">{result.final_result}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 italic">
              {loading ? (
                <div className="animate-pulse text-blue-400">AI is analyzing the infrastructure logs...</div>
              ) : (
                "Waiting for ticket analysis..."
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;