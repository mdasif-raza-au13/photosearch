import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Input from './Input'


const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1,
        flexGrow: 1,
        position: 'sticky',
        top: 0,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
}));

const Search = () => {
    const classes = useStyles('')

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Search Photos
                        </Typography>
                        <div className={classes.search}>
                            <Input />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}

export default Search
