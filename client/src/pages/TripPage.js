import * as React from 'react';
import {  Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect} from 'react'
import Axios from 'axios'


// @mui
import {Card,Table,Stack,Paper, Button, Popover, Checkbox,TableRow, TableBody,TableCell,Container,Typography,IconButton,
TableContainer,TablePagination} from '@mui/material';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { TripListHead, TripListToolbar } from '../sections/@dashboard/trip';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'matricule', label: 'Matricule', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'distance', label: 'Distance', alignRight: false },
  { id: 'quantite', label: 'Quantite', alignRight: false },
  { id: 'consommation', label: 'Consommation', alignRight: false },
  { id: 'cout', label: 'Cout', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_trip) => _trip.matricule.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//-----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CarPage() {
  const [trips, setTrips] = useState([]);
  const [matricule,setMatricule ] = useState("");
  const [date,setDate ] = useState("");
  const [distance,setDistance ] = useState("");
  const [quantite,setQuantite ] = useState("");
  const [esence, setEsence] = useState("");
  const [gazoil, setGazoil] = useState("");
  const [open, setOpen] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('matricule');
  const [filterMatricule, setFilterMatricule] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [upNewMat,setUpNewMat] = useState()
  const [upOldMat,setUpOldMat] = useState()
  const [upDate, setUpDate] = useState();
  const [upDis, setUpDis] = useState();
  const [upQuan, setUpQuan] = useState();
  const [del_mat, setDel_mat] = useState();

  const deleteParametre = (Mat) => {
    setDel_mat(Mat)
  }

  // read trips
  useEffect(() => {
    Axios.get("http://localhost:7777/trips")
      .then(res => {
        setTrips(res.data)
      })
    },[trips])

  //read esence
  useEffect(() => {
    Axios.get("http://localhost:7777/esence")
    .then(res => {
        setEsence(res.data)
  })
  },[])

  //read gazoil
  useEffect(() => {
    Axios.get("http://localhost:7777/gazoil")
    .then(res => {
        setGazoil(res.data)
  })
  },[])

  // create trip
  const createTrip = () => { 
  //get car by matricule
  var cout
   Axios.post("http://localhost:7777/getCarByMatricule",{
      matricule: matricule
    })
      .then(res => {
        if(res.data.status==="ok"){
          if(res.data.type_de_carburent === esence.type){
            cout = esence.prix*quantite
            Axios.post("http://localhost:7777/createTrip",{
              matricule: matricule,
              date: date,
              distance: distance,
              quantite: quantite,
              consommation: distance/quantite,
              cout: cout,
            }).then(res => {
              console.log("Trip created")
            })
          }else{
            cout = gazoil.prix*quantite
            Axios.post("http://localhost:7777/createTrip",{
              matricule: matricule,
              date: date,
              distance: distance,
              quantite: quantite,
              consommation: distance/quantite,
              cout: cout,
            }).then(res => {
              console.log("Trip created")
            })
          }
          }
    }).catch(error => {
        console.error(error);
    });
  }
  
