import React, { SetStateAction } from "react";
import { column } from "../Types/types";
import DropIndicator from "./DropIndicator";




const Cards = ({
  id,
  title,
  column,
  handleDragStart
}: column & { setCards: SetStateAction<any>; handleDragStart: (e: React.DragEvent, card: column) => void}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable={true}
        onDragStart={(e:React.DragEvent) => handleDragStart(e, {id, title, column})}
        className="cursor-grab rounded border border-neutral-500 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

export default Cards;
