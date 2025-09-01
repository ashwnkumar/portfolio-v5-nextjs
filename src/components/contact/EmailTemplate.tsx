import React from "react";

type Props = {
  name?: string;
  email?: string;
  message?: string;
};

const EmailTemplate = ({ name, email, message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-2xl font-semibold">Name:</p>
      <p className="text-lg">{name}</p>
      <p className="text-2xl font-semibold">Email:</p>
      <p className="text-lg">{email}</p>
      <p className="text-2xl font-semibold">Message:</p>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmailTemplate;
