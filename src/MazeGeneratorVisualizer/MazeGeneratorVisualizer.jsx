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

export default class PathFindingVisualizer extends component
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
    this.setState({
        grid,
    });
};

visualizeMazeGeneration=()=>{
    this.setState({phase:"Maze"});
    const {grid}=this.state;
    const startNode=grid[this.state.points.start.row][this.state.points.start.col];
    
    const finishNode=grid[this.state.points.finish.row][this.state.points.finish.col];

    // let visitedNodesInOrder=[];

    const visitedNodesInOrder=dfs(grid,startNode,finishNode);

    this.animateMazeGeneration(visitedNodesInOrder,grid);
};


animateMazeGeneration(visitedNodesInOrder,grid)
{
    if(this.state.animationState)
    {
        for(let i=1;i<visitedNodesInOrder.length;i++)
        {
            setTimeout(()=>{
                if(i===visitedNodesInOrder.length-1)
                {
                    this.setState({phase:"postMaze"});
                    // this.setState({animationState:false});
                    this.setState({grid:grid,});
                }
                const node=visitedNodesInOrder[i];
                const nodeElement=document.getElementById(`node-${node.row}-${node.col}`);

                // nodeElement.classList.remove("visited");
                nodeElement.classList.add("node");

                if(nodeElement.classList.remove("node-finish"))
                {
                    console.log("finish");
                }
                else if(nodeElement.classList.remove("node-visited"))
                {
                    nodeElement.classList.remove("node-visited");
                    // console.log("node-visited");
                    nodeElement.classList.add("RevisitedNode");
                }
                else
                {
                    nodeElement.classList.add("node-visited");
                }
                if(node.topWall)
                {
                    nodeElement.classList.add("topWall");
                }
                if(node.bottomWall)
                {
                    nodeElement.classList.add("bottomWall");
                }
                if(node.leftWall)
                {
                    nodeElement.classList.add("leftWall");
                }
                if(node.rightWall)
                {
                    nodeElement.classList.add("rightWall");
                }
            },(300*i)/this.state.mazeGenerationSpeed);
        }
    }
    else
    {
        for(let i=1;i<visitedNodesInOrder.length;i++)
        {
            if(i===visitedNodesInOrder.length-1)
            {
                this.setState({phase:"postMaze"});
                // this.setState({animationState:false});
                this.setState({grid:grid,});
            }
            const node=visitedNodesInOrder[i];
            const nodeElement=document.getElementById(`node-${node.row}-${node.col}`);
            nodeElement.classList.add("node");
            if(nodeElement.classList.remove("node-finish"))
            {
                console.log("finish");
            }
            else if(nodeElement.classList.remove("node-visited"))
            {
                nodeElement.classList.remove("node-visited");
                // console.log("node-visited");
                nodeElement.classList.add("RevisitedNode");
            }
            else
            {
                nodeElement.classList.add("node-visited");
            }
            if(node.topWall)
            {
                nodeElement.classList.add("topWall");
            }
            if(node.bottomWall)
            {
                nodeElement.classList.add("bottomWall");
            }
            if(node.leftWall)
            {
                nodeElement.classList.add("leftWall");
            }
            if(node.rightWall)
            {
                nodeElement.classList.add("rightWall");
            }
        }
    }
}

//not getting the visualization part of shortest path...

animateShortestPath=()=>
{
    // const finishNode=document.getElementById(`node-${this.state.points.finish.row}-${this.state.points.finish.col}`);

    const finishNode=this.state.grid[this.state.points.finish.row][this.state.points.finish.col];

    // const visitedNodesInOrder=bfs(this.state.grid,this.state.points.start,finishNode);

    const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);


    for(let i=1;i<nodesInShortestPathOrder.length-1;i++)
    {
        setTimeOut(()=>{
            const node=nodesInShortestPathOrder[i];
            // const nodeElement=document.getElementById(`node-${node.row}-${node.col}`);
            document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-path");
        },50*i);
    }
};

pointChangeHandler=()=>
{
    if(notCorrectProperty(this.state.length.row,this.state.length.col))
    {
        this.setState({errorMessage:"Invalid Input"});
        return;   
    }
    //provided value is suitable or not  (Y/N)
    const start_row=parseInt(document.getElementById("start_row").value);
    const start_col=parseInt(document.getElementById("start_col").value);
    const finish_row=parseInt(document.getElementById("end_row").value);
    const finish_col=parseInt(document.getElementById("end_col").value);

    const newGrid=getGrid
    (
        this.state.length.row,
        this.state.length.col,

        start_row,
        start_col,
        finish_row,
        finish_col
    );
    this.setState
    ({
        grid:newGrid,
        errorMessage:"",
        points:{
            start:{
                row:start_row,
                col:start_col,
            },
            finish:{
                row:finish_row,
                col:finish_col,
            },
        },
    });
};

speedChangeHandler=()=>
{
    const changedSpeed=parseInt(
        document.getElementById("mazeSpeedRange").value
    );
    this.setState({mazeGenerationSpeed:changedSpeed,});
};

