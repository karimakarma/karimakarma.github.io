type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addTask: () => void,
}

export default function TextField({onChange, addTask}: props) {
    return(
        <form style={addContainer}>
            <input id='input' type="text" onChange={e => onChange(e)}/>

            <button type='submit' onClick={e => {
                e.preventDefault()
                addTask()
                }
            } 
            >+</button>
        </form>
    )
}

let addContainer: React.CSSProperties = {
  display: "flex",
  marginTop: "1rem",
  justifyContent: "flex-end",
}