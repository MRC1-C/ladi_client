import { useNavigate } from "react-router-dom"
import { LOGIN } from "./gql";
import { useMutation } from "@apollo/client";
import { Button, message } from "antd";

export default function Login() {
  const navigate = useNavigate()
  const [loginMutation, { loading }] = useMutation(LOGIN);

  const onLogin = async (e: any) => {
    e.preventDefault()
    const form = (e.target as HTMLButtonElement).form;
    if (form) {
      const username = form.username.value;
      const password = form.password.value;
      try {
        const res = await loginMutation({
          variables: { loginInput: { username, password } },
        });
        if (res.data.login.error) {
          message.warning(res.data.login.error)
        }
        else {
          localStorage.setItem('accessToken', res.data.login.accessToken);
          message.success("Đăng nhập thành công")
          navigate("/dashboard")
        }
      } catch (error) {
        console.error(JSON.stringify(error));
      }

    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng nhập
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Tài khoản
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mật khẩu
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Quên mật khẩu
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div onClick={onLogin}
            >
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                className="w-full"
              >
                Đăng nhập
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
