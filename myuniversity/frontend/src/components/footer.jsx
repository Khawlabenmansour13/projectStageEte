



import  {React , Component}  from 'react';


export class  Footer extends Component {
  
    render() {  
        return(
<footer className="dark-footer skin-dark-footer">
				<div>
					<div className="container">
						<div className="row">
							
							<div className="col-lg-3 col-md-3">
								<div className="footer-widget">
									<img src="assets/img/logo-light.png" className="img-footer" alt="" />
									<div className="footer-add">
										<p>4967  Sardis Sta, Victoria 8007, Montreal.</p>
										<p>+1 246-345-0695</p>
										<p>info@learnup.com</p>
									</div>
									
								</div>
							</div>		
							<div className="col-lg-2 col-md-3">
								<div className="footer-widget">
									<h4 className="widget-title">Navigations</h4>
									<ul className="footer-menu">
										<li><a href="about-us.html">About Us</a></li>
										<li><a href="faq.html">FAQs Page</a></li>
										<li><a href="checkout.html">Checkout</a></li>
										<li><a href="contact.html">Contact</a></li>
										<li><a href="blog.html">Blog</a></li>
									</ul>
								</div>
							</div>
									
							<div className="col-lg-2 col-md-3">
								<div className="footer-widget">
									<h4 className="widget-title">New Categories</h4>
									<ul className="footer-menu">
										<li><a href="#">Designing</a></li>
										<li><a href="#">Nusiness</a></li>
										<li><a href="#">Software</a></li>
										<li><a href="#">WordPress</a></li>
										<li><a href="#">PHP</a></li>
									</ul>
								</div>
							</div>
							
							<div className="col-lg-2 col-md-3">
								<div className="footer-widget">
									<h4 className="widget-title">Help & Support</h4>
									<ul className="footer-menu">
										<li><a href="#">Documentation</a></li>
										<li><a href="#">Live Chat</a></li>
										<li><a href="#">Mail Us</a></li>
										<li><a href="#">Privacy</a></li>
										<li><a href="#">Faqs</a></li>
									</ul>
								</div>
							</div>
							
							<div className="col-lg-3 col-md-12">
								<div className="footer-widget">
									<h4 className="widget-title">Download Apps</h4>
									<a href="#" className="other-store-link">
										<div className="other-store-app">
											<div className="os-app-icon">
												<i className="lni-playstore theme-cl"></i>
											</div>
											<div className="os-app-caps">
												Google Play
												<span>Get It Now</span>
											</div>
										</div>
									</a>
									<a href="#" className="other-store-link">
										<div className="other-store-app">
											<div className="os-app-icon">
												<i className="lni-apple theme-cl"></i>
											</div>
											<div className="os-app-caps">
												App Store
												<span>Now it Available</span>
											</div>
										</div>
									</a>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				
				<div className="footer-bottom">
					<div className="container">
						<div className="row align-items-center">
							
							<div className="col-lg-6 col-md-6">
								<p className="mb-0">© 2020 LearnUp. Designd By <a href="https://themezhub.com/">Themezhub</a>.</p>
							</div>
							
							<div className="col-lg-6 col-md-6 text-right">
								<ul className="footer-bottom-social">
									<li><a href="#"><i className="ti-facebook"></i></a></li>
									<li><a href="#"><i className="ti-twitter"></i></a></li>
									<li><a href="#"><i className="ti-instagram"></i></a></li>
									<li><a href="#"><i className="ti-linkedin"></i></a></li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
			</footer>
        )


    }
}
export default Footer 