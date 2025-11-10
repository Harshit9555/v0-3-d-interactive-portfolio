import { type NextRequest, NextResponse } from "next/server"

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

    console.log("📧 New Contact Form Submission:")
    console.log(`Name: ${body.name}`)
    console.log(`Email: ${body.email}`)
    console.log(`Subject: ${body.subject}`)
    console.log(`Message: ${body.message}`)
    console.log(`Timestamp: ${new Date().toISOString()}`)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import("@/lib/supabase/server")
        const supabase = await createClient()

        console.log("[v0] Attempting to save to Supabase...")

        const { data, error } = await supabase
          .from("contact_submissions")
          .insert([
            {
              name: body.name,
              email: body.email,
              subject: body.subject,
              message: body.message,
            },
          ])
          .select()

        if (error) {
          console.error("[v0] Supabase Error:", error.message)
          // Continue even if Supabase fails - message is logged to console
        } else {
          console.log("[v0] Successfully saved to Supabase")
        }
      } catch (supabaseError) {
        console.error("[v0] Supabase connection error:", supabaseError)
        // Continue - message is already logged to console
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received! I will get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Contact Form Error:", error)
    return NextResponse.json({ error: "Failed to process your message. Please try again." }, { status: 500 })
  }
}
