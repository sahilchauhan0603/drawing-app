"use client"
import Canvas from "@/components/Canvas/canvasSingleUser";
import HomeIcon from "@/components/Canvas/HomeIcon";
import ProfileIcons from "@/components/Canvas/ProfileIcons";

export default function Page() {

  return (
    <div>
      <ProfileIcons/>
      <Canvas/>
      <HomeIcon/>
    </div>
  );
}
