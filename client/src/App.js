import { useState } from "react";
import { Chrono } from "react-chrono";
import axios from "axios";

export default function NewsTimelineApp() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await axios.get(`http://localhost:5000/api/news?query=${searchTerm}`);
            setResults(response.data);
        } catch (error) {
            setError("Failed to fetch news articles.");
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 bg-black text-white font-mono">
            <div className="flex gap-2">
                <input 
                    className="border p-2 w-full bg-gray-900 text-white rounded-lg" 
                    placeholder="Search for news..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="bg-blue-600 hover:bg-blue-400 px-4 py-2 rounded-lg" onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {results.map((article) => (
                <div key={article.url} className="p-4 bg-gray-800 rounded-lg mt-2">
                    <h2 className="text-lg font-semibold">{article.title}</h2>
                </div>
            ))}

            <Chrono items={timeline} mode="VERTICAL_ALTERNATING" />
        </div>
    );
}
