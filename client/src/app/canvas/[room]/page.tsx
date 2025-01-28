'use client'; // Add this at the very top of the file
import Canvas from "@/components/Canvas/canvasMultiUser";
import ProfileIcons from "@/components/Canvas/ProfileIcons";
import ChatIcon from '@/components/Canvas/ChatIcon';
import HelpIcon from '@/components/Canvas/HelpIcon';
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; 

interface Params {
  room: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const [name, setName] = useState('');
  const searchParams = useSearchParams(); 

  const [unwrappedParams, setUnwrappedParams] = useState<Params | null>(null);

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
      <HelpIcon/>
      <ChatIcon room={room} name={name} />
    </div>
  );
}