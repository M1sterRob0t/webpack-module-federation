import capital from '@/assets/capital.png';
import aura from '@/assets/aura.jpg';
import Cloud from '@/assets/cloud.svg';

import classes from './Gallery.module.scss';

export function Gallery() {
    return (
        <section>
            <h1> Gallery </h1>
            <div className={classes.container}>
                <img src={capital} width={400} height={400}/>
                <img src={aura} width={400} height={400}/>
                <Cloud width={400} height={400} color='violet'/>
            </div>
        </section>
    )
}