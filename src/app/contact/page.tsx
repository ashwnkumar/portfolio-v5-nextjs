"use client";
import Button from "@/components/form/Button";
import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("All fields are required");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Something went wrong");
      }

      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <GridContainer>
      <form onSubmit={handleSubmit} className="contents">
        <GridCard className="col-start-1 col-end-13 lg:col-end-7 row-start-1 row-end-4 lg:row-end-7">
          <div className="w-full h-full flex flex-col items-start justify-center gap-3">
            <h3 className="text-3xl lg:text-5xl font-medium text-brand bg-brand-faded px-2">
              Let&apos;s Work Together!
            </h3>
            <p className="text-xl lg:text-2xl">
              I’m always open to new projects, freelance opportunities, and
              collaborations.
            </p>
            <p className="text-lg lg:text-xl">
              Got an idea in mind? Share the details — I’ll get back to you as
              soon as possible.
            </p>
          </div>
        </GridCard>

        <GridCard className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-13 row-start-4 row-end-5 lg:row-start-1 lg:row-end-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className={`bg-bg w-full border h-full rounded-lg focus:outline-none px-4 py-2 ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray focus:border-brand"
            }`}
          />
        </GridCard>

        <GridCard className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-13 row-start-5 row-end-6 lg:row-start-2 lg:row-end-3">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className={`bg-bg w-full border h-full rounded-lg focus:outline-none px-4 py-2 ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray focus:border-brand"
            }`}
          />
        </GridCard>

        <GridCard className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-13 row-start-6 row-end-9 lg:row-start-3 lg:row-end-6">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter Your Message"
            className={`bg-bg w-full border h-full rounded-lg focus:outline-none px-4 py-2 ${
              errors.message
                ? "border-red-500 focus:border-red-500"
                : "border-gray focus:border-brand"
            }`}
          />
        </GridCard>

        <GridCard className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-13 row-start-9 row-end-10 lg:row-start-6 lg:row-end-7 ">
          <Button
            type="submit"
            label="Send Message"
            className="w-full bg-brand text-primary py-2 rounded-lg transition"
          />
        </GridCard>
      </form>
    </GridContainer>
  );
};

export default Page;
