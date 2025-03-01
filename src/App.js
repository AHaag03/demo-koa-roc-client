import React, { useState } from 'react';

const App = () => {
    const [responseData, setResponseData] = useState(null);

    const callAzureFunction = async () => {
        try {
            // Make a POST request to the Azure Function
            const response = await fetch('https://demo-koaa-roc.azurewebsites.net/api/ReactToNode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endpoint: '/', // Endpoint on your Node.js backend
                    method: 'POST', // HTTP method (GET, POST, etc.)
                    payload: { key: 'value' } // Data to send to your backend
                }),
            });

            if (!response.ok) {
                throw new Error(`Azure Function returned status: ${response.status}`);
            }

            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error("Error calling Azure Function:", error);
        }
    };

    return (
        <div>
            <h1>React to Azure Function Example</h1>
            <button onClick={callAzureFunction}>Call Azure Function</button>
            {responseData && (
                <pre>
                    <code>{JSON.stringify(responseData, null, 2)}</code>
                </pre>
            )}
        </div>
    );
};

export default App;