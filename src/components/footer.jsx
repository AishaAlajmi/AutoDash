import React from "react";
import { FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/20 dark:border-white/10 py-6 text-center text-sm opacity-80">
      <p>
        <span className="mx-2"></span>
        <a
          href="https://www.linkedin.com/in/aisha-alajmi/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <span className="text-black">Developed by </span>
          <FaLinkedin size={20} />
          <span className="font-semibold text-black"> Aisha Alajmi</span>
        </a>
      </p>
    </footer>
  );
}
