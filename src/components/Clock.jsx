import { useState } from 'react';

export default function Clock() {
    let time = new Date().toLocaleTimeString();
    const [Clock, setClock] = useState(time);
    const UpdateClock = () => {
        time = new Date().toLocaleTimeString();
        setClock(time);
    }
    setInterval(UpdateClock, 1000)
    return (
        <div className="home-time"> {Clock}</div>
    )
}