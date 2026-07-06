import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/app/components/Button/Button";
import { Card, CardContent, CardHeader } from "@/app/components/Card/Card";
import { Link } from "@/app/components/Link/Link";
import { TextField } from "@/app/components/TextField/TextField";
import { Body, Caption } from "@/app/components/Text/Text";
import { useAuth } from "@/app/auth/auth-context";
import "@/app/components/admin/AdminLayout.css";

export function Login() {
  const { isAdmin, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedPassword =
      new FormData(event.currentTarget).get("admin-password")?.toString() ??
      password;

    if (login(submittedPassword)) {
      navigate(redirectTo);
      return;
    }
    setError("Incorrect password.");
  };

  return (
    <div className="admin-page admin-page--centered">
      <Card size="small" UNSAFE_className="admin-login-card">
        <CardHeader title="Sign in" headingLevel="h1" />
        <CardContent UNSAFE_className="admin-card-stack">
          <Caption as="p" color="subtlest">
            Portfolio admin
          </Caption>
          <Body as="p" size="small" color="subtle">
            Access settings, the theme editor, and the component library.
          </Body>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <TextField
              label="Admin password"
              type="password"
              size="small"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              error={error || undefined}
              textFieldProps={{
                id: "admin-password",
                name: "admin-password",
                autoComplete: "current-password",
              }}
            />

            <Button variant="primary" size="medium" type="submit" isFullWidth>
              Sign in
            </Button>
          </form>

          <div className="admin-login-footer">
            <Link
              href="/"
              color="subtle"
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
              }}
            >
              Back to site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
