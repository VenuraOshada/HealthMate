import axios from 'axios'
import { request, gql } from 'graphql-request'

// hgraph
const MASTER_URL="https://api-ap-south-1.hygraph.com/v2/clvybrsbn02re07w6woa4g124/master"

// google map key 
const API_KEY="AIzaSyBizsfsvHan1iGwUJf7rLI276vz_5lNlvg"

//google place key map
const BASE_URL="https://maps.googleapis.com/maps/api/place"

const nearByPlace=(lat,lng)=>axios.get(BASE_URL+ 
  "/nearbysearch/json?"+ 
  "&location="+lat+","+lng+" &radius=10000 &type=pharmacy"+"&key="+API_KEY)






const getBusinessList=async()=>{
  const query=gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      address
      about
      images {
        url
      }
    }
  }
  `
  const result= await request(MASTER_URL, query);
  return result;
}

const createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked,
         businessLists: {
          connect: {id: "`+data.businessid+`"}},
       date: "`+data.date+`",
        note: "`+data.note+`",
         time: "`+data.time+`",
          userEmail: "`+data.userEmail+`",
           userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result= await request(MASTER_URL, mutationQuery);
  return result;
}

const getUserBookings=async(userEmail)=>{
  const query=gql`
  query GetUserBookings {
    bookings(orderBy: publishedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      note
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
        about
      }
    }
  }
  `

  const result= await request(MASTER_URL, query);
  return result;
}




export default{
    //getSlider,
    //getCategories,
    getBusinessList,
    //getBusinessListByCategory,
    createBooking,
    getUserBookings,
    nearByPlace
    
}


