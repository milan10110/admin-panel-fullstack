import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserRoleMutation } from "state/api";
import Header from "./Header";

function ManageUserRoles({ roleList: allRoles }) {
  const theme = useTheme();
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState(false);
  const [canFetch, setCanFetch] = useState(false);
  const { data } = useGetUserQuery(userId, { skip: !canFetch });
  const [roleList, setRoleList] = useState([]);
  const [availableRoleList, setAvailableRoleList] = useState();

  const [updateUserRole] = useUpdateUserRoleMutation();

  function handleUserIdChange(e) {
    setUserId(e.target.value);
    if (canFetch) {
      setCanFetch(false);
    }
    if (userIdError) {
      setUserIdError(false);
    }
  }

  function handleSearch() {
    if (!userId) {
      setUserIdError(true);
      return;
    } else {
      setCanFetch(true);
    }
  }

  function handleDelete(label) {
    const newRoleList = roleList.filter((role) => role !== label);
    setRoleList(newRoleList);
    const newAvailableRoleList = [label, ...availableRoleList];
    setAvailableRoleList(newAvailableRoleList);
  }

  function handleSelectRole(label) {
    const newRoleList = [...roleList, label];
    setRoleList(newRoleList);
    const newAvailableRoleList = availableRoleList.filter(
      (role) => role !== label
    );
    setAvailableRoleList(newAvailableRoleList);
  }

  function filterAllRoles(selectedRoles, allRoles) {
    let filteredRoles = allRoles;

    selectedRoles?.map((selectedRole) => {
      filteredRoles = filteredRoles.filter((role) => role !== selectedRole);
      return null;
    });

    return filteredRoles;
  }

  function handleSaveData() {
    updateUserRole({
      email: userDetails?.email,
      roleList,
    });
  }

  useEffect(() => {
    if (data) {
      const filteredRoles = filterAllRoles(data.role, allRoles);
      setUserDetails(data);
      setRoleList(data.role);
      setAvailableRoleList(filteredRoles);
    }
  }, [data, allRoles]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ p: "0 2rem" }}>
      <Header title="Manage User Roles" subtitle="" />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          required
          id="outlined-required"
          label="User Id"
          sx={{ margin: "2rem 1rem", width: "16rem" }}
          value={userId}
          onChange={handleUserIdChange}
          error={userIdError}
          helperText={userIdError ? "Please enter a valid User Id" : ""}
        />
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.light,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ p: "1rem 3rem" }}>
        <Typography
          variant="h5"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          Name: {userDetails && userDetails.name}
        </Typography>
        <Typography
          variant="h5"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          Email: {userDetails && userDetails.email}
        </Typography>
        <Typography
          variant="h5"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          Phone: {userDetails && userDetails.phoneNumber}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
          <Typography
            variant="h5"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Roles:
          </Typography>
          <Paper
            sx={{
              all: "unset",
              border: `1px solid ${theme.palette.secondary[100]}`,
              borderRadius: "0.5rem",
              width: "24rem",
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              backgroundColor: "transparent",
              p: "1rem",
              m: 0,
              ml: "2rem",
            }}
            component="ul"
          >
            {roleList.length !== 0 ? (
              roleList.map((roleLabel, idx) => {
                return (
                  <Chip
                    key={idx}
                    label={roleLabel}
                    variant="outlined"
                    onDelete={() => handleDelete(roleLabel)}
                  />
                );
              })
            ) : (
              <Typography
                variant="h5"
                color={theme.palette.secondary[100]}
                sx={{ mb: "5px" }}
              >
                No Roles
              </Typography>
            )}
          </Paper>
          <FormControl sx={{ ml: "1rem", minWidth: "16rem" }}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={""}
              onChange={(e) => handleSelectRole(e.target.value)}
              renderValue={() => {
                return <em>Available Roles</em>;
              }}
            >
              {availableRoleList?.map((role) => (
                <MenuItem value={role} key={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ p: "2rem 3rem", display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.light,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          //   disabled={isSaveDisabled}
          onClick={handleSaveData}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default ManageUserRoles;
