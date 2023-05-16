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
}