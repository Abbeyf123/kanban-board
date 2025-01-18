import { useEffect, useState } from "react";
import Column from "./Column";


import BurnBarrel from "./BurnBarrel";


const Board = () => {
  const [cards, setcards] = useState([]);
  const [hasChecked, setHasChecked] = useState(false)
  useEffect(()=>{
    hasChecked && localStorage.setItem("cards", JSON.stringify(cards))
  }, [cards])
  useEffect(()=>{
    const cardData = localStorage.getItem("cards")
    setcards(cardData ? JSON.parse(cardData) : [])
    setHasChecked(true)
  }, [])
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title={"Backlog"}
        column={"backlog"}
        headingColor={"text-neutral-500"}
        cards={cards}
        setcards={setcards}
      />
      <Column
        title={"Todo"}
        column={"todo"}
        headingColor={"text-yellow-200"}
        cards={cards}
        setcards={setcards}
      />
      <Column
        title={"In Progress"}
        column={"doing"}
        headingColor={"text-blue-200"}
        cards={cards}
        setcards={setcards}
      />
      <Column
        title={"Completed"}
        column={"done"}
        headingColor={"text-emerald-200"}
        cards={cards}
        setcards={setcards}
      />
      <BurnBarrel setcards={setcards}/>
    </div>
  );
};

export default Board;
