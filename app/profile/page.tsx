"use client"
import LogOut from "@/app/profile/LogOut";
import {tailwindStyles} from "@/lib/styles";
import {useCurrentUser} from "@/lib/hooks";
import UserAuthForm from "@/components/auth/UserAuthForm";

export default function page() {
    const {user, loading} = useCurrentUser();
    if (!user){
        return(
            <div>
                <UserAuthForm/>
            </div>
        )
    }
    return (

        <div>
            <div className={tailwindStyles.heading1}>
                My Profile
            </div>

            <LogOut/>

        </div>
    )
}