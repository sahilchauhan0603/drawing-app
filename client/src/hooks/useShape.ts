import { useEffect, useRef, useState } from "react";

export const useShape = (
  onShape: ({ ctx, startPoint, endPoint }: DrawShapeProps) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startPoint = useRef<Point | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);


  const findPoints = (e: MouseEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const point = findPoints(e);
      if (!point) return;
      startPoint.current = point;
      setIsDrawing(true);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDrawing) return;
      const ctx = canvasRef.current?.getContext("2d");
      const point = findPoints(e);
      if (!ctx || !startPoint.current || !point) return;

      onShape({ ctx, startPoint: startPoint.current, endPoint: point });

      startPoint.current = null;
      setIsDrawing(false);
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onShape, isDrawing]);

  return { canvasRef};
};
