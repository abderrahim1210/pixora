import React, { useState } from 'react'

export const Truncate = ({text="",maxChars,maxLines,children}) => {
    const [open,setOpen] = useState(false);
    const isChars= maxChars && text.length > maxChars;
    const displayText = !isChars || open ? text : text.slice(0,maxChars) + "...";
    const className = maxLines && !open ? "clamp" : "";
    const style = maxLines && !open ? {"WebkitLineClamp" : maxLines} : {};
  return children ({
    text : maxChars ? displayText : text,open,toggle:() => setOpen(o => !o),showMore : isChars || maxLines,className,style
  })
}
