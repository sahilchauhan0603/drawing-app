'use client'; // Add this at the very top of the file
import Canvas from "@/components/Canvas/canvasMultiUser";
import HomeIcon from "@/components/Canvas/HomeIcon";
import ProfileIcons from "@/components/Canvas/ProfileIcons";
import ChatIcon from '@/components/Canvas/ChatIcon';
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; 

export default function Page({ params }: { params: Promise<{ room: string }> }) {
  const [name, setName] = useState('');
  const searchParams = useSearchParams(); 

  const [unwrappedParams, setUnwrappedParams] = useState<{ room: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const username = searchParams.get('name'); 

    if (username) {
      setName(username); 
    }
  }, [searchParams]); 

  const room = unwrappedParams?.room; 

  if (!room) return <div>Loading...</div>; 

  return (
    <div>
      <ProfileIcons />
      <Canvas room={room}/>
      <HomeIcon />
      <ChatIcon name = {name}/>
    </div>
  );
}
