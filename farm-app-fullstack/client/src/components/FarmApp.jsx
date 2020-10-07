import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

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
  }

  componentDidMount() {
    console.log('FarmApp mounted');
    const farmData = this.getFarmData();
    const farmList = [];
    for(let farmId in farmData) {
      const farm = farmData[farmId];
      farmList.push({
        farmId,
        name: farm.name,
        display: true
      });
    }
    console.log('farmList', farmList);
    this.setState({ farmData, farmList });
  }

  getFarmData() {
    return {
      "1": {
          "name": "McDonald",
          "state": "WI",
          "soil_type": "Antigo Silt Loam",
          "revenue": 120000,
          "fields": {
              "NorthWest" : {
                  "crop": "corn",
                  "size (acres)": 40
              },
              "NorthEast" : {
                  "crop": "soy",
                  "size (acres)": 32
              }
          }
      },
      "2": {
          "name": "Stardew Valley",
          "state": "CA",
          "soil_type": "San Joaquin Series",
          "revenue": 140800,
          "fields": {
              "Mine" : {
                  "crop": "lettuce",
                  "size (acres)": 4
              },
              "Secret Woods" : {
                  "crop": "strawberry",
                  "size (acres)": 12
              },
              "Beach" : {
                  "crop": "ancient berry",
                  "size (acres)": 1
              }
          }
        }
    }
  }

  handleSelectFarm(selectedFarmId) {
    return () => {
      this.setState({ selectedFarmId });
    };
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
            {farmList.map(farm => (
              <div key={farm.farmId} onClick={this.handleSelectFarm(farm.farmId)}>{farm.name}</div>
            ))}
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
