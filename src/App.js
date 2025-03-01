import React, { useState } from 'react';

const App = () => {
    const [responseData, setResponseData] = useState(null);

    const getData = async () => {
        try {
            // Send a GET request to the Azure Function
            const response = await fetch('https://demo-koaa-roc.azurewebsites.net/api/ReactToNode');
            if (!response.ok) {
                throw new Error(`Azure Function returned status: ${response.status}`);
            }

            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <h1>React + Azure Functions + Node.js Example</h1>
            <button onClick={getData}>Get Data</button>
            {responseData && (
                <pre>
                    <code>{JSON.stringify(responseData, null, 2)}</code>
                </pre>
            )}
        </div>
    );
};

export default App;