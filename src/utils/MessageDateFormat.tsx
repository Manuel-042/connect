import { ReactNode } from "react";

export default function messageDateFormat(date: number | Date): ReactNode {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',   
        day: 'numeric',   
        year: 'numeric', 
        hour: 'numeric',  
        minute: 'numeric', 
        hour12: true      
    }).format(date);

    return formattedDate;
}