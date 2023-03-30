import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { filter } from 'lodash'
import { useState, useEffect} from 'react'
import Axios from 'axios'

// @mui
import {Card,Table,Stack,Paper,Button, Popover, Checkbox,TableRow, TableBody,TableCell,Container,Typography,IconButton,
TableContainer,TablePagination} from '@mui/material'

import {  Modal } from 'react-bootstrap'
// components
import Iconify from '../components/iconify'
import Scrollbar from '../components/scrollbar'
// sections
import { CarListHead, CarListToolbar } from '../sections/@dashboard/car'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'matricule', label: 'Matricule', alignRight: false },
  { id: 'marque', label: 'Marque', alignRight: false },
  { id: 'modele', label: 'Modele', alignRight: false },
  //{ id: "la_date_de_lassurance", label: "La date de l'assurance", alignRight: false },
  //{ id: "la_duree_de_lassurance", label: "La duree de l'assurance", alignRight: false },
  { id: 'type_de_carburent', label: 'Type de carburent', alignRight: false },
  //{ id: 'la_capacite_du_reservoir', label: 'La capacite du reservoir', alignRight: false },
  //{ id: "la_date_de_visite", label: "La date de la visite", alignRight: false },
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
    return filter(array, (_car) => _car.marque.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//-----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CarPage() {
  const [cars, setCars] = useState([]);
  const [matricule,setMatricule ] = useState("");
  const [marque,setMarque ] = useState("");
  const [modele,setModele ] = useState("");
  const [la_date_de_lassurance,setLa_date_de_lassurance ] = useState("");
  const [la_duree_de_lassurance,setLa_duree_de_lassurance ] = useState("");
  const [type_de_carburent,setType_de_carburent ] = useState("");
  const [la_capacite_du_reservoir,setLa_capacite_du_reservoir ] = useState("");
  const [la_date_de_visite,setLa_date_de_visite ] = useState("");
  const [open, setOpen] = useState(null);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('marque');
  const [filterMarque, setFilterMarque] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //read car
  useEffect(() => {
    Axios.get("http://localhost:7777/cars")
      .then(res => {
        setCars(res.data)
      })
    },[cars])

  //create car
  const createCar = () => {
    Axios.post("http://localhost:7777/createCar",{
      matricule: matricule,
      marque: marque,
      modele: modele,
      la_date_de_lassurance: la_date_de_lassurance,
      la_duree_de_lassurance: la_duree_de_lassurance,
      type_de_carburent: type_de_carburent,
      la_capacite_du_reservoir: la_capacite_du_reservoir,
      la_date_de_visite: la_date_de_visite,
    }).then(res => {
      console.log("Car created")
    })
  }
  
  //delete car
  const DeleteCar = () => {
    Axios.post("http://localhost:7777/deleteCar",{
      matricule: matricule,
    }).then(res => {
      console.log("Car deleted")
  })
  }

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cars.map((n) => n.marque);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, marque) => {
    const selectedIndex = selected.indexOf(marque);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, marque);
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

  const handleFilterByMarque = (event) => {
    setPage(0);
    setFilterMarque(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

  const filteredCars = applySortFilter(cars, getComparator(order, orderBy), filterMarque);

  const isNotFound = !filteredCars.length && !!filterMarque;


  return (
    <>
      <Helmet>
        <title> Car | User Name  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom> 
            Car 
          </Typography>
          <Button variant="contained"  onClick={handleShow}> New Car </Button>
        </Stack>
        
          <Modal show={show} onHide={handleClose} style={{top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: '330px',height: '500px',bgcolor: 'background.paper'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a new car</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '300px',height: '700px'}}>
                <form>
                    <div class="mb-3">
                        <label  class="form-label">matricule</label>
                        <input type="text" class="form-control" onChange={e=>setMatricule(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">marque</label>
                        <input type="text" class="form-control" onChange={e=>setMarque(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">modele</label>
                        <input type="text" class="form-control" onChange={e=>setModele(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">la date de lassurance</label>
                        <input type="text" class="form-control" onChange={e=>setLa_date_de_lassurance(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">la duree de lassurance</label>
                        <input type="text" class="form-control" onChange={e=>setLa_duree_de_lassurance(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">type de carburent</label>
                        <input type="text" class="form-control"  onChange={e=>setType_de_carburent(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">la capacite du reservoir</label>
                        <input type="text" class="form-control" onChange={e=>setLa_capacite_du_reservoir(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">La date de dernier visite</label>
                        <input type="text" class="form-control" onChange={e=>setLa_date_de_visite(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => {handleClose() ; createCar();}}> Save  </Button>
                <Button variant="contained" color="error" onClick={handleClose}> Close </Button>
           </Modal.Footer>
          </Modal>

        <Card>
          <CarListToolbar numSelected={selected.length} filterMarque={filterMarque} onFilterMarque={handleFilterByMarque} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CarListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={cars.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, modele, marque, matricule, type_de_carburent } = row;
                    const selectedCar = selected.indexOf(marque) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedCar}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedCar} onChange={(event) => handleClick(event, marque)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="auto">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {matricule}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>{marque}</TableCell>

                        <TableCell>{modele}</TableCell>

                        {/* <TableCell>{la_date_de_lassurance}</TableCell>

                        <TableCell>{la_duree_de_lassurance}   month</TableCell> */}

                        <TableCell>{type_de_carburent}</TableCell>

                        {/* <TableCell>{la_capacite_du_reservoir}   L</TableCell> 

                      <TableCell>{la_date_de_visite}</TableCell> */}

                        <TableCell align="right">
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
                            <strong>&quot;{filterMarque}&quot;</strong>.
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
            count={cars.length}
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
        <Button>
          <Iconify sx={{ mr: 2 }} />
          View
        </Button>

        <Button>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </Button>

        <Button sx={{ color: 'error.main' }} onClick={DeleteCar}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }}/>
          Delete
        </Button>
      </Popover>
    </>
  );
}
