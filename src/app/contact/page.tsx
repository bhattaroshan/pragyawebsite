'use client'

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Linkedin, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

export default function ContactPage() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [processingMessage, setProcessingMessage] = useState(false)

  async function sendEmail() {
    // Log environment variables (sanitized for security)
    console.log("EmailJS Config Check:", {
      serviceIDExists: !!process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
      templateIDExists: !!process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
      publicKeyExists: !!process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
      serviceIDLength: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID?.length || 0,
      templateIDLength: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID?.length || 0,
      publicKeyLength: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY?.length || 0
    });

    const emailVars = {
      from_name: nameRef.current?.value,
      from_email: emailRef.current?.value,
      message: messageRef.current?.value,
      // The to_email field is typically used in some EmailJS templates
      // but is generally not needed as the recipient is configured in the EmailJS template
      // It's included here in case your specific template expects it
    }

    try {
      setProcessingMessage(true);
      
      // console.log("Attempting to send email with EmailJS...");
      
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        emailVars,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
      );
      
      // console.log("EmailJS send successful:", result);
      
      toast.success("Message sent successfully. I'll revert to you in a few days.");
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (messageRef.current) messageRef.current.value = "";
    } catch (error) {
      console.error("EmailJS Error Details:", error);
      
      // More descriptive error based on the error type
      if (error instanceof Error) {
        toast.error(`Failed to send: ${error.message}`);
      } else {
        toast.error("Your message was not sent. Please try again.");
      }
    } finally {
      setProcessingMessage(false);
    }
  }

  function handleMessageSend() {
    if (!nameRef.current?.value) {
      toast.warning("Please enter your name");
      return;
    }
    
    if (!emailRef.current?.value) {
      toast.warning("Please enter your email");
      return;
    }
    
    if (!messageRef.current?.value) {
      toast.warning("Please enter your message");
      return;
    }
    
    sendEmail();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Let's discuss how we can work together. I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Image and Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="rounded-lg overflow-hidden border-2 border-border hover:border-primary/50 transition-colors duration-300">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/hero.jpg"
                    alt="Pragya Pokharel"
                    fill
                    style={{ 
                      objectFit: 'cover', 
                      display: 'block',
                      width: '100%',
                      height: '100%'
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h2 className="text-2xl font-bold">PRAGYA</h2>
                    <h2 className="text-2xl font-bold text-gray-400">POKHAREL</h2>
                    <p className="text-white/80 mt-1 text-sm">
                      Child Development Specialist
                    </p>
                  </div>
                </div>
              </div>

              <Card className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Email</h3>
                      <p className="text-muted-foreground text-sm">pragyapokharel07@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Location</h3>
                      <p className="text-muted-foreground text-sm">Nebraska, Lincoln</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-center gap-4">
                    <a 
                      href="https://www.linkedin.com/in/pragya-pokharel/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                    </a>
                    <a 
                      href="https://www.facebook.com/pukupragya" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Contact Form */}
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                  <p className="text-muted-foreground">
                    Have a question or want to work together? Drop me a message!
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="Your name"
                      ref={nameRef}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      ref={emailRef}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      className="min-h-[120px] resize-none"
                      ref={messageRef}
                    />
                  </div>
                  <Button 
                    className="w-full h-12 text-base" 
                    onClick={handleMessageSend}
                    disabled={processingMessage}
                  >
                    {processingMessage ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 