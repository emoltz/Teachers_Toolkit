import LogOut from "@/app/profile/LogOut";
import {tailwindStyles} from "@/lib/styles";

export default function page() {

    return (

        <div>
            <div className={tailwindStyles.heading1}>
                My Profile
            </div>

            <LogOut/>

        </div>
    )
}