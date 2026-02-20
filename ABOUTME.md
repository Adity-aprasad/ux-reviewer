# About This Project

UX Reviewer AI is a full-stack web app that uses Gemini AI to automatically review the UX quality of any public webpage.

---

## Built By

**Aditya Raj Prasad**
Software Development Engineer (SDE 1) — Full Stack & Mobile

📧 adityarajprasad882@gmail.com
📞 +91-7520227359
🔗 [GitHub](https://github.com) | [LinkedIn](https://linkedin.com)

### About Me

Software Development Engineer with 10 months of hands-on experience building and scaling production-grade web and mobile applications. Strong foundation in JavaScript, React.js, React Native, backend systems, REST APIs, and scalable architecture. Passionate about building reliable and impactful software products.

### Experience

**Software Engineer (Mobile) — GeekyAnts, Bengaluru** *(May 2025 – Present)*
- Developed and shipped production-grade React Native features for Android and iOS.
- Engineered a real-time chat system using Firebase Authentication and Realtime Database.
- Built appointment scheduling modules improving booking efficiency by 40%.

**Frontend Developer Intern — Coal India, Ranchi** *(Aug 2023 – Sep 2023)*
- Built React dashboards integrating 3+ internal APIs.
- Implemented filtering and search, reducing retrieval time by 50%.

### Education

**Vellore Institute of Technology, Vellore** — B.Tech in Computer Science & Engineering *(2021 – 2025)*

---

## Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, React Router  |
| Backend   | Node.js, Express              |
| Scraping  | Cheerio                       |
| AI        | Google Gemini API             |
| Storage   | Local JSON file               |

## Design Decisions

- **File-based storage** — keeps things simple, no database needed for a side project
- **Vite proxy** — frontend proxies `/api/*` to the backend, avoiding CORS issues in dev
- **Cheerio over Puppeteer** — faster and lighter; full browser rendering isn't needed for most sites
- **Dark theme** — easier on the eyes for a dev tool
- **Gemini Flash** — fast and free tier friendly, ideal for rapid UX analysis