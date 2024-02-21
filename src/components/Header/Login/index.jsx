import { useAuth0 } from "@auth0/auth0-react"
//Styles
import styles from "../index.module.scss"

const Login = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()} className={styles.header__log}>
                Sign In
            </button>
        )
    )
}

export default Login
