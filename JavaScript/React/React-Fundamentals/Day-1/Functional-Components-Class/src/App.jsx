import React from "react";
import About from "./About";

let App = () => {

return (<div>
          <h1>Yo Yo</h1>
          {/* <About/> */}
          {/* {About("Amit")} */}
          {/* <About/>
          <About width = "300" name = "Amit"/>
          {About()}
          {About(500)} */}
          <About name = "Amit" color = {"orange"} width = {500} age = {28} element = <h1>Hello</h1> >
            <h2>I'm Children of About</h2>
          </About>
        </div>)
}

export default App;