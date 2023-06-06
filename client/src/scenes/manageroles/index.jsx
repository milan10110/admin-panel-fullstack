import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoleListQuery, useGetRolePermissionsQuery } from "state/api";

// const rows = [
//   {
//     id: 1,
//     name: "User",
//     read: true,
//     write: false,
//     create: false,
//     delete: false,
//   },
// ];

function ManageRoles() {
  const [data, setData] = useState(null);
  const [role, setRole] = useState("");
  const [roleList, setRoleList] = useState(null);
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();

  const { data: roleListRes, isLoading, error } = useGetRoleListQuery();
  const { data: rolePermissions } = useGetRolePermissionsQuery(role, {
    skip: skip,
  });

  
  useEffect(() => {
    if (!isLoading && error?.status === 403) {
      navigate("/notallowed");
    }
  }, [isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  const handleChange = (event) => {
    const { id, name } = event.target;

    const index = data.findIndex((row) => row.id === Number(id));

    const newData = [...data];

    newData[index][name] = !newData[index][name];

    setData(newData);
  };

  useEffect(() => {
    if (roleListRes) {
      setRoleList(roleListRes);
    }
  }, [roleListRes]);

  useEffect(() => {
    if (roleList) {
      setRole(roleList[0]);
    }
  }, [roleList]);

  useEffect(() => {
    if (role.length !== 0) {
      setSkip(false);
    }
  }, [role]);

  useEffect(() => {
    if (rolePermissions) {
      setData(rolePermissions);
    }
  }, [rolePermissions]);

  return (
    <Box>
      <FormControl sx={{ m: 1 }}>
        <Select
          value={role}
          onChange={handleSelectChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {roleList?.map((role) => (
            <MenuItem value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h6" align="center">
                Name
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

        {/* Rows */}
        {data?.map((row, id) => (
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
    </Box>
  );
}

export default ManageRoles;
