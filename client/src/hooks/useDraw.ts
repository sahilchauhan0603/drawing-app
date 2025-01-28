import { useEffect, useRef, useState } from "react"

export const useDraw = (onDraw : ({ctx , currentPoint , prevPoint} : Draw) => void,) => {
    const [mouseUp , setMouseUp] = useState(true);

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevPoint = useRef<null | Point>(null)

    function onMouseUp(){
        setMouseUp(true)
        prevPoint.current = null
    }
    function onMouseDown(){
        setMouseUp(false)
    }

    const clear = () => {
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        ctx?.clearRect(0,0,canvas.width , canvas.height)
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        const handler = (e : MouseEvent) => {
            const currentPoint = findPoints(e);
            if(mouseUp) return
            const ctx = canvas?.getContext('2d')
            if(!ctx || !currentPoint) return

            onDraw({ctx , currentPoint , prevPoint : prevPoint.current})
            prevPoint.current = currentPoint
        }

        // to find points in the canvas 
        function findPoints ( e : MouseEvent){
            const canvas = canvasRef.current;
            if(!canvas) return

            const ctx = canvas.getBoundingClientRect()
            const x = e.clientX - ctx?.left;
            const y = e.clientY - ctx?.top;

            return{x,y}

        }

        canvas?.addEventListener('mousemove' , handler);
        window.addEventListener('mouseup' , onMouseUp);
        return () => {
            canvas?.removeEventListener("mousemove", handler);
            window.removeEventListener("mouseup", onMouseUp);
        };
    },[onDraw , mouseUp])

    return {canvasRef , onMouseDown , clear}
}