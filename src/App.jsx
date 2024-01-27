import { useState, useMemo } from 'react'
import './App.css'
import db from './assets/db.json'
function App() {
  console.log(db)
  const [id, setId] = useState(1);
  return <div>
    {useMemo(() => <InputField setId={setId} />, [])}
    <Profile id={id}/>
  </div>
}
function InputField({setId}) {
  console.log("input field rerendered")
  return <div>
    
    <input type="text" placeholder="Enter the id" onChange={(e)=>{
      setId((e.target.value))
    }}/>
  </div>
}let styles = {
  profile: {
    
    fontFamily: 'Roboto, sans-serif',
    container: {
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    width: "40%",
    minWidth: "200px",
    height: "40%",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F9F9F9  ",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
  
    image: {
      top:"20%",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      position: "relative", // Position relative for z-index to work
      zIndex: 1, // Image should be above the banner
    },
    banner: {
      width: "100%",
      height: "40%", // Half of the container's height
      objectFit: "cover",
      background: "",
      position: "absolute",
      backgroundPosition: "center center",
      top: 0,
      left: 0,
      zIndex: 0, // Banner should be behind the image
      overflow: "hidden",
      borderRadius: "10px",
    },
    header:{
      width: "100%",
      height: "35%", // Half of the container's height
      objectFit: "cover",
      position: "absolute",
      top:"40%",
      left: 0,
      zIndex: 0, // Banner should be behind the image
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      color:"black",
      flexDirection:"row",
    },
    line:{
      top:"65%",
      background:"#CCCCCC ",
      width:"60%",
      position:"absolute",
      height:"1px",
    },
    footer:{
      width: "100%",
      height: "25%", // Half of the container's height
      objectFit: "cover",
      // background: "green",
      position: "absolute",
      top:"75%",
      left: 0,
      zIndex: 0, // Banner should be behind the image
      justifyContent:"space-around",
      display:"flex",
      flexDirection:"row",
      // backgroundImage: "linear-gradient(white, grey)",
      item:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        color:"black",
      }
    }
  },
};

function Profile({ id }) {
  // Convert id to a number
  const userId = parseInt(id);

  // Find the user with the matching userid
  let user = db.db.find((user) => user.userid === userId);
  console.log(user)
  if(user==undefined){user = db.db.find((user) => user.userid === 1);}
  if(user!=undefined){
  styles.profile.banner.background=user.banner_url;
  return (user &&
    <div style={styles.profile.container}>
      <div style={{
            ...styles.profile.banner,
            backgroundImage: `url(${user.banner_url})`,
          }}></div>
      {user && <img style={styles.profile.image} src={user.image_url} alt="" />}
      <div style={styles.profile.header}>
        <b style={{marginRight: "10px",}}>{user.name}</b><p>{user.age}</p></div>
        <div style={styles.profile.line}></div>
      <div style={styles.profile.footer}>
        <div style={styles.profile.footer.item}>{user.followers}<p>followers</p></div>
        
        <div style={styles.profile.footer.item}>{user.likes}<p>Likes</p></div>
        <div style={styles.profile.footer.item}>{user.posts}<p>Posts</p></div>
      </div>
    </div>
  );
}
}


export default App
