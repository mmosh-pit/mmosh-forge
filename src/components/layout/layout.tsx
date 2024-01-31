import HeaderVW from '../../ui/header/headervw';
const Layout =(props:any) =>{
    return (
        <div className='root-container'>
            <HeaderVW />
            <div className='content-container'>
              {props.children}
            </div>
        </div>
    );
}


export default Layout;