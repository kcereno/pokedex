import { FaArrowLeft } from 'react-icons/fa';

function Nav() {
  return (
    <div className="flex pt-6 px-6">
      <a href={'/'}>
        <FaArrowLeft className="text-xl text-white" />
      </a>
    </div>
  );
}

export default Nav;
