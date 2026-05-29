# Victory Village Education Hub

The **Victory Village Education Hub** is a fast, responsive, markdown-based web application designed to provide educational resources and guidance to the residents of Victory Village.

## Features
* **Markdown Viewer:** Content is stored as simple `.md` files in the `projects/` directory and rendered dynamically on the client side using marked.js.
* **Mobile-Friendly:** Fully responsive design with a mobile sidebar menu.
* **Maroon & White Theme:** Customized to match the Victory Village branding.
* **Initial Loader:** Features the Victory Village logo and a motivational quote.

## Content Available
The hub currently indexes information on the following topics:
1. **Bridging (No Grade 9):** How to complete ABET Level 4.
2. **Adult Matric Registration:** Requirements for the Amended Senior Certificate.
3. **Matric Subject Choices:** Compulsory and elective options.
4. **Summary of Costs:** Financial planning for ID replacements, exams, and study materials.
5. **Study Guides & Resources:** Where to find free "Mind the Gap" guides and commercial options.
6. **The GED:** Pros and cons of the American high school equivalent in South Africa.

## How to Run Locally
1. Clone the repository.
2. Open a terminal in the root directory.
3. Start a local server. For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`.

## Deployment
This project is linked and deployed via [Vercel](https://vercel.com/). It is built to serve entirely static files and requires no backend or build step other than Vercel's standard static file hosting.
