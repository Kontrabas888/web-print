import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const NavigationBar = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('*');
    };
    
    const location = useLocation();
    const shouldShowBackButton = location.pathname !== '/';


    return (
        <nav>
            {shouldShowBackButton && (
                <button className='back printable' onClick={goToHomePage}>На главную</button>
            )}
            <ul className='bottoms-navigate'>
                <li className='link-nav printable'><Link to="/main">Стандартные</Link></li>
                <li className='link-nav printable'><Link to="/shapes">Размер</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;