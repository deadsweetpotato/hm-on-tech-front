import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ToastContainer, toast } from 'react-toastify';

import TextRichWithNoSSR from './textRichWithNoSSR';
import AppLayout from './AppLayout';
import ArticleList from './ArticleList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box div={3}>
          {/* <Typography variant="div"> */}
            {children}
            {/* </Typography> */}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    marginRight:15,
    height:'100%',
  }
}));

const AdminLayout = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    {/* <Admin> */}
    <AppLayout>

      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          >
          <Tab label="List Article" {...a11yProps(0)} />
          <Tab label="Create Article" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ArticleList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextRichWithNoSSR />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
        <Paper className={classes.paper}>
        <AdminCrudArticle></AdminCrudArticle>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={9} >
        <Paper className={classes.paper}>{children}</Paper>
        </Grid>
      </Grid> */}
    {/* </Admin> */}
    <ToastContainer />
    </AppLayout>
    </>
  )
}

export default AdminLayout;
