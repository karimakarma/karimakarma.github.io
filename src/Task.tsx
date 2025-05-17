import RemoveIcon from "./assets/7643-512";

type order = "First" | "Last";

type taskProps = {
  value?: string,
  conditionalRounding?: order,
  removeTask?: () => void,
  moveUp?: () => void,
  moveDown?: () => void,
}

const def: React.CSSProperties = {
    width: "40vw",
    padding: "16px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
  
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: "1.5px",
    background: "#2f2f2f",
    color: "white",
}

const roundedBottom: React.CSSProperties = {
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
}

const roundedTop: React.CSSProperties = {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
}

const buttons: React.CSSProperties = {
    width: "40%",
    display: "flex",
    flexDirection: "row-reverse",
    gap: "10%",
}
  

export default function Task({ value, conditionalRounding, removeTask, moveUp, moveDown }: taskProps) {
  let roundingStyle: React.CSSProperties = {};

  switch(conditionalRounding){
    case "First":
      roundingStyle = roundedTop;
      break;
    case "Last":
      roundingStyle = roundedBottom;
      break;
    default:
      roundingStyle = {};
  }

  const cardStyle = {
    ...def,
    ...roundingStyle
  }
  
  return(
    <div style={cardStyle}>
      <p>{ value }</p>
      <div style={ buttons } >
        <a onClick={removeTask}><RemoveIcon className="clickable" fill="white" width={"1.5rem"} height={"1.5rem"}/></a>
        <a onClick={moveUp}>↑</a>
        <a onClick={moveDown}>↓</a>
      </div>
    </div>
  )
}