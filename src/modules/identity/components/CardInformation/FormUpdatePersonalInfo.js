import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import { useForm, useField } from 'react-final-form-hooks'
import classNames from 'classnames'
// import TextFieldOutlined from '../../../common/TextFieldOutlined'
import Button from '../../../common/Button'

import { makeStyles } from '@material-ui/core/styles'
import styles from './stylesForm'
import { useNavigate } from 'react-router-dom';
import { getDateFormat } from '../../actions'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { getAccountInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../actions'
import Snackbar from '../../../layout/components/Snackbar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '../../../common/Typography/Typography'
import Avatar from '@mui/material/Avatar';
import pic from '../../../../assets/pic.png'
import Badge from '@mui/material/Badge';
import { convertFileToBase64 } from '../../actions'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const useStyles = makeStyles(styles)


const FormUpdatePersonalInfo = (props) => {
    const classes = useStyles()
    const { handleClose } = props

    const dispatch = useDispatch()
    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])


    const [title, setTitle] = useState(accountInformation.Title ? accountInformation.Title : '')
    const [gender, setGender] = useState(accountInformation.Gender ? accountInformation.Gender : '')
    const [date, setDate] = useState(accountInformation.BirthDate ? new Date(accountInformation.BirthDate) : '')
    const [firstname, setFirstname] = useState(accountInformation.Firstname ? accountInformation.Firstname : '')
    const [lastname, setLastname] = useState(accountInformation.Lastname ? accountInformation.Lastname : '')
    const [user, setUser] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    // const [images, setImages] = useState([])
    // const [imageURLs, setImageURLs] = useState([])



    useEffect(() => {
        setTimeout(() => setUser({ Title: title, Firstname: firstname, Lastname: lastname, BirthDate: getDateFormat(date), Gender: gender, ImageBase64: imageBase64 }))
    }, [title, gender, date, firstname, lastname, imageBase64])

    // useEffect(() => {
    //     if (images.length < 1) return;
    //     const newImageURLs = [];
    //     images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
    //     setImageURLs(newImageURLs)
    // }, [images])

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
        const fileBase64 = await convertFileToBase64(file)
        setImageBase64(fileBase64)
        // setImages([...event.target.files])        
    }
    const onSubmit = async () => {
        await updateProfile(user)
        dispatch(getAccountInformation())
        handleClose()
        // window.location.reload();
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

                        <label for="file-input">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Avatar className={classes.smallAvatar} >
                                        <AddAPhotoIcon fontSize='small' />
                                    </Avatar>
                                }
                            >
                                <Avatar src={imageBase64 ? imageBase64 : pic} className={classes.image} />

                                <Avatar className={classes.btnfile} >
                                    <div className={classNames(classes.flex, classes.center)}>
                                        <CloudUploadIcon sx={{ width: 50, height: 50 }} />
                                        <Typography variant="body1" fontWeight='medium' color='white'>Chosen file</Typography>
                                    </div>
                                </Avatar>
                            </Badge>
                        </label>
                        <input type='file' id='file-input' className={classes.fileinput} onChange={onChangeImage} />
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
