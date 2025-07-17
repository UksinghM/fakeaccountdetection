"use client";
import React, { useState } from "react";

const API_URL = "http://localhost:5000/api/analyze-image"; // Change if your backend URL is different

const DetectorPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
    setError("");
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to analyze image");
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthenticityColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-600";
  };

  const getConfidenceLevel = (score) => {
    if (score >= 80) return "High";
    if (score >= 60) return "Moderate";
    return "Low";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
      <div className="w-full max-w-3xl bg-black/70 border border-green-600 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-400 mb-2">Image Authenticity Detector</h1>
          <p className="text-green-200">Upload any image to check if it's been edited or altered</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="flex-1 border-2 border-dashed border-green-400 rounded-lg p-6 bg-black/60">
            {previewUrl ? (
              <div className="relative flex flex-col items-center">
                <img src={previewUrl} alt="Preview" className="w-64 h-64 object-contain rounded-lg mb-4 border-2 border-green-400" />
                <button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-2 rounded font-bold hover:bg-green-400"
                  onClick={() => document.getElementById("fileInput").click()}
                  type="button"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="mb-2 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={48} height={48} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-green-200">Drag & drop an image here</p>
                <p className="text-green-400 text-sm">or</p>
                <label htmlFor="fileInput" className="bg-green-500 text-black px-4 py-2 rounded font-bold hover:bg-green-400 cursor-pointer mt-2">
                  Browse Files
                </label>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <button
              className={`w-full py-3 px-4 rounded-lg bg-green-500 text-black font-bold shadow-lg hover:bg-green-400 transition-colors text-lg font-mono ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={analyzeImage}
              disabled={isLoading || !selectedFile}
              type="button"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block mr-2">&#9696;</span>
                  Analyzing...
                </>
              ) : (
                "Check Authenticity"
              )}
            </button>
            {error && <div className="text-red-400 bg-red-900/30 p-3 rounded-lg text-center font-mono mt-4">{error}</div>}
          </div>
        </div>

        {analysisResult && (
          <div className="bg-black/60 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center rounded-full w-24 h-24 mb-2 border-4 border-green-400 bg-white ${getAuthenticityColor(analysisResult.authenticity_score)}`}
                >
                  <span className="text-2xl font-bold text-black">
                    {analysisResult.authenticity_score}%
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-green-300 font-bold">Authenticity Score</h3>
                  <p
                    className={`font-bold ${
                      getConfidenceLevel(analysisResult.authenticity_score) === "High"
                        ? "text-green-400"
                        : getConfidenceLevel(analysisResult.authenticity_score) === "Moderate"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {getConfidenceLevel(analysisResult.authenticity_score)} confidence
                  </p>
                </div>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg flex-1">
                <h3 className="text-green-300 font-bold mb-2">Verdict:</h3>
                <p className="text-green-100">
                  {analysisResult.authenticity_score >= 60
                    ? "This image appears to be mostly authentic with minimal edits"
                    : "This image shows significant signs of editing or manipulation"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-green-300 font-bold mb-4">Detailed Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 p-4 rounded-lg">
                  <h4 className="text-green-200 font-bold mb-1">Editing Detection</h4>
                  <div className="text-lg font-mono mb-1">
                    {analysisResult.editing_detected ? "Detected" : "Not Detected"}
                  </div>
                  <div
                    className={`font-bold ${analysisResult.editing_detected ? "text-red-400" : "text-green-400"}`}
                  >
                    {analysisResult.editing_detected ? "Warning" : "Good"}
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-lg">
                  <h4 className="text-green-200 font-bold mb-1">Compression Artifacts</h4>
                  <div className="text-lg font-mono mb-1">
                    {analysisResult.compression_level}%
                  </div>
                  <div className="bg-gray-700 h-2 rounded mb-1">
                    <div
                      className="bg-green-400 h-2 rounded"
                      style={{ width: `${analysisResult.compression_level}%` }}
                    ></div>
                  </div>
                  <div
                    className={`font-bold ${analysisResult.compression_level > 30 ? "text-red-400" : "text-green-400"}`}
                  >
                    {analysisResult.compression_level > 30 ? "High" : "Low"}
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-lg">
                  <h4 className="text-green-200 font-bold mb-1">Metadata Consistency</h4>
                  <div className="text-lg font-mono mb-1">
                    {analysisResult.metadata_consistency ? "Consistent" : "Inconsistent"}
                  </div>
                  <div
                    className={`font-bold ${analysisResult.metadata_consistency ? "text-green-400" : "text-red-400"}`}
                  >
                    {analysisResult.metadata_consistency ? "Good" : "Warning"}
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-lg">
                  <h4 className="text-green-200 font-bold mb-1">Clone Detection</h4>
                  <div className="text-lg font-mono mb-1">
                    {analysisResult.clone_detected ? "Detected" : "Not Detected"}
                  </div>
                  <div
                    className={`font-bold ${analysisResult.clone_detected ? "text-red-400" : "text-green-400"}`}
                  >
                    {analysisResult.clone_detected ? "Warning" : "Good"}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-yellow-300 font-bold mb-2">Key Findings:</h3>
                <ul className="list-disc list-inside text-yellow-100">
                  {analysisResult.findings.map((finding, index) => (
                    <li key={index}>{finding}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-900/30 p-4 rounded-lg">
                <h3 className="text-yellow-300 font-bold mb-2">Recommendations:</h3>
                <p className="text-yellow-100">{analysisResult.recommendation}</p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center text-green-300 text-sm bg-red-900/20 p-3 rounded-lg">
          Note: This tool analyzes images for common signs of manipulation but cannot guarantee 100% accuracy.
        </footer>
      </div>
    </div>
  );
};

export default DetectorPage;