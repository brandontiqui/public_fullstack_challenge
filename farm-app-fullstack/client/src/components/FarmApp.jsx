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
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import farmsAPI from '../api/farms';

const drawerWidth = 240;

class FarmApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      farmList: [],
      farmData: {},
      selectedFarmId: null
    };

    this.handleSelectFarm = this.handleSelectFarm.bind(this);
    this.handleFarmNameFilter = this.handleFarmNameFilter.bind(this);
  }

  componentDidMount() {
    this.getFarmData();
  }

  getFarmData() {
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
        console.log('farmList', farmList);
        this.setState({ farmData, farmList });
      });
  }

  handleSelectFarm(selectedFarmId) {
    return () => {
      this.setState({ selectedFarmId });
    };
  }

  handleFarmNameFilter(e) {
    console.log('e.target.value', e.target.value);
    const searchText = e.target.value.toLowerCase();
    console.log('searchText', searchText);
    const { farmList } = this.state;
    farmList.forEach(farm => {
      if (farm.name.toLowerCase().indexOf(searchText) === -1) {
        farm.display = false;
      } else {
        farm.display = true;
      }
      // no filtered search text
      if (searchText === '') {
        farm.display = true;
      }
    });
    console.log('farmList', farmList);
    this.setState({ farmList });
  }

  render() {
    const { classes } = this.props;
    const { farmList, selectedFarmId, farmData } = this.state;
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
            <TextField onChange={this.handleFarmNameFilter} />
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
            <div>
              <h1>{selectedFarm.name}</h1>
              <p>state: {selectedFarm.state}</p>
              <p>soil type: {selectedFarm.soil_type}</p>
              <p>revenue: {selectedFarm.revenue}</p>
            </div>
          )}
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export default withStyles(useStyles)(FarmApp);
