# Ryokan-Review-Website

**Fullstack Project**

**Premise**

I really love travel to Japan and enjoy local Onsen Ryokan there, this website is about ryokan reveiw

**User Story**

As a user I want to

• Be able to sign up and login

• Be able to create new ryokan page and review it

• Be able to add a review at existing ryokan

• Be able to see your review history by logging into your account

• Be able to edit and delete your previous reviews

• Be able to see ryokan's location

• Be able to do ryokan search by ryokan name

**The Wireframes:**
• Main Page

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/main.jpg)

• Show Page

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/show.jpg)

• Reviews Under Ryokan Page

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/review.jpg)

• Add New Ryokan Page

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/new.jpg)

• My Account Page

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/account.jpg)

**The ERD:**  
Every Ryokan can have many reviews

Every user can add many reviews

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/ERD.jpg)

**Route Table:**  
•Index GET /ryokans

•Show GET /ryokans/:id

•New GET /ryokans/new

•Create POST /ryokans

•Create Review GET /ryokans/:id

•Get Edit Review GET /reviews/:ReviewId/edit

•Update edited Review PUT /reviews/:ReviewId

•Create review POST /ryokans/:id/reviews/new

•Destroy DELETE review /reviews/:ReviewId

•SignUp GET /ryokans/signup

•CreateSignUp POST /ryokans/signup

•Login GET /ryokans/login

•CreateLogin POST /ryokans/login

•Account GET /user/myaccount

**Technologies Used:**
JavaScript, Liquid, Express, Mongoose, MongdoDB Atlas, Node, Heroku
