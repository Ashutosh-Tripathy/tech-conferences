import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid
} from "@material-ui/core/";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import { sortBy } from "lodash";

import "./styles.css";
// import data from "./data.json";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Board extends React.Component {
  getDate(dateFrom, dateTo) {
    if (!dateFrom || !dateTo) {
      return;
    }
    const oDateFrom = new Date(dateFrom.toMillis());
    const oDateTo = new Date(dateTo.toMillis());

    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    return (
      oDateFrom.getUTCDate() +
      " " +
      monthArray[oDateFrom.getUTCMonth()] +
      ", " +
      oDateFrom.getUTCFullYear() +
      " to " +
      oDateTo.getUTCDate() +
      " " +
      monthArray[oDateTo.getUTCMonth()] +
      ", " +
      oDateTo.getUTCFullYear()
    );
  }
  render() {
    // const rows = sortBy(data, "date");
    const { classes, events, requesting } = this.props;
    console.log(events);
    return (
      <div>
        {requesting == true ? (
          <div style={{ marginTop: "50px" }}>
            <Grid container styles={{ marginTop: "20px" }} justify="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>
          </div>
        ) : (
          <Paper className={classes.root}>
            {/* <Grid container>
              <Grid item xs={12}> */}
            <Table className={classes.table} padding="dense">
              <TableHead className="THeader">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Venue</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="TableBody">
                {events &&
                  events.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th">
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="WebsiteLink"
                          >
                            {row.name}
                          </a>
                        </TableCell>
                        <TableCell>
                          {this.getDate(row.dateFrom, row.dateTo)}
                        </TableCell>
                        <TableCell>{row.venue}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {/* </Grid>
            </Grid> */}
          </Paper>
        )}
      </div>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array,
  requesting: PropTypes.bool.isRequired
};

export default compose(
  firestoreConnect([{ collection: "events" }]),
  connect((state, props) => ({
    events: state.firestore.ordered.events,
    requesting: state.firestore.status.requesting.events
  }))
)(withStyles(styles)(Board));
