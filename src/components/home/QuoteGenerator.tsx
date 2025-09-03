"use client";
import React, { useEffect, useState } from "react";
import quotesData from "../../constants/quotes.json";

type QuotesData = {
  quotes: string[];
  thinkingMessages: string[];
};

const { quotes, thinkingMessages } = quotesData as QuotesData;

const getRandomMessage = () =>
  thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];

const getRandomQuote = (list: string[], exclude?: string) => {
  if (list.length === 0) return "";
  let random: string;
  do {
    random = list[Math.floor(Math.random() * list.length)];
  } while (list.length > 1 && random === exclude); // avoid repeats
  return random;
};

const QuoteGenerator: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [thinkingMsg, setThinkingMsg] = useState<string>("");

  const generateQuote = () => {
    if (quotes.length === 0) return; // guard
    const msg = getRandomMessage();
    setThinkingMsg(msg);
    setLoading(true);

    setTimeout(() => {
      const random = getRandomQuote(quotes, output); // exclude last quote
      setOutput(random);
      setLoading(false);
    }, 1500);
  };

  // initial quote
  useEffect(() => {
    if (quotes.length > 0) {
      setOutput(getRandomQuote(quotes));
    }
  }, []);

  return (
    <div className="w-full flex h-full flex-col items-center justify-between text-primary">
      <div className="flex flex-col items-start justify-start gap-2 w-full">
        <h3 className="text-lg lg:text-xl text-secondary font-medium">
          LifeHacks.exe
        </h3>
        <p className="text-xl lg:text-2xl text-primary font-medium overflow-y-auto pb-4 lg:pb-0">
          {loading ? (
            <span className="animate-pulse text-secondary text-md">
              {thinkingMsg}
            </span>
          ) : (
            output
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={generateQuote}
        disabled={loading}
        className={` rounded-lg w-full bg-brand-faded lg:bg-bg text-brand lg:text-primary font-medium shadow-sm text-sm lg:text-lg py-2 transition-all duration-300 ease-in-out cursor-pointer  ${
          loading
            ? "opacity-60 cursor-not-allowed pointer-events-none"
            : "active:scale-95 hover:bg-brand-faded hover:text-brand"
        }`}
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.2s]" />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.1s]" />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
          </span>
        ) : (
          "Another One"
        )}
      </button>
    </div>
  );
};

export default QuoteGenerator;
