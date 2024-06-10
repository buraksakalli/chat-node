import { LoginForm } from "./LoginForm";

import { login } from "./actions";

export default async function Page() {
  return (
    <div>
      <LoginForm handleLogin={login} />
    </div>
  );
}
