import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip';



const style = {
    li: "flex items-center justify-between gap-2",
    row: "flex items-center gap-2 p-2",
    rowCompleted: "flex items-center gap-2 p-2 bg-slate-100 opacity-50",
    text: "flex-1",
    textName: "flex-1 font-container text-3xl",
    button: "bg-cyan-300 p-2 rounded-md",
    textTip: "text-sm text-red-300",
}

function GiftItem( { gift, deleteGift, toggleCompleted, updateGift  }) {

    const handleDelete = () => {
        deleteGift(gift.name);
      };
    
    const handleToggleChecked = () => {
        toggleCompleted(gift.createdAt);
    }

    return (
        <li className={style.li}>
          <div className={gift.completed ? style.rowCompleted : style.row}>
            <input type="checkbox" checked={gift.completed} onClick={handleToggleChecked} onChange={() => {}} />
            <p className={style.textName}>{gift.name}</p>
    
            <p className={style.textTip}>From: </p>
            <p className={style.text}>{gift.store}</p>
    
            <p className={style.textTip}>Costs: </p>
            <p className={style.text}>{gift.price}</p>
    
            <p className={style.textTip}>Please get: </p>
            <p className={style.text}>{gift.presentation}</p>
    
            <Tooltip title="Delete gift" arrow>
              <button className={style.button} onClick={handleDelete}>
                <AiFillDelete size={17} />
              </button>
            </Tooltip>
          </div>
        </li>
      );
    }

export default GiftItem;