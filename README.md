# Blog Site Instructions

## How to Add a New Blog Post

1. **Create the Blog Post HTML File**
   - Create a new `.html` file in the `thoughts` directory
   - Name it something descriptive using kebab-case (e.g., `my-new-post.html`)
   - Copy the entire content of an existing post (like `starbucks-coffee-bank.html`) to use as a template
   - Update these key elements in the new file:
     - Change the `<title>` tag in the `<head>` section
     - Replace the `<h1>` heading with your new title
     - Replace the content in the `<div class="thought-content">` section with your new blog post
     - Keep all the styling, nav, and footer sections exactly as they are

2. **Add Link to Thoughts Page**
   - Open `thoughts.html`
   - Add a new `<li>` entry in the `<ul class="thoughts-list">` section
   - Follow this format:
     ```html
     <li><a href="thoughts/your-new-file-name.html">Your Blog Post Title</a></li>
     ```
   - Add it at the top of the list since entries are ordered chronologically (newest at top, oldest at bottom)

**Pro tip:** Keep `starbucks-coffee-bank.html` as your template file since it's the most recent and has all the current styling.


