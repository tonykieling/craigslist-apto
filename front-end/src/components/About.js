import Architecture from "../graphics/architecture.png";
import { useRef } from "react";


function About() {
  const ref1    = useRef(null);
  const ref2    = useRef(null);
  const ref3    = useRef(null);
  const ref4    = useRef(null);
  const ref5    = useRef(null);
  const ref6    = useRef(null);
  const refTop  = useRef(null);

  const moveTo = goTo => {
    goTo.current.scrollIntoView({
      behavior: 'smooth',
      // block: 'start',
      // inline: 'center'
    });
  }

  return (
    <div className="app-body">
      <div 
        className = "anchors-title"
        ref = { refTop }
      />
      <h2 
        // style={{ marginBottom: "3rem"}}
      >Home Seeker &nbsp; 🏠🔍</h2>
      
      <div 
        className = "h3-about links-to-go" 
        ref = { ref1 }
        onClick = { () => moveTo(ref1) }
      > 1. What is it?</div>

      <h3 
        className="links-to-go"
        ref = { ref2 }
        onClick = { () => moveTo(ref2) }
      > 2. How does it work?</h3>

      <h3 
        className="links-to-go"
        ref = { ref2 }
        onClick = { () => moveTo(ref3) }
      > 3. When does it happen?</h3>

      <h3 
        className="links-to-go"
        ref = { ref2 }
        onClick = { () => moveTo(ref4) }
      > 4. Architecture</h3>

      <h3 
        className="links-to-go"
        ref = { ref2 }
        onClick = { () => moveTo(ref5) }
      > 5. Step-by-step on an image</h3>

      <h3 
        className="links-to-go"
        ref = { ref2 }
        onClick = { () => moveTo(ref6) }
      > 6. Tech Stack</h3>



      {/* anchor for 1. */}
      <div 
        className = "anchors"
        ref = { ref1 }
      />
      <div className = "h3-about" onClick={ () => moveTo(refTop)}>
        1. What is it? &nbsp; &nbsp; 🔝
      </div>
      <p className = "p-about">Home seeker is a system that helped my wife and I to find for a new home suitably to our needs. </p>
      {/* <p className = "p-about"><i><u><b>p.s</b></u>. Currently, the system is not being watched carefully because <b>we already have found our new place to live <u>thanks to Home-seeker</u></b>. It means the system queries craigslist only once a day and we are not given too many attention to keep the availables list clean.</i> :)</p> */}
      <p className = "p-about"><i><u><b>p.s</b></u>. Currently, the system is no longer querying Craigslist. <b>We already have found our new place to live <u>thanks to Home-seeker</u></b>.</i> 👌🙌</p>


      {/* anchor for 2. */}
      <div 
        className = "anchors"
        ref = { ref2 }
      />
      <div className = "h3-about" onClick={ () => moveTo(refTop)}>
        2. How does it work? &nbsp; &nbsp; 🔝
      </div>
      <p className = "p-about">Tired of checking craigslist multiple times a day or missing opportunities for a dream home? We were too!  </p>
      <p className = "p-about">Home seeker gets this tiring part of the search out of your hands.</p>
      <p className = "p-about">You just need to define your criteria: location, budget. then the system will check on all inputs on craigslist and send you the available places directly to your personal email. Then you just click on the link and it will connect you to the craigslist ad.</p>



      {/* anchor for 3. */}
      <div 
        className = "anchors"
        ref = { ref3 }
      />
      <div className = "h3-about" onClick={ () => moveTo(refTop)}>
        3. When does it happen? &nbsp; &nbsp; 🔝
      </div>
      <p className = "p-about">The queries are executed from morning to late evening each 30 minutes. It uses a schedule provided by GitHub Actions.</p>
      <p className = "p-about">Also, it is possible to execute a post request, with a secret, that will execute the queries, compare data and record new information in database.</p>
      <p className = "p-about">The client side can be executed at any time.</p>



      {/* anchor for 4. */}
      <div 
        className = "anchors"
        ref = { ref4 }
      />
      <div className = "h3-about" onClick={ () => moveTo(refTop)}>
        4. Architecture &nbsp; &nbsp; 🔝
      </div>
      <p className = "p-about">1- Server is running on web (Vercel).</p>
      <p className = "p-about">2- A crontab at github action will trigger the system each 30 minutes, between 7am to 9pm (personal definition).</p>
      <p className = "p-about">3- The server receives the post request, goes to craigslist; Simultaneously, it queries the database. After receiving both results, it compares the array of data and check 1) what is a new item, 2) what was changed and 3) what was deleted by the owner.</p>
      <p className = "p-about">4- After comparing the data currently recorded on database with the data received from craiglist, if any changes, it will email the Home seeker's adminstrator.</p>
      <p className = "p-about">5- The users may access the system via web and check all registeres and their status. It is possible to remove an undesired item.</p>
      <p className = "p-about">* There are 3 possible status for each item recorded:</p>
      <p className = "p-about-items">a- Available,</p>
      <p className = "p-about-items">b- Removed by Owners, it happens when the post's owners remove them,</p>
      <p className = "p-about-items">c- Removed by Admins, when the admins decide the item is not suitable and it will not be shown on available table.</p>
      <p className = "p-about">* One item can be removed by its owner and afterwards they want them back on craiglist. The system will detect this action and mark the item as available and reactivated.</p>



      {/* anchor for 5. */}
      <div 
        className = "anchors"
        ref = { ref5 }
      />
      <div className = "h3-about" onClick={ () => moveTo(refTop)}>
        5. Step-by-step on an image &nbsp; &nbsp; 🔝
      </div>
      <p className = "p-about">1- Github Action triggers a post request to the server.</p>
      <p className = "p-about">2- Server receives the post request and queries Craigslist and Atlas MongoDB.</p>
      <p className = "p-about">3- Server receives the results and compares than.</p>
      <p className = "p-about">4- If any update or new item, the system emails the adminsitrators.</p>
      <p className = "p-about">5- Users or Administrators may request to check the items; Optionally, the admins can remove ads. This is usefull to keep the availables items clean, showing only the desired ones.</p>

      <div className = "position-img-about">
        <img
          src = { Architecture }
          alt = "shows the architecture"
          className = "img-about"
        />
      </div>



      {/* anchor for 5. */}
      <div 
        className = "anchors"
        ref = { ref6 }
      />
      <div className = "h3-about" onClick={ () => moveTo(refTop)}>
        6. Tech Stack &nbsp; &nbsp; 🔝
      </div>
      <p className = "p-about">Node.js, React, Atlas MongoDB, HTML, CSS, Axios, Node-fetch, React-icons, Mongoose, Node-Mailer, and React-Modal.</p>

      <div className = "last-div-about">
        <p className = "last-p-about">Please, feel free to reach out in case any doubts or contribuitions. ;) </p>
        <p className = "last-p-about">
          Find this project on 
          <a href = "https://github.com/tonykieling/home-seeker" target = "_blank" rel = "noreferrer"> GitHub</a>
        </p>
        <p className = "last-p-about">
          <a href = "https://tkwebdev.ca" target = "_blank" rel = "noreferrer">https://tkwebdev.ca</a>
        </p>
        

      </div>
    </div>
  );
}

export default About;
