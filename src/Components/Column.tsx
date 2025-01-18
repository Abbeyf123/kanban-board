import React, { SetStateAction, useState } from "react";
import { column } from "../Types/types";
import Cards from "./Cards";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";
interface props {
  title: string;
  headingColor: string;
  column: string;
  cards: column[];
  setcards: SetStateAction<any>;
}

const Column = ({ title, headingColor, column, cards, setcards }: props) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((c) => c.column === column);
  const handleDragStart = (e:React.DragEvent, card:column) => {
    e.dataTransfer?.setData("cardId", card.id);
  }
  const handleDragOver=(e:React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e)
    setActive(true)
  }
  const handleDragLeave=(e:React.DragEvent) => {
    e.preventDefault();
    setActive(false)
    clearHighlights()
  }
  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
    clearHighlights();
  
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const element = getNearestIndicator(e, indicators);
    const before = element.dataset.before || '-1';
  
    if (before !== cardId) {
      let copy = [...cards]; // Make a copy of the current cards
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
  
      // Update the column of the card to the new column
      cardToTransfer = { ...cardToTransfer, column };
      
      // Remove the card from its previous position
      copy = copy.filter((c) => c.id !== cardId);
  
      // Determine if the card should be moved to the back or inserted at a specific index
      const moveToBack = before === "-1";
  
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertIndex = copy.findIndex((el) => el.id === before);
        copy.splice(insertIndex, 0, cardToTransfer);
      }
  
      setcards(copy); // Update the cards state
    }
  };
  

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators(); // Get the indicators
    clearHighlights(indicators)
    const el = getNearestIndicator(e, indicators); // Find the nearest indicator
    el.style.opacity = '1'
  };
  const clearHighlights = (els?:HTMLElement[]) => {
    const indicators = els || getIndicators()
    indicators.forEach(i => i.style.opacity = "0")
  }
  
  const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50; // The offset to consider for proximity
  
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect(); // Get the bounding box of the indicator element
        const offset = e.clientY - (box.top + DISTANCE_OFFSET); // Calculate the distance from the dragged element to the indicator
  
        if (offset < 0 && offset > closest.offset) {
          // If the offset is closer than the previous closest, update the closest element
          return { offset: offset, element: child };
        } else {
          // Otherwise, keep the previous closest
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, element: indicators[indicators.length - 1] } // Initialize with a very large negative offset
    );
  
    return el.element; // Return the closest indicator element
  };
  
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[];
  };
  
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50 " : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Cards key={c.id} {...c} setCards={setcards} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={"-1"} column={column} />
        <AddCard column={column} setCards={setcards} />
      </div>
    </div>
  );
};

export default Column;
