import { Link } from 'react-router-dom';

function Home(){
    return(
        <>
            <ul>
                <li>
                    <Link to={'/huyen'}>WorkSpace chị Huyền</Link>
                </li>
                <li>
                    <Link to={'/hieu'}>WorkSpace Hiếu</Link>
                </li>
                <li>
                    <Link to={'/minh'}>WorkSpace Minh</Link>
                </li>

                <div className=''>*Thêm component trong src/components</div>
                <div className=''>*Thêm assets trong public/assets</div>
                <div className=''>*Chuyển động thêm ở src/action</div>
            </ul>
        </>
    )
}

export default Home;