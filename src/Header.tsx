import Clock from "./Clock";

export default function Header() {
    return(
        <div className="bottom-spacing">
        <h1 style={{marginBottom: "1rem"}}>Welcome, Bill</h1>

        <Clock />
        </div>
    )
}
