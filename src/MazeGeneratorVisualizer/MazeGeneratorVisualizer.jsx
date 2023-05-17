import React,{component} from 'react';
//take screenshot of a web page
import html2canvas from 'html2canvas';
//allows to create pdf of docs
import jsPDF from 'jspdf';

import {vscSettings} from "react-icons/vsc";
import {GrYoutube} from "react-icons/gr";
import {faLinkedin} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default class PathFindingVisualizer extends Component
{
    constructor(props){
        super(props);
        if(window.screen.width<500)
        {
            this.state={
                grid:[],
                errorMessage:"",
                dragNode:"normal",
                /*
                phases:
                1:preMaze
                2:maze
                3:postMaze
                */
                phase:"preMaze",
                mazeGenerationSpeed:10,
                animationState:true,
                points:{
                    start:{row:12,col:0},
                    finish:{row:12,col:9},
                },
                length:{row:26,col:10},
            };
        }
        else
        {
            this.state={
                grid:[],
                errorMessage:"",
                dragNode:"normal",
                /*
                phases:
                1:preMaze
                2:maze
                3:postMaze
                */
                phase:"preMaze",
                mazeGenerationSpeed:10,
                animationState:true,
                points:{
                    start:{row:12,col:0},
                    finish:{row:12,col:49},
                },
                length:{row:27,col:50},
            };
        }
    }
}


//creating grid

//use this componentDidMount to create grid
componentDidMount=()=>{
    const grid = getGrid(
      this.state.length.row,
      this.state.length.col,
      this.state.points.start.row,
      this.state.points.start.col,
      this.state.points.finish.row,
      this.state.points.finish.col
    );
    this.setState({grid,});
  };