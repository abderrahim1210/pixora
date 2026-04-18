import React, { useState } from 'react'

export const Truncate = ({ text = "", maxChars, maxLines, children }) => {
    const [open, setOpen] = useState(false);
    const isChars = maxChars && text.length > maxChars;
    const isLines = maxLines && text.length > maxLines * 80;
    const showMore = isChars || isLines;
    const displayText = !showMore || open ? text : maxChars ? text.slice(0, maxChars) + "..." : text;
    const className = maxLines && !open ? "clamp" : "";
    const style = maxLines && !open ? { "WebkitLineClamp": maxLines } : {};
    return children({
        text: displayText , open, toggle: () => setOpen(o => !o), showMore, className, style
    });
}
