import { FormEvent, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { column } from "../Types/types";

const AddCard = ({
  column,
  setCards,
}: {
  column: string;
  setCards: SetStateAction<any>;
}) => {
  const [text, setText] = useState("");
  const [adding, setIsAdding] = useState(false);
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    if (text.trim() === "") return;
    const newCard = {
      id: Math.random().toString(),
      title:text.trim(),
      column
    }
    setCards((prevcards:column[]) => [...prevcards, newCard]);
    setIsAdding(false)
  }
  return (
    <>
      {adding ? (
        <>
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              className=" w-full rounded border border-violet-400
               bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-50 focus:outline-0"
              autoFocus
              placeholder="Add new task..."
            ></textarea>
            <div className="mt-1 5 flex items-center justify-end gap-1 5">
              <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
              className="flex rounded items-center gap-1.5 px-3 py-1.5 text-xs bg-neutral-50 text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FaPlus/>
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className=" flex w-full items-center gap-1.5 
          px-3 py-1.3 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};

export default AddCard;
