import React from "react";

let About = ({name,width,age, color, element, children})=>{
    console.log(name,width,age, color, element,children);
    
    return (<div>
                <h1>I'm from About Section</h1>
                <h2 style={{width,color}}>Hey! {name}...Your age is {age}.</h2>
                    {element}
                    {children}
            </div>)
}

export default About;