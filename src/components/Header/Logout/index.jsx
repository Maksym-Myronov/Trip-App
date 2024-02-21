import { useAuth0 } from "@auth0/auth0-react"
import styles from '../index.module.scss'

const Logout = () => {

    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button onClick={() => logout()} className={styles.header__out}>
                Sign Out
            </button>
        )
    )
}

export default Logout
