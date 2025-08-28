import React from "react";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";

type ButtonProps = {
    label?: string;
    onClick?: () => void;
    navTo?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    icon?: LucideIcon;
    external?: boolean; // control if link opens in new tab
};

const Button = ({
    label,
    onClick,
    disabled = false,
    type = "button",
    variant = "primary",
    className = "",
    icon: Icon,
    navTo,
    external = true,
}: ButtonProps) => {
    const btnVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
        primary: "bg-brand text-text",
        secondary: "bg-transparent text-brand hover:bg-brand/20",
        outline: "border border-brand text-brand hover:bg-brand hover:text-bg",
    };

    const commonClasses =
        "group px-4 py-2 flex items-center rounded-md justify-center cur-pointer font-medium active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const linkClasses = `relative text-primary hover:text-brand `;

    const mergedButtonClasses = `${commonClasses} ${btnVariants[variant]} ${className}`;
    const mergedLinkClasses = `${commonClasses} ${linkClasses} ${className}`;

    if (navTo) {
        return (
            <Link
                href={navTo}
                onClick={onClick}
                className={mergedLinkClasses}
                target={external ? "_blank" : "_self"}
                rel={external ? "noopener noreferrer" : undefined}
            >
                {Icon && <Icon className="mr-2" />}
                {label}
                {external && <ArrowUpRight size={18} className="absolute top-0 -right-1 " />}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={mergedButtonClasses}
        >
            {Icon && <Icon className="mr-2" />}
            {label}
        </button>
    );
};

export default Button;
