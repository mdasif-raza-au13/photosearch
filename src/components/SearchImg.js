import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { SearchContext } from '../context/SearchContext'
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

const SearchImg = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [photos, setPhotos] = useState([])
    const [modalPic, setModalPic] = useState('')
    // eslint-disable-next-line no-unused-vars
    const { value, setValue } = useContext(SearchContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dda525f9f7a6a6d62b745b310cfe9083&text=${value}&format=json&nojsoncallback=1`)

                let search = localStorage.getItem('search')

                if (search != null) {
                    search = JSON.parse(search)
                    search = [...search, value]
                } else {
                    search = [value]
                }
                if (value != null) {
                    search = JSON.stringify(search)
                    localStorage.setItem('search', search)
                }
                const pics = data.data.photos.photo
                setPhotos(pics)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [value])

    const handleOpen = (pic) => {
        setModalPic(pic)
        setOpen(true);
    };

    const handleClose = () => {
        setModalPic('')
        setOpen(false);
    };

    const picSource = photos.map((photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`)

    const displayPic = picSource.map((pic, index) =>
        <Grid key={index} item xs={12} sm={4} >
            <Card className={classes.root}>
                <CardContent style={{ cursor: 'pointer' }} onClick={() => handleOpen(pic)}>
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
            <h1>search image</h1>
            <Container>
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

export default SearchImg
