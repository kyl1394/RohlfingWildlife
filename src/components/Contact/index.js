import React, { Component } from 'react';

import './Contact.scss';

class ContactPage extends Component {
  render() {
    return (
        <div className={'includeBackground'}>
          <section>
            <h2 style={{textAlign: 'center'}}>Contact Me</h2>
            <p>
              Would love to connect!
            </p>
            <br />
            <p>
              <strong>Kyle Rohlfing</strong>
              <br /><strong>Email:</strong> <a href="mailto:rohlfingwildlife@gmail.com">rohlfingwildlife@gmail.com</a>
              <br /><strong>Phone:</strong> <a href="tel:5152913405">515-291-3405</a>
            </p>
          </section>
          <section className="contact-section">
              <form className="form" action="mailto:rohlfingwildlife@gmail.com" method="post" enctype="text/plain">
                  <div className="id">
                      <div className="firstName">
                          <label htmlFor="firstName">First Name</label>
                          <input id="firstName" type="text" name="firstName" />
                      </div>
                      <div className="lastName">
                          <label htmlFor="lastName">Last Name</label>
                          <input id="lastName" type="text" name="lastName" />
                      </div>
                  </div>

                  <div className="email">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" type="text" name="email" />
                  </div>

                  <div className="subject">
                      <label htmlFor="subject">Subject</label>

                      <input id="subject" type="text" name="subject" />
                  </div>

                  <div className="message">
                      <label id="contect" htmlFor="content">Message</label>

                      <textarea name="content" id="" cols="30" rows="10"></textarea>
                      <button type="submit">SUBMIT</button>

                  </div>
              </form>
          </section>
        </div>
    );
  }
}

export default ContactPage;
