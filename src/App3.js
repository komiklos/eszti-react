import { useState } from 'react';
import Gallery from "./pages/portfolio/Gallery";

// Think of this as your main MaterialApp
function App() {
    // State management similar to ValueNotifier
    const [selectedCategory, setSelectedCategory] = useState('portraits');

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Category selector - similar to a SegmentedButton */}
            <div className="p-4 bg-white shadow">
                <button
                    onClick={() => setSelectedCategory('portraits')}
                    className="mr-4 px-4 py-2 rounded bg-blue-500 text-white"
                >
                    Portraits
                </button>
                <button
                    onClick={() => setSelectedCategory('landscapes')}
                    className="px-4 py-2 rounded bg-green-500 text-white"
                >
                    Landscapes
                </button>
            </div>

            {/* Using our Gallery widget */}
            <Gallery category={selectedCategory} />
        </div>
    );
}

export default App;