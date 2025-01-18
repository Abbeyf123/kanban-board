import React, { SetStateAction, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { column } from "../Types/types";

const BurnBarrel = ({ setcards }: { setcards: SetStateAction<any> }) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e:React.DragEvent) => {
    e.preventDefault();
    setActive(true)
  }
  const handleDragLeave = () => {
    setActive(false)
  }
  const handleDragEnd = (e:React.DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId')
    setcards((prevCards:column[]) => prevCards.filter(card => card.id !== cardId))
    setActive(false)
  }
  
  return (
    <div
    onDrop={handleDragEnd}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl 
        ${
          active
            ? "border-red-800 bg-red-800/20 text-red-800"
            : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
    >
      {active ? <AiFillFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default BurnBarrel;
