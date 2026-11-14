"use client";
import {useSearchParams} from "next/navigation";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/lib/firebase"
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
export default function InvitePage() {
    const searchParams = useSearchParams();
    const router = useRouter();

async function handleAcceptInvitation(token: string,joinToken: string,id: string) {
    try{
const reponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/backend/assistant/set-permission/${id}/${joinToken}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

    })

    if (!reponse.ok) {
        throw new Error("Failed to accept invitation");
        
    }
    const data = await reponse.text();
    router.replace("/sales/OnGoing/"+data);
    }catch(err){
        console.log(err);
        router.replace("/dashboard");
    }
    
}

const token = searchParams.get("token");
const invitationHandled = useRef(false);

useEffect(() => {
  if (!token) {
    router.replace("/auth/login");
    return;
  }

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user && !invitationHandled.current) {
      invitationHandled.current = true;
      console.log("User:", user.uid);
      handleAcceptInvitation(await user.getIdToken(), token, user.uid);
    } else {
      console.log("User not logged in");
    }
  });

  return () => unsubscribe();
}, [router, token]);

if (!token) {
  return <div>Invalid Invitation</div>;
}
}