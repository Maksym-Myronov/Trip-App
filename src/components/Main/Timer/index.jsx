//Styles
import styles from './index.module.scss'
//Images 
import sun from '../../../assets/images/01_sunny_color.svg'

const Timer = () => {
    return (
        <div className={styles.timer}>
            <div className={styles.timer__container}>
                <div className={styles.timer__info}>
                    <h1>Sunday</h1>
                    <div className={styles.timer__city}>
                        <img src={sun} alt="sun" />
                        <p>24°</p>
                    </div>
                    <p>Berlin</p>
                </div>
                <div className={styles.timer__data}>
                    <div>
                        <h1>30</h1>
                        <p>Days</p>
                    </div>
                    <div>
                        <h1>15</h1>
                        <p>Hours</p>
                    </div>
                    <div>
                        <h1>15</h1>
                        <p>Minutes</p>
                    </div>
                    <div>
                        <h1>30</h1>
                        <p>Seonds</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer
