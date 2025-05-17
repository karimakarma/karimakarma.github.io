import { useState, useEffect } from 'react'

export default function PomodoroTimer() {
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(isActive)
    const [seconds, setSeconds] = useState(0)
    const [currentSession, setCurrentSession] = useState(0) // Track the current session index

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 0) {
                        // Move to the next session or stop the timer
                        if (currentSession < SESSIONS.length - 1) {
                            setCurrentSession((prevSession) => prevSession + 1)
                            return Math.floor(SESSIONS[currentSession + 1] / 1000)
                        } else {
                            setIsActive(false) // Stop the timer after the last session
                            return 0
                        }
                    }
                    return prevSeconds - 1 // Decrement seconds
                })
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval) // Cleanup interval on unmount or dependency change
        }
    }, [isActive, isPaused, currentSession])

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    function startTimer() {
        setIsActive(true)
        setIsPaused(false)
        setSeconds(Math.floor(SESSIONS[currentSession] / 1000)) // Initialize with the current session time
    }

    function skipSession() {
        if (currentSession < SESSIONS.length - 1) {
            setCurrentSession((prev) => prev + 1)
            setSeconds(Math.floor(SESSIONS[currentSession + 1] / 1000))
        } else {
            setIsActive(false) // Stop the timer if it's the last session
        }
    }

    function prevSession() {
        if (currentSession > 0) {
            setCurrentSession((prev) => prev - 1)
            setSeconds(Math.floor(SESSIONS[currentSession - 1] / 1000))
        }
    }

    return (
        <div className="bottom-spacing">
            {isActive ? (
                <>
                    <h1>{formatTime(seconds)}</h1>
                    <p>Stay focused and productive!</p>
                    <a
                        onClick={prevSession}
                        style={{ textDecoration: 'underline' }}
                    >
                        prev ⏮
                    </a>
                    ·
                    <a
                        onClick={() => setIsPaused(!isPaused)}
                        style={{ textDecoration: 'underline' }}
                    >
                        {isPaused ? '⏵ resume' : '⏸ stop'}
                    </a>
                    ·
                    <a
                        onClick={skipSession}
                        style={{ textDecoration: 'underline' }}
                    >
                        ⏭ skip
                    </a>
                    <br />
                    <a
                        onClick={() => setIsActive(false)}
                        style={{ textDecoration: 'underline' }}
                    >
                        exit
                    </a>
                </>
            ) : (
                <button onClick={startTimer}>Lock in 🔒</button>
            )}
        </div>
    )
}

const SESSIONS = [1500000, 300000, 1200000] // Example sessions in milliseconds