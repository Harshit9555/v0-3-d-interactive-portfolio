import { jsPDF } from "jspdf"

export async function GET() {
  const doc = new jsPDF()

  // Set font sizes and colors
  const primaryColor = [0, 255, 255] // Cyan
  const secondaryColor = [123, 97, 255] // Violet
  const textColor = [220, 220, 220] // Light gray

  let yPosition = 15

  // Helper function to add section
  const addSection = (title: string, content: string[], isTitle = false) => {
    if (isTitle) {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(...primaryColor)
    } else {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.setTextColor(...secondaryColor)
    }

    doc.text(title, 15, yPosition)
    yPosition += 6

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(...textColor)

    content.forEach((line) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 15
      }
      const splitText = doc.splitTextToSize(line, 180)
      doc.text(splitText, 15, yPosition)
      yPosition += splitText.length > 1 ? splitText.length * 3.5 : 5
    })

    yPosition += 3
  }

  // Header
  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.setTextColor(...primaryColor)
  doc.text("HARSHIT MISHRA", 15, yPosition)
  yPosition += 8

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(...textColor)
  doc.text("(+91) 9555483658 • Salempur (Deoria), Uttar Pradesh", 15, yPosition)
  yPosition += 5
  doc.text("harshitmishra8953@gmail.com • LinkedIn • LeetCode", 15, yPosition)
  yPosition += 8

  // Professional Summary
  addSection("PROFESSIONAL SUMMARY", [
    "A results-driven Computer Science Engineering student with a strong foundation in Data Structures & Algorithms and proven expertise in full-stack development. Adept at building, testing, and deploying scalable web applications. Seeking to leverage analytical problem-solving skills, strong communication, and a collaborative spirit, along with a passion for clean code, to contribute to an innovative software engineering team.",
  ])

  // Education
  addSection("EDUCATION", [
    "Chandigarh University, Gharuan, Punjab, India | 2023 - Present",
    "Bachelor of Engineering in Computer Science and Engineering",
    "",
    "St. Xavier's School, Salempur, Deoria, India | 2018 – 2022",
    "Class X and Class XII (CBSE Board)",
  ])

  // Skills
  addSection("SKILLS", [
    "Technical Skills: C++, C, JavaScript, React, Node.js, PostgreSQL, Bootstrap CSS, React.js",
    "Interpersonal Skills: Communication, Teamwork, Adaptability, Time Management",
  ])

  // Projects
  addSection("PROJECTS", [
    "AnonSathi – Mental Well-being Web Application | React.js, Node.js, Firebase, OpenAI API | June 2025",
    "• Built a web platform to support mental well-being by enabling users to connect anonymously with certified coaches.",
    "• Designed a clean and responsive UI for stress tracking, journaling, and mindfulness exercises.",
    "• Implemented secure user authentication and data storage using Firebase.",
    "",
    "Workers Hire Website | HTML, CSS, JavaScript, Node.js, PostgreSQL | Jan 2025 – Apr 2025",
    "• Designed and developed a full-stack web application connecting informal workers with potential clients.",
    "• Built RESTful APIs using Node.js and Express for user management, job listings, and real-time service requests.",
    "• Developed a responsive frontend with user authentication, dynamic filtering, and seamless cross-device experience.",
  ])

  // Certifications
  addSection("CERTIFICATIONS", [
    "• Full Stack In-House Summer Training – Chandigarh University",
    "• HTML, CSS & JavaScript – Coursera",
    "• Cloud Computing – NPTEL (IIT Kharagpur)",
    "• Full Stack Web Development Bootcamp – Udemy (Instructor: Angela Yu)",
    "• Data Structures & Algorithms (C++) – PW Skills",
  ])

  // Extra Curricular Activities
  addSection("EXTRA CURRICULAR ACTIVITIES", [
    "• Active Member in C Square Club (Chandigarh University)",
    "• Solved 500+ coding problems on Various Coding Platforms, enhancing problem-solving and algorithmic skills.",
  ])

  // Generate PDF and return
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Harshit_Mishra_Resume.pdf"',
    },
  })
}
