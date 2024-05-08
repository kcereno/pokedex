import { FaArrowLeft } from 'react-icons/fa';

function Nav() {
  return (
    <div className="flex p-6 pb-2">
      <a href={'/'}>
        <FaArrowLeft className="size-6 text-white" />
      </a>
    </div>
  );
}

export default Nav;
