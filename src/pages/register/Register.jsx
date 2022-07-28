import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase-config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Register = () => {
  const [check, setCheck] = React.useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("fullname");
    const email = data.get("email");
    const password = data.get("password");

    const regexEmail =
      /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      toast.error("Không được để trống", {
        pauseOnHover: false,
      });
      return;
    } else if (!regexEmail.test(email)) {
      toast.error("Email không hợp lệ", {
        pauseOnHover: false,
      });
      return;
    } else if (name.toString().length > 20) {
      toast.error("Tên không được vượt quá 20 ký tự", {
        pauseOnHover: false,
      });
      return;
    } else {
      if (check) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          toast.success("Đăng ký thành công", { pauseOnHover: false });
          history.push("/");
        } catch (error) {
          toast.error("Email đã được sử dụng", { pauseOnHover: false });
        }
      } else {
        toast.error("Vui lòng đồng ý với điều khoản", { pauseOnHover: false });
      }
    }
  };

  const handleClick = () => {
    setCheck(!check);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container" style={{ minHeight: "100vh" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Ký Tài Khoản
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    label="Tên đầy đủ"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Địa chỉ email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        onClick={handleClick}
                      />
                    }
                    label="Tôi đồng ý các điều khoản và dịch vụ"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Bạn đã có tài khoản? Đăng nhập</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Register;
