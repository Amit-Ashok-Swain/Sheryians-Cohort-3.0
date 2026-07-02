import React from "react";

let About = ({name,width,age, element, children})=>{
    console.log(name,width,age, element,children);
    
    return (<div>
                <h1>I'm from About Section</h1>
                    {children}
            </div>)
}

export default About;