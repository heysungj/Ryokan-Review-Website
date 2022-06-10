# Ryokan-Review-W#Onsen Ryokan Review Website

**Fullstack Project**

**Premise**

I really love to travel to Japan and enjoy local Onsen Ryokan there, this website is about ryokan reveiw

**User Story**

As a user I want to

• Be able to sign up and login

• Be able to create new ryokan page and review it

• Be able to add a review at existing ryokan

• Be able to see your review history by logging into your account

• Be able to edit and delete your previous reviews

• Be able to see ryokan's location

• Be able to do ryokan search by input city name

**The Wireframes:**

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/main.jpg)

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/show.jpg)

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/new.jpg)

![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/addReview.jpg)
![alt text](https://github.com/heysungj/Ryokan-Review-Website/blob/main/public/photos/account.jpg)

**The ERD:**  
Every Ryokan can have many reviews

Every user can add many reviews

**Route Table:**  
•Index GET /ryokans

•Show GET /ryokans/:id

•New GET /ryokans/new

•Create POST /ryokans

•Edit GET /ryokans/edit/:id

•Update PUT /ryokans/:id

•CreateReview GET /ryokans/addReview/:id

•Create POST /ryokans/addReview/:id

•Destroy DELETE /Ryokans/review/:id

•SignUp GET /ryokans/signup

•CreateSignUp POST /ryokans/signup

•Login GET /ryokans/login

•CreateLogin POST /ryokans/login

•Account GET /ryokans/account/:userId

**Technologies Used:**
JavaScript, Liquid, Express, Mongoose, MongdoDB, Node

**How To Use:**

**MVP Requirements:**

**Stretch goals / ICE BOX:**