// update trip
const updateTrip = () => { 
  //get car by matricule
  var upCout
   Axios.post("http://localhost:7777/getCarByMatricule",{
      matricule: upNewMat
    }).then(res => {
        if(res.data.status==="ok"){
          if(res.data.type_de_carburent === esence.type){
            upCout = esence.prix*upQuan
            Axios.post("http://localhost:7777/updateTrip",{
              matricule1: upOldMat,
              matricule: upNewMat,
              Date: upDate,
              Distance: upDis,
              Quantite: upQuan,
              Consommation: upDis/upQuan,
              Cout: upCout,
            }).then(res => { console.log("Trip updated")})
          }else{
            upCout = gazoil.prix*upQuan
            Axios.post("http://localhost:7777/updateTrip",{
              matricule1: upOldMat,
              matricule: upNewMat,
              Date: upDate,
              Distance: upDis,
              Quantite: upQuan,
              Consommation: upDis/upQuan,
              Cout: upCout,
            }).then(res => { console.log("Trip updated")})
          }
        }
  }).catch(error => { console.error(error) });
}

  //delete trip
  const DeleteTrip = () => {
    Axios.delete(`http://localhost:7777/deleteTrip/${del_mat}`)
      .then(response => { 
        //window.location.reload()
      })  
      .catch(error => {
        if (error.response && error.response.status === 404) {
          alert('trip not found');
        } else {
          console.log(error);
          alert('Error deleting Trip');
        }
      });
  }

  const updateParametre = (mat,date,dis,quant) => {
    setUpOldMat(mat)
    setUpNewMat(mat)
    setUpDate(date)
    setUpDis(dis)
    setUpQuan(quant)
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleShow   = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow1   = () => {
    setShow1(true);
  };
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleShow2   = () => {
    setShow2(true);
  };
  const handleClose2 = () => {
    setShow2(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = trips.map((n) => n.matricule);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, matricule) => {
    const selectedIndex = selected.indexOf(matricule);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, matricule);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByMatricule = (event) => {
    setPage(0);
    setFilterMatricule(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trips.length) : 0;

  const filteredTrips = applySortFilter(trips, getComparator(order, orderBy), filterMatricule);

  const isNotFound = !filteredTrips.length && !!filterMatricule;

  return (
    <>
      <Helmet>
        <title> Trip | Hicham Diouane  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>  Trip </Typography>
          <Button variant="contained"  onClick={handleShow}> New Trip  </Button>
        </Stack>
        {/* Create */}
          <Modal show={show} onHide={handleClose} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a new trip</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '380px'}}>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Matricule</label>
                        <input type="text" class="form-control" onChange={e=>setMatricule(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Date</label>
                        <input type="date" class="form-control" onChange={e=>setDate(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Distance (Km)</label>
                        <input type="number" class="form-control" onChange={e=>setDistance(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Quantite (L)</label>
                        <input type="number" class="form-control" onChange={e=>setQuantite(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose() ; createTrip(); }}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleClose}> Close </Button>
           </Modal.Footer>
          </Modal>
          {/* update */}
          <Modal show={show2} onHide={handleClose2} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Update car</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '400px'}}>
                <form>
                    <div class="mb-3">
                        <label  class="form-label">matricule</label>
                        <input type="text" class="form-control" value={upNewMat}   onChange={e=>setUpNewMat(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Date</label>
                        <input type="date" class="form-control" value={upDate} onChange={e=>setUpDate(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Distance (Km)</label>
                        <input type="number" class="form-control" value={upDis} onChange={e=>setUpDis(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Quantite (L)</label>
                        <input type="number" class="form-control" value={upQuan} onChange={e=>setUpQuan(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose2() ; updateTrip();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={()=> {handleClose2(); window.location.reload()}}> Close </Button>
           </Modal.Footer>
          </Modal>
          {/* Delete */}
          <Modal show={show1} onHide={handleClose1} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '70px'}}>
              <Typography>Are you sure you want to delete this Trip having matricule:  {del_mat}</Typography>
            </Modal.Body>  
            <Modal.Footer>
              <Button variant="contained" color="primary" onClick={() => {handleClose1();DeleteTrip();}}> Yes  </Button>
              <Button variant="contained" color="error" onClick={()=> {handleClose1(); window.location.reload()}}> Close </Button>
            </Modal.Footer>
          </Modal>

        <Card>
          <TripListToolbar numSelected={selected.length} filterMatricule={filterMatricule} onFilterMatricule={handleFilterByMatricule} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TripListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={trips.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredTrips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { matricule, date, distance, quantite, consommation, cout } = row;
                    const selectedCar = selected.indexOf(matricule) !== -1;

                    return (
                      <TableRow hover key={matricule} tabIndex={-1} role="checkbox" selected={selectedCar}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedCar} onChange={(event) => handleClick(event, matricule)} />
                        </TableCell>

                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {matricule}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>{date}</TableCell>

                        <TableCell>{distance}</TableCell>

                        <TableCell>{quantite}</TableCell>

                        <TableCell>{consommation}   Km/l</TableCell>

                        <TableCell>{cout}   dh</TableCell>

                        <TableCell align="right" onClick = {() => {deleteParametre(matricule); updateParametre(matricule,date,distance,quantite)}}>
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}> 
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton> 
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterMatricule}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={trips.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Button onClick={ () => {handleShow2(); handleCloseMenu();}}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}/>
          Edit
        </Button>

        <Button sx={{ color: 'error.main' }} onClick={ () => {handleShow1(); handleCloseMenu();}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }}/>
          Delete
        </Button>
      </Popover>
    </>
  );
}

