"use client"
import LogOut from "@/app/profile/LogOut";
import {tailwindStyles} from "@/lib/styles";
import {useCurrentUser} from "@/lib/hooks";
import Loading from "@/components/ui/Loading";

export async function getServersideProps(){
    const {user, loading} = useCurrentUser();
    if (!user){
        return{
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}

export default function page() {
    const {user, loading} = useCurrentUser();

    if (loading){
        return <Loading/>
    }

    return (

        <div>
            <div className={tailwindStyles.heading1}>
                Welcome, {user?.displayName}
            </div>

            <LogOut/>

        </div>
    )
}