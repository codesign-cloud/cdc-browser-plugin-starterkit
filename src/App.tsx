import { useState } from 'preact/hooks'

export default function App() {
    const [count, setCount] = useState<number>(0)

    return (
        <div class="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white">
            <div class="max-w-md w-full space-y-8">
                <div class="text-center">
                    <h1 class="text-3xl font-bold mb-2">Preact + Tailwind</h1>
                    <p class="text-gray-400">Starter Kit</p>
                </div>

                <div class="bg-gray-900 rounded-lg p-8 text-center">
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold mb-4">Counter</h2>
                        <div class="text-4xl font-bold mb-6">{count}</div>
                        <div class="flex justify-center space-x-4">
                            <button
                                onClick={() => setCount(count + 1)}
                                class="bg-white text-black font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Increment
                            </button>
                            <button
                                onClick={() => setCount(0)}
                                class="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div class="text-center text-gray-500 text-sm">
                    <p>Edit <code class="bg-gray-800 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR</p>
                </div>
            </div>
        </div>
    )
}