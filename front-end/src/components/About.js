import Architecture from "../graphics/architecture.png";

function About() {
  return (
    <div className="app-body">
      <h2>Home Seeker</h2>

      <h3 className = "h3-about">What is it?</h3>
      <p className = "p-about">Home seeker is a system that helps you look for a new home that suits your needs. </p>

      <h3 className = "h3-about">How does it work?</h3>
      <p className = "p-about">Tired of checking craigslist multiple times a day or missing opportunities for a dream home? We were too!  </p>
      <p className = "p-about">Home seeker gets this tiring part of the search out of your hands.</p>
      <p className = "p-about">You just need to define your criteria: location, budget. then the system will check on all inputs on craigslist and send you the available places directly to your personal email. Then you just click on the link and it will connect you to the craigslist ad.</p>
      {/* <p className = "p-about">First of all, my wife and I go to craigslist and set the criterias we desire, such as location and price. We cand have how many as we want. Let's say we define more than one place and different range prices, that's okay.</p>
      <p className = "p-about">Each of those criterias are inputed in the system.</p>
      <p className = "p-about">The system runs and all queries are trigged.</p>
      <p className = "p-about">Its results are parsed and compared against the database data.</p>
      <p className = "p-about">If it is a new item, it will be recorded in the database and later it will be compared with new data and checked if its price was changed, if the post's owner deleted it.</p>
      <p className = "p-about">When there is a change (new or update data), the system emails the Home seeker's  adminsitrators (my wife and I) with the new information.</p>
      <p className = "p-about">Also, there is a client side, for both web and mobile, that allows anyone see which apartments are available, removed by owners, or removed by the administrators.</p>
      <p className = "p-about">Yes, the system allows the administrators to remove the item. It is protected by a secret and it needs a reason to be performed.</p> */}

      <h3 className = "h3-about">When does it happens?</h3>
      <p className = "p-about">The queries are executed from morning to late evening each 30 minutes. It uses a schedule provided by GitHub Actions.</p>
      <p className = "p-about">Also, it is possible to execute a post request, with a secret, that will execute the queries, compare data and record new information in database.</p>
      <p className = "p-about">The client side can be executed at any time.</p>

      <h3 className = "h3-about">Architecture</h3>
      <p className = "p-about">1- Server is running on web (Vercel).</p>
      <p className = "p-about">2- A crontab at github action will trigger the system each 30 minutes, between 7am to 9pm (personal definition).</p>
      <p className = "p-about">3- The server receives the post request, goes to craigslist; Simultaneously, it queries the database. After receiving both results, it compares the array of data and check 1) what is a new item, 2) what was changed and 3) what was deleted by the owner.</p>
      <p className = "p-about">4- After comparing the data currently recorded on database with the data received from craiglist, if any changes, it will email the Home seeker's adminstrator.</p>
      <p className = "p-about">5- The users may access the system via web and check all registeres and their status. It is possible to remove an undesired item.</p>
      <p className = "p-about">* There are 3 possible status for each item recorded:</p>
      <p className = "p-about">a- Available,</p>
      <p className = "p-about">b- Removed by Owners, it happens when the post's owners remove them,</p>
      <p className = "p-about">c- Removed by Admins, when the admins decide the item is not suitable and it will not be shown on available table.</p>
      <p className = "p-about">* One item can be removed by its owner and afterwards they want them back on craiglist. The system will detect this action and mark the item as available and reactivated.</p>

      <h3 className = "h3-about">Step-by-step on an image</h3>
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


      <h3 className = "h3-about">Tech stack</h3>
      <p className = "p-about">Node.js, React, Atlas MongoDB, HTML, CSS, Axios, Node-fetch, React-icons, Node-Mailer, and React-Modal.</p>

      <div className = "last-div-about">
        <p className = "last-p-about">Please, feel free to reach out in case any doubts or contribuitions. ;) </p>
        <p className = "last-p-about">
          Find this project on 
          <a href = "https://github.com/tonykieling/craigslist-apto" target = "_blank" rel = "noreferrer"> GitHub</a>
        </p>
        <p className = "last-p-about">
          <a href = "https://tkwebdev.ca" target = "_blank" rel = "noreferrer">https://tkwebdev.ca</a>
        </p>
        

      </div>
    </div>
  );
}

export default About;
