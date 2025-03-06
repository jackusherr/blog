const fs = require('fs');
const csv = require('csv-parse');
const axios = require('axios');
const path = require('path');

// Function to fetch book data from Open Library API
async function fetchBookData(isbn) {
    try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const bookData = response.data[`ISBN:${isbn}`];
        
        if (!bookData) {
            console.log(`No data found for ISBN: ${isbn}`);
            return null;
        }

        return {
            title: bookData.title,
            author: bookData.authors[0].name,
            coverUrl: bookData.cover?.large || bookData.cover?.medium || null,
            description: bookData.description?.value || bookData.description || 'No description available.',
            isbn: isbn
        };
    } catch (error) {
        console.error(`Error fetching data for ISBN ${isbn}:`, error.message);
        return null;
    }
}

// Function to generate HTML for a book section
function generateBookSection(bookData) {
    const id = bookData.isbn.replace(/-/g, '');
    return `
    <li>
      <a onclick="toggleReview('${id}')"><strong><em>${bookData.title}</em></strong>, ${bookData.author}</a>
      <div id="${id}" class="book-review">
        <div class="review-content">
          <div class="review-row"><strong>Date Read:</strong> ${bookData.dateRead || 'Not specified'}</div>
          <div class="review-row"><strong>Rating:</strong> ${bookData.rating || 'Not rated'}</div>
          <div class="review-row"><strong>Thoughts:</strong> ${bookData.thoughts || bookData.description}</div>
        </div>
        ${bookData.coverUrl ? `<img src="${bookData.coverUrl}" alt="Cover of ${bookData.title}" class="review-image">` : ''}
      </div>
    </li>`;
}

// Main function to process the CSV and generate HTML
async function processBooks() {
    const books = [];
    const parser = fs
        .createReadStream('booklist goodreads.csv')
        .pipe(csv.parse({
            columns: true,
            skip_empty_lines: true
        }));

    for await (const record of parser) {
        if (record.ISBN) {
            const bookData = await fetchBookData(record.ISBN);
            if (bookData) {
                // Add any additional data from the CSV
                bookData.dateRead = record['Date Read'];
                bookData.rating = record['Rating'];
                bookData.thoughts = record['Thoughts'];
                books.push(bookData);
            }
        }
    }

    // Generate HTML sections
    const htmlSections = books.map(book => generateBookSection(book)).join('\n');

    // Read the existing books.html template
    const templatePath = path.join(__dirname, 'books.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    // Replace the placeholder with generated sections
    htmlContent = htmlContent.replace(
        /<!-- Add more books here as you read them -->/,
        htmlSections
    );

    // Write the updated HTML back to the file
    fs.writeFileSync(templatePath, htmlContent);
    console.log('Book sections have been generated successfully!');
}

// Run the script
processBooks().catch(console.error);
