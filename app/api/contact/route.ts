import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const CONTACT_EMAIL = "harshitmishra8953@gmail.com"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateFormData(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" }
  }
  if (!validateEmail(data.email)) {
    return { valid: false, error: "Invalid email address" }
  }
  if (!data.subject || data.subject.trim().length < 3) {
    return { valid: false, error: "Subject must be at least 3 characters" }
  }
  if (!data.message || data.message.trim().length < 10) {
    return { valid: false, error: "Message must be at least 10 characters" }
  }
  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate form data
    const validation = validateFormData(body)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase.from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    })

    if (error) {
      console.error("[Supabase Error]:", error)
      return NextResponse.json({ error: "Failed to save your message. Please try again." }, { status: 500 })
    }

    console.log("[Contact Form] New message saved:", {
      from: body.email,
      name: body.name,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    // In production, integrate with Resend, SendGrid, or similar service
    console.log("[Contact Form] New message received:", {
      from: body.email,
      name: body.name,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service
    // Example with Resend (uncomment when API key is added):
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@yourdomain.com',
    //   to: CONTACT_EMAIL,
    //   replyTo: body.email,
    //   subject: `New Contact Form: ${body.subject}`,
    //   html: `
    //     <h2>New Message from ${body.name}</h2>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Subject:</strong> ${body.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message.replace(/\n/g, '<br>')}</p>
    //   `,
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Message received! I will get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[Contact Form Error]:", error)
    return NextResponse.json({ error: "Failed to process your message. Please try again." }, { status: 500 })
  }
}
