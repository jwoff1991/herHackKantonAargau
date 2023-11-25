import * as React from 'react';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Box} from '@mui/material';
import { mainListItems, secondaryListItems } from './listItems';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const theme = createTheme({
  palette: {
    primary: {
      main: "#ABF1BC",
    },
    secondary: {
      main: "#CFFFF6",
    },
  },
});

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge color="secondary" badgeContent={4}>
                <Avatar alt="Company Logo" src="" />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Company Info */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <h1>GreenTech Polymers AG</h1>
                  <h3>17 Mountain View Drive, Zurich, Switzerland, 8001</h3>
                </Paper>
              </Grid>
              {/* CO2 saved */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    // p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    alignItems: "center",
                  }}
                >
                  <h2>Possible CO2 Saved</h2>
                  <div className='tons-per-kg-saved'>
                  <span className='tons-saved'><img src='./src/assets/co2.png' className='pic-co2'/></span>

                  </div>

                </Paper>
              </Grid>
              {/* Recent Requests */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <p>Recent Accepted Requets</p>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Company Name</TableCell>
                          <TableCell>Plastic Type</TableCell>
                          <TableCell>Amount (kgs)</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* Replace the data below with your actual request data */}
                        <TableRow>
                          <TableCell>ABC Plastics</TableCell>
                          <TableCell>
                            Polyethylene terephthalate (PET(E))
                          </TableCell>
                          <TableCell>100</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Company B</TableCell>
                          <TableCell>
                            High-density polyethylene (PEHD/HDPE)
                          </TableCell>
                          <TableCell>150</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>General Plastic Co</TableCell>
                          <TableCell>
                          Polypropylene (PP)
                          </TableCell>
                          <TableCell>1000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Your Plastic Source</TableCell>
                          <TableCell>
                          Low-density polyethylene (PELD)
                          </TableCell>
                          <TableCell>500</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Germal Household Plastics</TableCell>
                          <TableCell>
                            Polyethylene terephthalate (PET(E))
                          </TableCell>
                          <TableCell>100</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ABC Plastics</TableCell>
                          <TableCell>
                            Polyethylene terephthalate (PET(E))
                          </TableCell>
                          <TableCell>1500</TableCell>
                        </TableRow>
                        {/* Add more rows as needed */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
