import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { RiInstagramFill } from "react-icons/ri"
import "./Footer.css"
export const Footer = () => {
  return (
    <footer>
      <p> Design & Developed by Pablo, Juanma y Fede</p>
      <div className='social'>
        <RiInstagramFill className='icon' />
        <AiFillTwitterCircle className='icon' />
        <AiFillLinkedin className='icon' />
      </div>
    </footer>
  )
}