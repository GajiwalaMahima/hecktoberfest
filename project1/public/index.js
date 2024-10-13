document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    // Create the form
    const form = document.createElement('form');
    form.id = 'urlForm';
    form.innerHTML = `
        <input type="url" id="originalUrl" placeholder="Enter URL to shorten" required>
        <button type="submit">Shorten URL</button>
    `;

    // Create a div to display results
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';

    // Append form and resultDiv to the app div
    app.appendChild(form);
    app.appendChild(resultDiv);

    // Handle form submission
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const originalUrl = document.getElementById('originalUrl').value;
        const resultDiv = document.getElementById('result');

        try {
            // Send a POST request to the API to shorten the URL
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl })
            });

            const data = await response.json();

            // Check if the URL was successfully shortened
            if (response.ok) {
                const shortUrl = data.shortUrl;
                resultDiv.innerHTML = `
                    <p>Shortened URL: <a href="/${shortUrl}" target="_blank">${shortUrl}</a></p>
                `;
            } else {
                resultDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
            }

        } catch (error) {
            resultDiv.innerHTML = `<p style="color: red;">Something went wrong: ${error.message}</p>`;
        }
    });
});