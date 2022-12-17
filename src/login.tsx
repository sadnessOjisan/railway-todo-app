import { FormEvent } from "react";

interface LoginResponse {
  token: string;
}

export const Login = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const email = e.target["email"].value;
    // @ts-ignore
    const password = e.target["password"].value;
    fetch(
      "https://qvg1o8w2ef.execute-api.ap-northeast-1.amazonaws.com/signin",
      { method: "POST", body: JSON.stringify({ email, password }) }
    )
      .then((res) => {
        return res.json();
      })
      .then((data: LoginResponse) => {
        window.localStorage.setItem("token", data.token);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>email</label>
        <input name="email" type="mail" />
        <label>password</label>
        <input name="password" type="password" />
        <button>submit</button>
      </form>
    </div>
  );
};
