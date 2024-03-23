import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav>
            <ul className='bottoms-navigate'>
                <li className='link-nav printable'><Link to="/main">Стандартные</Link></li>
                <li className='link-nav printable'><Link to="/shapes">Размер</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
