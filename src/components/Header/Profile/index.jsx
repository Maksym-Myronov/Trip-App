import { useAuth0 } from "@auth0/auth0-react"
//Styles
import styles from '../index.module.scss'

const Profile = () => {

    const {isAuthenticated, user} = useAuth0()

    return (
        isAuthenticated && (
            <div>
                {user?.picture && <img src={user.picture} alt={user?.name} className={styles.header__profile} />}
            </div>
        )
    )
}

export default Profile
