import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { loginUrl } from "./spotify";

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://i.imgur.com/c9VYx6D.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '& img':{
            width: '50%'
        },

        '& a':{
            padding: '20px',
            borderRadius: '99px',
            backgroundColor: '#1db954',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
            marginTop: '30%',
        },

        '& a:hover':{
            backgroundColor:' white',
            borderColor: '#1db954',
            color: '#1db954',
        }
    },
});
function Login() {
    const classes = useStyles()
    return (
        <div className={classes.login}>
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login