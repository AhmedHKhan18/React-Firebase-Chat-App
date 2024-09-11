import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Drop() {
    const navigate = useNavigate();
const handleLogout = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LogOut!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logged Out!",
            text: "Your have been Logged Out.",
            icon: "success"
          });
          localStorage.removeItem('userId');
          navigate('/login', {replace: true})
        }
      });
      };

  return (
      <Dropdown label="" className="bg-gray-800">
      <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}