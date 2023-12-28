import { useEffect } from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useLocation } from 'react-router-dom';

export default function ScrollAnimation() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    useEffect(() => {
        Aos.init({ duration: 1000 })
    })
    return null;
}
