"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PaperPlaneIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) toast.error("Please fix the errors");
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Something went wrong");
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`rounded-none ${
            errors.name ? "border-red-500 focus-visible:ring-red-500/50" : ""
          }`}
          placeholder="Your name"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`rounded-none ${
            errors.email ? "border-red-500 focus-visible:ring-red-500/50" : ""
          }`}
          placeholder="your.email@example.com"
        />
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`rounded-none ${
            errors.subject ? "border-red-500 focus-visible:ring-red-500/50" : ""
          }`}
          placeholder="What's this about?"
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={8}
          className={`rounded-none resize-none ${
            errors.message ? "border-red-500 focus-visible:ring-red-500/50" : ""
          }`}
          placeholder="Tell me about your project, idea, or just say hi..."
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="gap-2" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
        <PaperPlaneIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}
