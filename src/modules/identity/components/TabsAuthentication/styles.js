import { borderRadius } from "@mui/system";

export default (theme) => ({
  card: {
    width: "800px !important",
    height: "62px",
    // backgroundColor: '#F1F3FF !important',
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important",
    borderRadius: "12px !important",
    marginTop: "25px",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important ",
    },
  },
  cardheader: {
    [`& .css-1qvr50w-MuiTypography-root`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  input: {
    display: "none",
  },
  content: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    // backgroundColor:'black',
    padding: "0 !important",
  },
  maintext: {
    width: "200px",
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  margintop: {
    marginTop: "10px",
  },
  IconButton: {
    marginRight: "10px !important",
    flexDirection: "flex-end",
  },
  typography: {
    width: "100%",
    padding: "10px 0px 10px 20px",
  },
});
