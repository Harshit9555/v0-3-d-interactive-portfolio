export async function GET() {
  const resumeContent = `HARSHIT MISHRA
(+91) 9555483658 • Salempur (Deoria), Uttar Pradesh
harshitmishra8953@gmail.com • LinkedIn • LeetCode

PROFESSIONAL SUMMARY
A results-driven Computer Science Engineering student with a strong foundation in Data Structures & Algorithms and proven expertise in full-stack development. Adept at building, testing, and deploying scalable web applications. Seeking to leverage analytical problem-solving skills, strong communication, and a collaborative spirit, along with a passion for clean code, to contribute to an innovative software engineering team.

EDUCATION
Chandigarh University, Gharuan, Punjab, India | 2023 - Present
Bachelor of Engineering in Computer Science and Engineering

St. Xavier's School, Salempur, Deoria, India | 2018 – 2022
Class X and Class XII (CBSE Board)

SKILLS
Technical Skills: C++, C, JavaScript, React, Node.js, PostgreSQL, Bootstrap CSS, React.js
Interpersonal Skills: Communication, Teamwork, Adaptability, Time Management

PROJECTS
AnonSathi – Mental Well-being Web Application | React.js, Node.js, Firebase, OpenAI API | June 2025
• Built a web platform to support mental well-being by enabling users to connect anonymously with certified coaches.
• Designed a clean and responsive UI for stress tracking, journaling, and mindfulness exercises.
• Implemented secure user authentication and data storage using Firebase.

Workers Hire Website | HTML, CSS, JavaScript, Node.js, PostgreSQL | Jan 2025 – Apr 2025
• Designed and developed a full-stack web application connecting informal workers with potential clients, featuring profile creation, job posting, and secure login.
• Built RESTful APIs using Node.js and Express for user management, job listings, and real-time service requests, integrated with PostgreSQL for reliable data storage.
• Developed a responsive frontend with user authentication, dynamic filtering, and a seamless cross-device user experience.

CERTIFICATIONS
• Full Stack In-House Summer Training – Chandigarh University
• HTML, CSS & JavaScript – Coursera
• Cloud Computing – NPTEL (IIT Kharagpur)
• Full Stack Web Development Bootcamp – Udemy (Instructor: Angela Yu)
• Data Structures & Algorithms (C++) – PW Skills

EXTRA CURRICULAR ACTIVITIES
• Active Member in C Square Club (Chandigarh University)
• Solved 500+ coding problems on Various Coding Platforms, enhancing problem-solving and algorithmic skills.`

  return new Response(resumeContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Harshit_Mishra_Resume.txt"',
    },
  })
}
