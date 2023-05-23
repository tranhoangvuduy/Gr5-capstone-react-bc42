import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start bg-light text-muted">
  {/* Section: Social media */}
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    {/* Left */}
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    {/* Left */}
    {/* Right */}
    <div>
      <a href='https://www.facebook.com/' target="blank" className="me-4 text-reset">
        <FontAwesomeIcon icon={['fab','facebook']}/>
      </a>
      <a  href='https://twitter.com/' target='blank'  className="me-4 text-reset">
        <FontAwesomeIcon icon={['fab','twitter']}/>
      </a>
      <a href='https://www.instagram.com/' target='blank'  className="me-4 text-reset">
        <FontAwesomeIcon icon={['fab','instagram']}/>
      </a>
      <a  href='https://www.linkedin.com/' target='blank' className="me-4 text-reset">
        <FontAwesomeIcon icon={['fab','linkedin']}/>
      </a>
      <a  href='https://www.snapchat.com/' target='blank' className="me-4 text-reset">
        <FontAwesomeIcon icon={['fab','snapchat']}/>
      </a>
      <a href='https://github.com/' target='blank' className="me-4 text-reset">
        <FontAwesomeIcon icon={['fab','github']}/>
      </a>
    </div>
    {/* Right */}
  </section>
  {/* Section: Social media */}
  {/* Section: Links  */}
  <section className>
    <div className="container text-center text-md-start mt-5">
      {/* Grid row */}
      <div className="row mt-3">
        {/* Grid column */}
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          {/* Content */}
          <h6 className="text-uppercase fw-bold mb-4"> 
         <FontAwesomeIcon icon={['fas','film']}/> Movie Corp
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
           Dịch vụ
          </h6>
          <p>
            <a href="#" className="text-reset text-decoration-none">Lịch chiếu</a>
          </p>
          <p>
            <a href="#" className="text-reset text-decoration-none">Cụm rạp</a>
          </p>
          <p>
            <a href="#" className="text-reset text-decoration-none">Tin tức</a>
          </p>
          <p>
            <a href="#" className="text-reset text-decoration-none">Ứng dụng</a>
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
            Chính sách
          </h6>
          <p>
            <a href="#!" className="text-reset text-decoration-none">Điều khoản</a>
          </p>
          <p>
            <a href="#!" className="text-reset text-decoration-none">Settings</a>
          </p>
          <p>
            <a href="#!" className="text-reset text-decoration-none">Chính sách bảo mật</a>
          </p>
          <p>
            <a href="#!" className="text-reset text-decoration-none">Trợ giúp</a>
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><FontAwesomeIcon icon={['fas','house']}/> New York, NY 10012, US</p>
          <p>
            <FontAwesomeIcon icon={['fas','inbox']}/>  info@example.com
          </p>
          <p> <FontAwesomeIcon icon={['fas','phone']}/> + 01 234 567 88</p>
          <p> <FontAwesomeIcon icon={['fas','phone']}/> + 01 234 567 89</p>
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}
    </div>
  </section>
  {/* Section: Links  */}
  {/* Copyright */}
  <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
    © 2023 Copyright
  </div>
  {/* Copyright */}
</footer>

    </div>
  )
}

export default Footer