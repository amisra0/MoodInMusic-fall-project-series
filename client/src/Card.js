   
import React from "react";
import { CoolCardImage, CoolCardText , CoolCardLink} from "react-cool-card"

const Card = (props) => (
    <CoolCardLink href={props.url}  backgroundColor="#212121"
        color="#ffffff"
        width="450px"
        height="450px">
        
    <CoolCardImage src={props.image} alt="card-image" z-index = "3" position = "absolute"/>
    <CoolCardText
        title={props.title}
        description= {props.desc}
    />
    </CoolCardLink>
)

export default Card;