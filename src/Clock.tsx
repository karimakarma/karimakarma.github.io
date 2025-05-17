import { useEffect, useState } from 'react';

export default function Clock() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const i = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(i);
    })

    const fullDate = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth()}/${now.getFullYear()}`;
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();;
    const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();;
    const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();

    return (
        <div style={clockContainer}>
        <p style={{fontSize: "1.3rem"}}>{fullDate}</p>
        <h1 style={clock} className={"glow"}>
            {hours}:{minutes}:{seconds}
        </h1>
        </div>
    )
}

const clockContainer: React.CSSProperties = {
    fontFamily: "inconsolata",
}

const clock: React.CSSProperties = {
    margin: "0px",
    fontWeight: "thin",
}