// components/notesArticle.tsx

import { ChevronDown, ChevronUp, NotebookPen } from "lucide-react";
import { useState } from "react";

export default function NotesArticle() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  return (
    <article className="w-full max-w-md mx-auto mt-5 bg-white rounded-2xl shadow-md">
      <button
        type="button"
        className="flex items-center justify-between w-full p-4 cursor-pointer bg-transparent border-0 outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="notes-article-content"
      >
        <h2 className="flex gap-5 text-lg font-semibold">Notes <NotebookPen /></h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div
          id="notes-article-content"
          className="border-t px-4 py-4"
        >
          <textarea
            className="w-full h-32 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe tus notas aquí..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}
    </article>
  );
}
