export function dfs(grid,startNode,endNode)
{
    let visitedNodesInOrder=[];
    let nodeStack=[];

    moveBy(startNode,grid,nodeStack,startNode,endNode,visitedNodesInOrder);
    return visitedNodesInOrder;
}

const move=(current,grid,nodeStack,startNode,endNode,visitedNodesInOrder)=>{
    visitedNodesInOrder.push(current);
    // nodeStack.push(current);
    current.isValid=true;

    let kids=getKids(current,grid);

    if(kids.length===0)
    {
        // if(current===endNode)
        // {
        //     return visitedNodesInOrder;
        // }
        // return;
        if(nodeStack.length===0)
        {
            // return visitedNodesInOrder;
            return;
            current=nodeStack.pop();
        }
    }
    else
    {
        let node=kids[Math.floor(Math.random()*kids.length)];

        node.previousNode=current;

        if(current.col===node.col)
        {
            if(current.row<node.row)
            {
                grid[current.row][current.col].bottomWall=false;
                grid[node.row][node.col].topWall=false;
            }
            else
            {
                grid[current.row][current.col].topWall=false;
                grid[node.row][node.col].bottomWall=false;
            }
        }
        else
        {
            if(current.col<node.col)
            {
                grid[current.row][current.col].rightWall=false;
                grid[current.row][node.col].leftWall=false;
            }
            else
            {
                grid[current.row][current.col].leftWall=false;
                grid[current.row][node.col].rightWall=false;
            }
        }
        // move(node,grid,nodeStack,startNode,endNode,visitedNodesInOrder);
        current=node;
        nodeStack.push(current);
    }
    move(current,grid,nodeStack,startNode,endNode,visitedNodesInOrder);
};

const getKids=(node,grid)=>{
    let kids=[];
    const row=current.row;
    const col=current.col;


    //check all directions
    if(row>0)
    {
        kids.push(grid[row-1][col]);
    }
    if(row<grid.length-1)
    {
        kids.push(grid[row+1][col]);
    }
    if(col>0)
    {
        kids.push(grid[row][col-1]);
    }
    if(col<grid[0].length-1)
    {
        kids.push(grid[row][col+1]);
    }
    return kids.filter((kid)=>!kid.isValid);
};

//backtracking from the finish node to find the path(shortest path)

export function getNodesInShortestPath(finishNode)
{
    const nodeInShortestPathOrder=[];
    let current=finishNode;
    // while(current.previousNode!==null)
    while(current!==null)
    {
        //unshift is used to add the node to the beginning
        nodeInShortestPathOrder.unshift(current);
        current=current.previousNode;
    }
    return nodeInShortestPathOrder;
}