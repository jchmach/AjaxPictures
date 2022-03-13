import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    return (
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">AJAX PICTURES</Typography>
                
            </AppBar>
            <Grow in>
                <Container>
                    


                </Container>

            </Grow>
        </Container>
    );
}

export default App;