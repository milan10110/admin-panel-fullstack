import { useTheme } from "@emotion/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCreateNewRoleMutation,
  useGetAvailablePermisssionsQuery,
} from "state/api";

const rows = [
  {
    id: 1,
    name: "Admin",
    read: false,
    write: false,
    create: false,
    delete: false,
  },
  {
    id: 2,
    name: "Transaction",
    read: false,
    write: false,
    create: false,
    delete: false,
  },
];

function CreateNewRoleModal({ open, setOpen }) {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [nameError, setNameError] = useState(false);
  const { data: availablePermissions } = useGetAvailablePermisssionsQuery();
  const [createRole] = useCreateNewRoleMutation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor:
      theme.palette.mode === "dark"
        ? theme.palette.background.alt
        : theme.palette.background.default,
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.neutral[800]}`
        : `1px solid ${theme.palette.neutral[200]}`,
    boxShadow:
      theme.palette.mode === "dark"
        ? `0px 4px 8px ${theme.palette.neutral[900]}`
        : `0px 4px 8px ${theme.palette.neutral[100]}`,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // style for the grid container
  const gridStyle = {
    width: "100%",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: "8px",
  };

  // event handler for closing the modal
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { id, name } = event.target;

    const index = data.findIndex((row) => row.id === Number(id));

    // const newData = [...data];
    const newData = JSON.parse(JSON.stringify(data));

    newData[index][name] = !newData[index][name];

    setData(newData);
  };

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
    setNameError(false);
  };

  const handleCreateRole = () => {
    if (roleName.length === 0) {
      setNameError(true);
      return;
    }

    createRole({
      name: roleName,
      permissions: data,
    });
    setOpen(false);
    setRoleName("");
    setData(rows);
  };

  useEffect(() => {
    if (availablePermissions) {
      setData(availablePermissions);
    }
  }, [availablePermissions]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <Box sx={style}>
          <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
          <TextField
            required
            id="outlined-required"
            label="Name"
            sx={{ margin: "0rem 1rem 2rem 1rem" }}
            value={roleName}
            onChange={handleRoleNameChange}
            error={nameError}
            helperText={nameError ? "Please enter a Role name" : ""}
          />
          <Grid container sx={gridStyle}>
            {/* Header */}
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography variant="h6" align="center">
                    Entity
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" align="center">
                    Read
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" align="center">
                    Write
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" align="center">
                    Create
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" align="center">
                    Delete
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {data?.map((row) => (
              <Grid key={row.id} item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body1" align="center">
                      {row.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        id={row.id.toString()}
                        name="read"
                        checked={row.read}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        id={row.id.toString()}
                        name="write"
                        checked={row.write}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        id={row.id.toString()}
                        name="create"
                        checked={row.create}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        id={row.id.toString()}
                        name="delete"
                        checked={row.delete}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              p: "2rem 3rem",
              display: "flex",
              justifyContent: "end",
              alignSelf: "end",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.secondary.light,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleCreateRole}
            >
              Create Role
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}

export default CreateNewRoleModal;
