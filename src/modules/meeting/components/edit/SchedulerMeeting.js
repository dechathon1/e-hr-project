import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  EditRecurrenceMenu,
  CurrentTimeIndicator,
  DragDropProvider,
  Toolbar,
  DateNavigator,
  WeekView,
  TodayButton,
  MonthView,
  ViewSwitcher,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { navHeight } from "../../../layout/components/Attribute";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { addMeeting } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import ForceUpdateDialog from "./ForceUpdateDialog";
import ModalUpdate from "../../../common/ModalUpdate";
import ConfirmDialog from "./ConfirmDeleteDialog";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import FormUpdateScheduler from "./FormUpdateScheduler";
import { clearAddState } from "../../actions";

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  firstRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
  },
  secondRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
  },
  thirdRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
  },
  header: {
    height: "210px",
    backgroundSize: "cover",
  },
  commandButton: {
    margin: "5px 5px",
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: "0 10px 0 auto !important",
    minHeight: "39px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px !important",
      margin: "0 5px 0 auto !important",
      width: "50px",
    },
  },
}));

const Content = withStyles(style, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    ></AppointmentTooltip.Content>
  )
);

const CommandButton = withStyles(style, { name: "CommandButton" })(
  ({ classes, ...restProps }) => (
    <AppointmentTooltip.CommandButton
      {...restProps}
      className={classes.commandButton}
    />
  )
);

export default function SchedulerMeeting(props) {
  const { meetRoom, myMeeting, members, uid } = props;
  const classes = useStyles();
  const { addState, submittingState } = useSelector(
    (state) => state.meetReducer
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const [option, setOption] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [appointmentVisible, setAppointmentVisible] = useState(false);
  const [state, setState] = React.useState({
    currentViewName: "Week",
  });

  let data = myMeeting;
  let currentDate = new Date();
  let startDayHour = "9";
  let endDayHour = "19";
  let resources = [
    {
      fieldName: "roomId",
      title: "Room",
      instances: meetRoom,
    },
    {
      fieldName: "members",
      title: "Members",
      instances: members,
      allowMultiple: true,
    },
  ];

  const currentViewNameChange = (currentViewName) =>
    setState({ currentViewName });
  const handleCloseUpdate = () => {
    if (Object.keys(addState).length === 0) {
      setOpenUpdateForm(false);
      setEditInfo("");
      setOption("");
      if (option !== "add" && option !== "") {
        setAppointmentVisible(true);
        console.log("faf");
      }
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteID("");
  };
  const onVisibilityChange = () => {
    setAppointmentVisible(!appointmentVisible);
  };

  const Header = withStyles(style, { name: "Header" })(
    ({ children, appointmentData, classes, onClick, ...restProps }) => {
      console.log(appointmentData);
      let timeDiff = moment.duration(
        moment(appointmentData.endDate).diff(appointmentData.startDate)
      );
      let hours = Math.floor(timeDiff.asSeconds() / 3600);
      let min = Math.floor((timeDiff.asSeconds() - hours * 3600) / 60);
      let isPast =
        moment(appointmentData.startDate).isBefore(moment()) ||
        moment(appointmentData.endDate).isBefore(moment());
      let disabled = false;
      if (hours + "." + min <= 0 || isPast) {
        disabled = true;
      } else {
        disabled = false;
      }
      return (
        <AppointmentTooltip.Header
          {...restProps}
          className={classNames(classes.secondRoom, classes.header)}
          appointmentData={appointmentData}
        >
          <IconButton
            onClick={() => {
              setEditInfo(appointmentData);
              setOpenUpdateForm(true);
              setOption("update");
              setAppointmentVisible(false);
            }}
            className={classes.commandButton}
            disabled={disabled}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteID(appointmentData.id);
              setOpenDeleteDialog(true);
            }}
            disabled={disabled}
            className={classes.commandButton}
          >
            <DeleteIcon />
          </IconButton>
        </AppointmentTooltip.Header>
      );
    }
  );

  const FlexibleSpace = () => (
    <Button
      className={classes.addButton}
      onClick={() => {
        setOption("add");
        setOpenUpdateForm(true);
      }}
      variant="outlined"
    >
      ADD +
    </Button>
  );

  return (
    <Paper style={{ overflow: "hidden" }}>
      <ConfirmDialog
        open={openDeleteDialog}
        handleCloseConfirmDialog={handleCloseConfirmDialog}
        deleteID={deleteID ? deleteID : ""}
      />
      <ModalUpdate
        open={openUpdateForm}
        handleClose={!submittingState.submitting ? handleCloseUpdate : ""}
        title="Scheduler Update"
      >
        <FormUpdateScheduler
          handleClose={handleCloseUpdate}
          option={option}
          data={editInfo}
          meetRoom={meetRoom ? meetRoom : ""}
          members={members ? members : ""}
        />
      </ModalUpdate>
      <Scheduler data={data}>
        <ViewState
          defaultCurrentDate={currentDate}
          currentViewName={state.currentViewName}
          onCurrentViewNameChange={currentViewNameChange}
        />
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
        <MonthView />
        <Appointments />
        {/* <DragDropProvider /> */}
        <AppointmentTooltip
          headerComponent={Header}
          contentComponent={Content}
          commandButtonComponent={CommandButton}
          visible={appointmentVisible}
          onVisibilityChange={onVisibilityChange}
          // showOpenButton
          // showDeleteButton
        />
        <Toolbar flexibleSpaceComponent={FlexibleSpace} />
        <DateNavigator />
        <TodayButton />
        <Resources data={resources} mainResourceName="roomId" />
        <ViewSwitcher />
        <CurrentTimeIndicator
          shadePreviousCells={true}
          shadePreviousAppointments={true}
          updateInterval="10000"
        />
      </Scheduler>
      {/* <IconButton className={classes.addButton}>
        <AddIcon style={{ color: "white", width: "25px", height: "25px" }} />
      </IconButton> */}
    </Paper>
  );
}
