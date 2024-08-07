document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const searchButton = document.getElementById('search-button');
    const authorSearchInput = document.getElementById('author-search');

    async function fetchQuote(author = '') {
        let apiUrl = 'https://api.quotable.io/random';
        if (author) {
            // Ensure template literal is properly closed
            apiUrl = `https://api.quotable.io/quotes?author=${encodeURIComponent(author)}`;
        }
        console.log('Fetching from URL:', apiUrl); // Debugging line
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log('API response:', data); // Debugging line

            if (author) {
                // If searching by author, handle the different API response
                if (data.results && data.results.length > 0) {
                    const quoteData = data.results[Math.floor(Math.random() * data.results.length)];
                    quoteElement.textContent = quoteData.content;
                    authorElement.textContent = `- ${quoteData.author}`;
                } else {
                    quoteElement.textContent = 'No quotes found for this author.';
                    authorElement.textContent = '';
                }
            } else {
                // If fetching a random quote, handle the standard response
                quoteElement.textContent = data.content;
                authorElement.textContent = `- ${data.author}`;
            }
        } catch (error) {
            console.error('Error fetching the quote:', error);
            quoteElement.textContent = 'An error occurred. Please try again.';
            authorElement.textContent = '';
        }
    }

    newQuoteButton.addEventListener('click', function() {
        fetchQuote();
    });

    searchButton.addEventListener('click', function() {
        const author = authorSearchInput.value.trim();
        if (author) {
            fetchQuote(author);
        }
    });

    // Fetch a quote when the page loads
    fetchQuote();
});