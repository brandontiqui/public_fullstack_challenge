import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

// API to retrieve farm data
import farmsAPI from '../api/farms';

const drawerWidth = 240;

class FarmApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      farmList: [],
      farmData: {},
      selectedFarmId: null,
      searchText: '',
      minimumRevenue: 0,
      maximumRevenue: Number.POSITIVE_INFINITY,
      maximumRevenueError: '',
      minimumRevenueError: ''
    };

    this.handleSelectFarm = this.handleSelectFarm.bind(this);
    this.handleFarmNameFilter = this.handleFarmNameFilter.bind(this);
    this.handleMinimumRevenueFilter = this.handleMinimumRevenueFilter.bind(this);
    this.handleMaximumRevenueFilter = this.handleMaximumRevenueFilter.bind(this);
  }

  componentDidMount() {
    // initialize app with farm data
    this.getFarmData();
  }

  componentDidUpdate(prevProps, prevState) {
    // filtering happens under these conditions
    const newSearchText = prevState.searchText !== this.state.searchText;
    const newMinimumRevenue = prevState.minimumRevenue !== this.state.minimumRevenue;
    const newMaximumRevenue = prevState.maximumRevenue !== this.state.maximumRevenue;
    if (newSearchText || newMinimumRevenue || newMaximumRevenue) {
      this.filterFarms();
    }
  }

  getFarmData() {
    // formats data into a list
    // this list is used to filter data
    farmsAPI.getFarms()
      .then(farmData => {
        const farmList = [];
        for(let farmId in farmData) {
          const farm = farmData[farmId];
          farmList.push({
            farmId,
            name: farm.name,
            display: true,
            revenue: farm.revenue
          });
        }
        this.setState({ farmData, farmList });
      });
  }

  filterFarms() {
    // filters farm data on farm name and revenue constraints
    const { farmList, searchText, minimumRevenue, maximumRevenue } = this.state;
    farmList.forEach(farm => {
      const farmNameContainsSearchText = farm.name.toLowerCase().indexOf(searchText) > -1;
      const farmMakesAtLeastMinimumRevenue = farm.revenue >= minimumRevenue;
      const farmMakesLessThanOrEqualMaximumRevenue = farm.revenue <= maximumRevenue;
      if (farmNameContainsSearchText === false ||
        farmMakesAtLeastMinimumRevenue === false ||
        farmMakesLessThanOrEqualMaximumRevenue === false) {
        farm.display = false;
      } else {
        farm.display = true;
      }
    });
    this.setState({ farmList });
  }

  handleSelectFarm(selectedFarmId) {
    // save selected farm ID
    return () => {
      this.setState({ selectedFarmId });
    };
  }

  handleFarmNameFilter(e) {
    // save search text
    const searchText = e.target.value.toLowerCase();
    this.setState({ searchText });
  }

  handleMinimumRevenueFilter(e) {
    // save minimum revenue
    this.setState({ minimumRevenueError: ''});
    let value = e.target.value;
    if (isNaN(Number(value))) {
      // display error
      this.setState({ minimumRevenueError: 'Enter a number.'})
      return;
    }
    if (value === '') {
      // reset
      value = 0;
    }
    this.setState({ minimumRevenue: Number(value) });
  }

  handleMaximumRevenueFilter(e) {
    // save maximum revenue
    this.setState({ maximumRevenueError: ''});
    let value = e.target.value;
    if (isNaN(Number(value))) {
      // display error
      this.setState({ maximumRevenueError: 'Enter a number.'})
      return;
    }
    if (value === '') {
      // reset
      value = Number.POSITIVE_INFINITY;
    }
    this.setState({ maximumRevenue: Number(value) });
  }

  render() {
    const { classes } = this.props;
    const { farmList, selectedFarmId, farmData, maximumRevenueError, minimumRevenueError } = this.state;
    const selectedFarm = farmData[selectedFarmId];

  	return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Farm App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <div className={classes.filterContainer}>
              <TextField label="Search for farm name" onChange={this.handleFarmNameFilter} />
              <TextField error={!!minimumRevenueError} helperText={minimumRevenueError} label="Minimum revenue" onChange={this.handleMinimumRevenueFilter} />
              <TextField error={!!maximumRevenueError} helperText={maximumRevenueError} label="Maximum revenue" onChange={this.handleMaximumRevenueFilter} />
            </div>
            <Divider />
            <List>
              {farmList
                .filter(farm => farm.display)
                .map(farm => (
                <ListItem button key={farm.farmId} onClick={this.handleSelectFarm(farm.farmId)}>
                  <ListItemText primary={farm.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          {!!selectedFarm && (
            <Card className={classes.card}>
              <CardContent>
                <h1>{`Farm: ${selectedFarm.name}`}</h1>
                {Object.keys(selectedFarm)
                  .filter(property => typeof selectedFarm[property] !== 'object')
                  .map(property => (
                    <p key={property}>{`${property}: ${selectedFarm[property]}`}</p>
                  ))
                }
              </CardContent>
            </Card>
          )}
          {!!selectedFarm && Object.keys(selectedFarm.fields).map((fieldName, fieldIndex) => {
            const field = selectedFarm.fields[fieldName];
            return (
              <Card key={fieldName} className={classes.card}>
                <CardContent>
                  <h1>{`Field ${fieldIndex + 1}: ${fieldName}`}</h1>
                  {Object.keys(field).map(property => (
                    <p key={property}>{`${property}: ${field[property]}`}</p>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </main>
      </div>
  	)
  }
}

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  filterContainer: {
    paddingLeft: 16,
    marginBottom: 20
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    marginBottom: 10
  }
});

export default withStyles(useStyles)(FarmApp);
