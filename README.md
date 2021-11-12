# **Home Seeker**  
<br>
Tired of checking craigslist multiple times a day or missing opportunities for a dream home? 

We were too!
      
Home seeker gets this tiring part of the search out of your hands. <br><br>

***
## How does it work?
You just need to define your criteria: location and budget and insert into "Home Seeker".  
The system will check on all inputs on craigslist and send you the available places directly to your personal email and record the data. Then you just click on the link and it will connect you to the craigslist ad.  
Additionally, the system has an UI that allows to manage all the ads recorded in the database.<br><br>

***
## Technical overview
1. Github Action triggers a post request to the server.<br>
2. Server receives the post request and queries Craigslist and Atlas MongoDB.<br>
3. Server receives the results and compares than.<br>
4. If any update or new item, the system emails the adminsitrators.<br>
5. Users or Administrators may request to check the items.<br>
p.s. Optionally, the admins can remove ads. This is usefull to keep the availables items clean, showing only the desired ones.<br><br>

![archt](/front-end/src/graphics/architecture.png)<br><br><br>

***
**More info, check out at https://home-seeker.tkwebdev.ca.**