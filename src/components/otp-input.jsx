"use client"

import { useRef, useState, useEffect } from "react"

const OTPInput = ({ length = 6, value = "", onChange }) => {
  const [otp, setOtp] = useState(value.padEnd(length, "").split("").slice(0, length))
  const inputRefs = useRef([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Update parent component when OTP changes
  useEffect(() => {
    onChange(otp.join(""))
  }, [otp, onChange])

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value

    // Only accept numbers
    if (!/^\d*$/.test(value)) return

    // Take the last character if multiple characters are pasted
    const digit = value.slice(-1)

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    // If a digit was entered and we're not at the last input, focus the next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1].focus()
      } else if (otp[index]) {
        // If current input has a value, clear it
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only proceed if the pasted content is all digits
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.split("").slice(0, length)
    const newOtp = [...otp]

    digits.forEach((digit, idx) => {
      newOtp[idx] = digit
    })

    setOtp(newOtp)

    // Focus the input after the last pasted digit
    if (digits.length < length) {
      inputRefs.current[digits.length].focus()
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}

export default OTPInput