lengthChangeHandler=()=>
{
    const row_length=document.getElementById("row_length").value;
    const col_length=document.getElementById("col_length").value;

    if(row_length>50 || col_length>50)
    {
        this.setState({errorMessage:"Invalid Size",});
        return;
    }
    //getting the new grid
    const newGrid=getGrid(row_length,col_length,0,0,row_length-1,col_length-1);

    //changing the state like changing the new value of the input elements

    document.getElementById("start_row").value=0;
    document.getElementById("start_col").value=0;
    document.getElementById("end_row").value=row_length-1;
    document.getElementById("end_col").value=col_length-1;

    //Assigning the new grid to the state and new values

    this.setState
    ({
        grid:newGrid,
        errorMessage:"",
        points:
        {
            start:
            {
                row:0,
                col:0,
            },
            finish:
            {
                row:row_length-1,
                col:col_length-1,
            },
        },
        length:
        {
            row:row_length,
            col:col_length,
        },
    });
};

animationStateChangeHandler=()=>
{
    this.setState({animationState:!this.state.animationState,});
}

//mouse pressing to down
handleMouseDown(row,col)
{
    if(this.state.phase!=="preMaze")
    {
        return;
    };
    if(this.state.grid[row][col].isStart)
    {
        this.setState({dragNode:"start"});
    }
    else if(this.state.grid[row][col].isFinish)
    {
        this.setState({dragNode:"finish"});
    }
    else
    {
        this.setState({dragNode:"normal"});
    }
}

handleMouseUp(row,col)
{
    //Check condition to see if the maze is running or not
    if(this.state.phase!=="preMaze")
    {
        return;
    }
    let start_row=this.state.points.start.row;
    let start_col=this.state.points.start.col;
    let finish_row=this.state.points.finish.row;    
    let finish_col=this.state.points.finish.col;

    //changing the value of start and end not depending on the mouse drag
    if(this.state.dragNode==="start")
    {
        start_row=row;
        start_col=col;
    }
    else if(this.state.dragNode==="finish")
    {
        finish_row=row;
        finish_col=col;
    }
    else
    {
        return;
    }
    const newGrid=getGrid(this.state.length.row,this.state.length.col,start_row,start_col,finish_row,finish_col);
    this.setState
    ({
        grid:newGrid,
        errorMessage:"",
        points:
        {
            start:
            {
                row:start_row,
                col:start_col,
            },
            finish:
            {
                row:finish_row,
                col:finish_col,
            },
        },
    });
    document.getElementById("start_row").value=start_row;
    document.getElementById("start_col").value=start_col;
    document.getElementById("end_row").value=finish_row;
    document.getElementById("end_col").value=finish_col;
}

render()
{
    let buttonContainer=<p>System Error...!!</p>;
    let animationStateChangerButton=(<button onClick={this.animationStateChangeHandler}style={{color:"#fff",backgroundColor:"#25D366",width:"100px",height:"30px",border:"1px solid #fff"}}>Animation <TiTickOutline/></button>);
    if(this.state.animationState===false)
    {
        animationStateChangerButton=(<button onClick={this.animationStateChangeHandler} style={{color:"#fff",backgroundColor:"#FF0000",width:"100px",height:"30px",border:"1px solid #fff"}}>Animation <ImCross/></button>);
    }
    if(this.state.phase==="preMaze")
    {
        buttonContainer=(<div className="buttonContainer">
            <button onClick={this.visualizeMazeGeneration}> Maze </button>
            <button onClick={exportPdf}> Screenshot </button>
        </div>);
    }
    else if(this.state.phase==="Maze")
    {
        buttonContainer=(<div className="buttonContainer">
            <button>Generating...!!</button>
            <button onClick={exportPdf}> Screenshot </button>
        </div>);
    }
    else if(this.state.phase==="postMaze")
    {
        buttonContainer=(<div className="buttonContainer">
            <button onClick={this.animateShortestPath}> Path </button>
            <button onClick={exportPdf}> Screenshot </button>
        </div>);
    }
    let actionContainer=<div></div>;
    if(this.state.phase==="preMaze")
    {
        actionContainer=
        (
            <div className="title">

                {/* high slider */}
                <label htmlFor="highSlider">Height:{this.state.length.row}</label>
                <input type="range" id="row_length" min="1" max="50" name="highSlider" onChange={this.lengthChangeHandler} defaultValue={this.state.length.row}></input>

                {/* width slider */}
                <label htmlFor="widthSlider">Width:{this.state.length.col}</label>
                <input type="range" id="col_length"min="1"max="50" name="widthSlider"onChange={this.lengthChangeHandler}defaultValue={this.state.length.col}></input>

                {/* maze generate speed */}
                <label htmlFor='speedsSlider'>Maze Generation Speed:</label>
                <input type='range' min="1" max="20" defaultValue="10" name="speedsSlider" id="mazeSpeedRange"onChange={this.speedChangeHandler}></input>

                {/* start point */}
                <div className='startPointContainer'>
                    <label htmlFor='point'>Start Point:</label>

                    {/* row slider */}
                    <input type='number'name='point' id='start_col'min='0'max={this.state.length.col-1}onChange={this.pointChangeHandler}
                    defaultValue={this.state.point.start.row}></input>

                    {/* col slider */}
                    <input type='number'name='point' id='start_col'min='0'max={this.state.length.col-1}onchange={this.pointChangeHandler}defaultValue={this.state.points.start.col}></input>
                </div>
                {animationStateChangerButton}
            </div>
        )
    }
}