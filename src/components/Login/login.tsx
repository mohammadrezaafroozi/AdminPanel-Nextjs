import React, { useState } from "react";
import { Button, Box, Paper, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoFill, setAutoFill] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const theme = useTheme();
  const { login } = useAuth(); // از context

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAutoFill = (checked: boolean) => {
    setAutoFill(checked);
    if (checked) {
      setEmail("test@test.com");
      setPassword("1234");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      alert("ایمیل معتبر وارد کنید!");
      return;
    }
    if (password.length < 4) {
      alert("رمز عبور حداقل باید ۴ کاراکتر باشد");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email === "test@test.com" && password === "1234") {
        alert("ورود موفقیت‌آمیز بود ✅");
        login(); // وضعیت لاگین رو در Context ذخیره می‌کنه
        router.push("/dashboard");
      } else {
        alert("ایمیل یا رمز اشتباه است ❌");
      }
    } catch {
      alert("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        overflowX: "hidden",
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 400,
          minHeight: 600,
          p: 3,
          borderRadius: 4,
          textAlign: "center",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <h2 className="font-mono">Please Login</h2>

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 20, padding: 8 }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 60, padding: 8 }}
        />

        <div style={{ marginBottom: 65 }}>
          <input
            type="checkbox"
            checked={autoFill}
            onChange={(e) => handleAutoFill(e.target.checked)}
          />
          <label style={{ marginLeft: 5 }}>Login by default</label>
        </div>

        <Button
          variant="contained"
          color="success"
          onClick={handleLogin}
          disabled={loading}
          sx={{ width: "80%" }}
        >
          {loading ? "loading..." : "ENTER"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
