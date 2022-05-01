import "../App.css"
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const Loader =() =>

{
        return(
            <motion.div className="loaderContainer">
                <div className="cup">
                        <div className="handle"></div>
                </div>

            </motion.div>
        )
}


export default Loader;
