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

    console.log("[v0] Attempting to save contact submission:", {
      name: body.name,
      email: body.email,
      subject: body.subject,
    })

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
      console.error("[v0] Supabase Error Details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      })

      let userMessage = "Failed to save your message. Please try again later."
      if (error.code === "PGRST116") {
        userMessage = "Table not found. Please contact the site owner."
      } else if (error.code === "42501") {
        userMessage = "Permission denied. Please contact the site owner."
      }

      return NextResponse.json({ error: userMessage }, { status: 500 })
    }

    console.log("[v0] Contact submission saved successfully:", {
      id: data?.[0]?.id,
      name: body.name,
      email: body.email,
    })

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
