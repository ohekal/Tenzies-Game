import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die" style={styles} onClick={props.handleClick}>
      {props.value}
    </div>
  );
}

export default Die;
