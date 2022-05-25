import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

  const handleActive = (e) => e.isActive ? 'nav-active' : '' ;

  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className={handleActive} >
          <li>Home</li>
        </NavLink>
        <NavLink to="/quizz" className={handleActive}>
          <li id="quizz">Quizz</li>
        </NavLink>
        <NavLink to="/blog" className={handleActive}>
          <li id="blog">Blog</li>
        </NavLink>
        <NavLink to="/about" className={handleActive}>
          <li id="about">About</li>
        </NavLink>
      </ul>
    </div>
  );
};

// const Navigation = () => {
//   const [nav, setNave] = useState({});

//   const handleActive = (e) => {
//     const id = e.target.id;
//     console.log(id);

//     setNave({ [id]: true });
//   };
//   const handleInactive = (e) => {
//     const id = e.target.id;
//     setNave({ [id]: false });
//   };

//   console.log(nav)

//   return (
//     <div className="navigation">
//       <ul>
//         <NavLink to="/" className={() => ( nav && nav.home ? 'nav-active' : '') }>
//           <li onMouseOver={handleActive} id="home" onMouseOut={handleInactive}>
//             Home
//           </li>
//         </NavLink>
//         <NavLink to="/about" className={() => (nav && nav.about ? 'nav-active' : '')}>
//           <li onMouseOver={handleActive} onMouseOut={handleInactive} id="about">
//             About
//           </li>
//         </NavLink>
//       </ul>
//     </div>
//   );
// };

export default Navigation;
