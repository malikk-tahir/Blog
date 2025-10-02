
import {Container,Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
function Header(){
    const authStatus=useSelector((state)=>state.Auth.status);
    const navigate=useNavigate();

    const navItems=[
        {
            name:'Home',
            slug:'/',
            active:true
        },
                {
            name:'Login',
            slug:'/login',
            active:!authStatus
        },
                {
            name:'SignUp',
            slug:'/signup',
            active:!authStatus
        },
                {
            name:'All Posts',
            slug:'/allposts',
            active:authStatus
        },
                {
            name:'Add Post',
            slug:'/addpost',
            active:authStatus
        }
    ]
    return(
        <header className='py-3 shadow bg-gray-500 '>
            <Container>
            <nav className='flex justify-between'>
                    <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px'/>
                    </Link>
                    </div>
                    <div>
                    <ul className='flex ml-auto'>
                        {navItems.map((items)=> 
                            items.active?(
                                <li key={items.name}>
                                    <button onClick={()=> navigate(items.slug)}
                                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                    {items.name}</button>
                                </li>
                            ):null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header;
