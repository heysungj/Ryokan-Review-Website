const mongoose = require("mongoose");
const { getMaxListeners } = require("./ryokan");

// Generate object ids to set up inital data
const reviewId1 = mongoose.Types.ObjectId();
const reviewId2 = mongoose.Types.ObjectId();
const reviewId3 = mongoose.Types.ObjectId();

const userId1 = mongoose.Types.ObjectId();

// initial user
const initialUser = {
  _id: userId1,
  username: "initialUser",
  email: "123456@getMaxListeners.com",
  review: [reviewId1, reviewId2, reviewId3],
};

// initial reviews
const reviews = [
  {
    _id: reviewId1,
    title: "Wish we could stay longer!!!",
    user: userId1,
    content:
      "We stayed during Chrismas period. Rooms were very hard to come by during this time of the year. We had to check their website twice daily for nearly half a month to make sure we were able to secure 2 rooms for our family which we managed to. They only accept online reservation.All the efforts we put in to secure the rooms was worth it. Love everything about this ryokan. Nothing to fault.Breakfast and dinner was always excellent. In between meals, you can snack on free ice-cream, yoghurt made in the region which was the best we had ever tasted, milk, ferro roche, sake, soft drinks, etc... You will be very well rested, well fed, well taken care of.We were reluctant to leave after our 2 nights' stay. Maybe 3 nights will be just nice for us.We definitely return",
    photo: [
      "/onsen_photos/takefue5.jpeg",
      "/onsen_photos/takefue7.jpeg",
      "/onsen_photos/takefue8.jpeg",
    ],
  },
  {
    _id: reviewId2,
    title: "Amazing onsen ",
    user: userId1,
    content:
      "As a Japanese, I still rate this onsen very high among the others. Each room has a different character, we stayed for two nights changing rooms and equally enjoyed(because 2nd night was not available for the 1st). Room is set up beautifully and the small garden and outside bath are well taken care of. At night, don't miss to visit Oshaya bar by the lake. We enjoyed the ambiance and the light projection & installation by Teamlab.",
    photo: [
      "/onsen_photos/chikurintei2.jpeg",
      "/onsen_photos/chikurintei8.jpeg",
      "/onsen_photos/chikurintei9.jpeg",
    ],
  },
  {
    _id: reviewId3,
    title: "Amazing onsen ",
    user: userId1,
    content:
      "As a Japanese, I still rate this onsen very high among the others. Each room has a different character, we stayed for two nights changing rooms and equally enjoyed(because 2nd night was not available for the 1st). Room is set up beautifully and the small garden and outside bath are well taken care of. At night, don't miss to visit Oshaya bar by the lake. We enjoyed the ambiance and the light projection & installation by Teamlab.",
    photo: [
      "/onsen_photos/gekkoju4.jpeg",
      "/onsen_photos/gekkoju3.jpeg",
      "/onsen_photos/gekkoju5.jpeg",
    ],
  },
];

// initial ryokan data
const ryokans = [
  {
    name: "Takefue",
    address:
      "5725ｰ1 Manganji, Minamioguni, Aso District, Kumamoto 869-2402, Japan",
    img: [
      "/onsen_photos/takefue2.jpeg",
      "/onsen_photos/takefue1.jpeg",
      "/onsen_photos/takefue3.jpeg",
    ],
    tel: "+81 570-064-559",
    reviews: [reviewId1],
  },
  {
    name: "Onyado Chikurintei",
    address: "Onyado Chikurintei, 4100 武雄町 Takeo, Saga 843-0022, Japan",
    img: [
      "/onsen_photos/chikurinteiOnsen.jpeg",
      "/onsen_photos/chikurintei1.jpeg",
      "/onsen_photos/chikurintei6.jpeg",
    ],
    tel: "+81 954-23-0210",
    reviews: [reviewId2],
  },
  {
    name: "Takinoya",
    address: "北海道登別市登別温泉町162",
    img: [
      "/onsen_photos/takinoya1.jpeg",
      "/onsen_photos/takinoya2.jpeg",
      "/onsen_photos/takinoya3.jpeg",
    ],
    tel: "+81 143-84-2222",
  },
  {
    name: "Gekkuju",
    address:
      "6777-2 Manganji, Minamioguni, Aso District, Kumamoto 869-2402, Japan",
    img: ["/onsen_photos/gekkoju1.jpeg", "/onsen_photos/gekkoju7.jpeg"],
    tel: "+81 967-44-1717",
    reviews: [reviewId3],
  },
];

module.exports = { ryokans, reviews, initialUser };
