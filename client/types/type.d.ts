type Point = {x : number , y : number};

type Draw = {
    ctx : CanvasRenderingContext2D,
    currentPoint : Point,
    prevPoint : Point | null
    
}

type DrawLineprops = Draw & {
    color : string 
}

type DrawLineProp = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

interface PostPageProps {
  params: {
    currRoom?: string;
  };
}