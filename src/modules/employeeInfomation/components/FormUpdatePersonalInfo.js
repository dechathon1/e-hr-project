import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-final-form-hooks'
import classNames from 'classnames'
import Button from '../../common/Button'

import { makeStyles } from '@material-ui/core/styles'
import styles from './stylesForm'
import { getDateFormat } from '../../../utils/miscellaneous'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '../../layout/components/Snackbar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '../../common/Typography/Typography'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { convertImageToBase64 } from '../../../utils/miscellaneous'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { updateProfileById } from '../actions'
import { getEmployeeInformtionByID,getEmployeeInformtion } from '../actions'
const useStyles = makeStyles(styles)


const FormUpdatePersonalInfo = (props) => {
    const classes = useStyles()
    const { handleClose, id } = props

    const dispatch = useDispatch()

    const { empInformationByID } = useSelector(state => state.employeeReducer)

    const [title, setTitle] = useState(empInformationByID.Title ? empInformationByID.Title : '')
    const [gender, setGender] = useState(empInformationByID.Gender ? empInformationByID.Gender : '')
    const [date, setDate] = useState(empInformationByID.BirthDate ? new Date(empInformationByID.BirthDate) : '')
    const [firstname, setFirstname] = useState(empInformationByID.Firstname ? empInformationByID.Firstname : '')
    const [lastname, setLastname] = useState(empInformationByID.Lastname ? empInformationByID.Lastname : '')
    const [user, setUser] = useState('')
    const [imageBase64, setImageBase64] = useState('')

    useEffect(() => {
        setTimeout(() => setUser({ Id: id, Title: title, Firstname: firstname, Lastname: lastname, BirthDate: getDateFormat(date), Gender: gender, Img: imageBase64 }))
    }, [title, gender, date, firstname, lastname, imageBase64])

    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };
    const handleChangeFirstname = (event) => {
        setFirstname(event.target.value);
    };
    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };

    const onChangeImage = async (event) => {
        const file = event.target.files[0]
        const fileBase64 = await convertImageToBase64(file)
        setImageBase64(fileBase64)

    }

    const onSubmit = async () => {
        await updateProfileById(user)
        dispatch(getEmployeeInformtionByID('', '', id))
        dispatch(getEmployeeInformtion())
        handleClose()


    };

    const { handleSubmit, submitting } = useForm({
        onSubmit: onSubmit,
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form
                className={classes.root}
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                        className={classNames(classes.center, classes.imgBox)}
                    >

                        <label for="file-input" >
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                className={classes.badge}
                                badgeContent={
                                    <Avatar className={classes.smallAvatar} >
                                        <AddAPhotoIcon fontSize='small' />
                                    </Avatar>
                                }
                            >
                                <Avatar src={imageBase64 ? imageBase64 : empInformationByID.Img ? empInformationByID.Img : ''} className={classes.image} />
                                <Avatar className={classes.btnfile} >
                                    <div className={classNames(classes.flex, classes.center)}>
                                        <CloudUploadIcon sx={{ width: 50, height: 50 }} />
                                        <Typography variant="body1" fontWeight='medium' color='white'>Chosen file</Typography>
                                    </div>
                                </Avatar>
                            </Badge>
                        </label>
                        <input type='file' id='file-input' accept="image/*" className={classes.fileinput} onChange={onChangeImage} />
                    </Grid>
                    <Grid item sm={2} xs={3}>
                        <InputLabel>Title *</InputLabel>
                        <Select
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleChangeTitle}
                            fullWidth
                        >
                            <MenuItem value="Mr.">Mr.</MenuItem>
                            <MenuItem value="Mrs.">Mrs.</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item sm={5} xs>
                        <InputLabel>First name *</InputLabel>
                        <TextField
                            id='firstname'
                            name='firstname'
                            defaultValue={firstname}
                            onChange={handleChangeFirstname}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={5} xs>
                        <InputLabel>Last name *</InputLabel>
                        <TextField
                            id='lastname'
                            name='lastname'
                            defaultValue={lastname}
                            onChange={handleChangeLastname}
                            fullWidth

                        />

                    </Grid>
                    <Grid item sm={3} xs={4}>
                        <InputLabel>Gender *</InputLabel>
                        <Select
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={handleChangeGender}
                            fullWidth
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs >
                        <InputLabel>BirthDate *</InputLabel>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            value={date}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </Grid>
                </Grid>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        loading={submitting}
                        variant={'contained'}
                        className={classes.ButtonSubmit}
                        type="submit"
                        autoFocus
                    >
                        Update
                    </Button>
                </DialogActions>
            </form>
            <Snackbar />
        </LocalizationProvider >

    )
}

export default FormUpdatePersonalInfo
