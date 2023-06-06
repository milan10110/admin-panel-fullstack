import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetRoleListQuery,
  useGetRolePermissionsQuery,
  useUpdateRolePermissionsMutation,
} from "state/api";

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
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [role, setRole] = useState("");
  const [roleList, setRoleList] = useState(null);
  const [skip, setSkip] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const navigate = useNavigate();

  const { data: roleListRes, isLoading, error } = useGetRoleListQuery();
  const { data: rolePermissions } = useGetRolePermissionsQuery(role, {
    skip: skip,
  });
  const [updatePermissions, response] = useUpdateRolePermissionsMutation();

  const handleSelectChange = (event) => {
    setRole(event.target.value);
    setIsSaveDisabled(true);
  };

  const handleChange = (event) => {
    const { id, name } = event.target;

    const index = data.findIndex((row) => row.id === Number(id));

    // const newData = [...data];
    const newData = JSON.parse(JSON.stringify(data));

    newData[index][name] = !newData[index][name];

    setData(newData);
    setIsSaveDisabled(false);
  };

  const handleSaveData = () => {
    const payload = {
      role,
      permissions: data,
    };

    updatePermissions(payload);
  };

  useEffect(() => {
    if (!isLoading && error?.status === 403) {
      navigate("/notallowed");
    }
  }, [isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    if (JSON.stringify(rolePermissions) === JSON.stringify(data)) {
      setIsSaveDisabled(true);
    } else {
      if (isSaveDisabled) {
        setIsSaveDisabled(false);
      }
    }
  }, [data]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <FormControl sx={{ m: "2rem" }}>
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
      <Box sx={{ p: "2rem 3rem", display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.light,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          disabled={isSaveDisabled}
          onClick={handleSaveData}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default ManageRoles;
