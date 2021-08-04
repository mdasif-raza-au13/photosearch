import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: "auto",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        cursor: "pointer",
    },
}));

const DefaultImg = () => {

    const classes = useStyles()

    const [photos, setPhotos] = useState([])
    const [modalPic, setModalPic] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = (pic) => {
        setModalPic(pic)
        setOpen(true);
    };

    const handleClose = () => {
        setModalPic('')
        setOpen(false);
    };


    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const data = await axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=dda525f9f7a6a6d62b745b310cfe9083&page=1&format=json&nojsoncallback=1')
                const pics = data.data.photos.photo
                setPhotos(pics)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPhoto()
    }, [])

    const picSource = photos.map((photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`)

    const displayPic = picSource.map((pic, index) =>
        <Grid key={index} item xs={12} sm={4} >
            <Card className={classes.root}>
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image={pic}
                        title="pic"
                        onClick={() => handleOpen(pic)}
                    />
                </CardContent>
            </Card>
        </Grid>
    )

    return (
        <>
            <Container>
                <h1>default image</h1>
                <Grid container spacing={2}>
                    {displayPic}
                </Grid>
            </Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <img src={modalPic} alt="pic" />
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default DefaultImg
