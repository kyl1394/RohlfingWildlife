import React from 'react';

import './About.css';

const AboutPage = () => (
  <div className={'aboutMePage includeBackground'}>
    <div className="header">
      <h2>Kyle Rohlfing</h2>
      <h3>Wildlife Photographer | Software Engineer | Avid Explorer</h3>
    </div>
    <div style={{paddingRight: '150px'}}>
      <img className="aboutMePhoto" alt="Kyle Rohlfing Portrait" src="https://images.squarespace-cdn.com/content/v1/5bcea03b77b903456b709b00/1551847899095-VVQKN5ROV6DM9TH0KB54/ke17ZwdGBToddI8pDm48kJeg4s6veog0rNcjHTCQNwh7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmujyyI7Frso6MRdplGTbhDpMGdeM8OBEQAzLO35Q5amTnaglVaVzA-hLYjFHbo-x9/Me+Yelloowstone.jpg?format=1500w" />
    </div>
    <div className="aboutMe">
      <p>
        Welcome to my world of exploration!
      </p>
      <p>
        Widlife photography has provided me with the unique opporutunity to travel and gain a deep understanding for the natural world and those that inhabit it.
        <br />
        Located in the great city of Omaha, Nebraska my work tends to feature the ecology found in the Midwest United States.
      </p>

      <p>
        I have a very detailed, and yet environmental style preferring to show both a clear view of the wildlife and the location and conditions in which they live.
        <br />
        All of my photos are available for print, and can be found adorning many peoples homes and businesses
      </p>

      <p>
        I'm very active on social media and upload photos regularly. If you'd like to see more please visit me on <a href="https://www.facebook.com/RohlfingWildlife">Facebook</a> and <a href="https://www.instagram.com/rohlfingwildlife">Instagram (@rohlfingwildlife)</a>
      </p>
      <p>
        Feel free to reach out to me, should you have any questions or requests
      </p>

      <p>
        Email: <a href="mailto:smallwildernessphotography@gmail.com">smallwildernessphotography@gmail.com</a>
        <br />
        <strong>Phone:</strong> <a href="tel:5152913405">515-291-3405</a>
      </p>

    </div>
  </div>
);

export default AboutPage;
