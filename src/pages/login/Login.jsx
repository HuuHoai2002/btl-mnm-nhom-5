import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleIcon from "../../components/icon/GoogleIcon";
import { auth } from "../../firebase/firebase-config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Login = () => {
  const history = useHistory();
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      // Dòng này dùng firebase để đăng nhập
      await signInWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );
      toast.success("Đăng nhập thành công", { pauseOnHover: false });
      history.push("/");
    } catch (error) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác", {
        pauseOnHover: false,
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    await signInWithGoogle();
    history.push("/");
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
              Đăng Nhập Tài Khoản
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth={true}
                    id="email"
                    label="Địa chỉ email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth={true}
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 4 }}
                startIcon={<GoogleIcon />}
                onClick={handleLoginWithGoogle}
              >
                Đăng nhập bằng google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/register">Bạn chưa có tài khoản? Đăng ký</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;
