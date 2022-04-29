import React,{Component} from "react";
import './Footer.css';
import Header from "./Header";
import Contents from "./contents";
import Footer from "./Footer";

class Start extends Component{
    render(){
    return (
        <div className="App">
        <Header />
        <Contents />
        <Footer />
      </div>
    )
    }
}
export default Start;