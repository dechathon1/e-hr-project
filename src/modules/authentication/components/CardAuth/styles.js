export default (theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    padding: "0",
    margin: "0",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  logoField: {
    width: "40%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    // borderRadius: '20px',
    //border:' 1px solid black',
  },
  card: {
    width: "100%",
   
    height: "618px",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%" ,
    },
  },
  form: {
    width: "60%",
    height: "100%",   
    [theme.breakpoints.down("xs")]: {
      width: "100%" ,
    },
    background: "linear-gradient(143.32deg, #F8F1FF 15.21%, #F2C2CE 97.41%)",
    // border:'1px solid black'
  },
  logo: {
    width: "270px",
    height: "149px",
  },
});
