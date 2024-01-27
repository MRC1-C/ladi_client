import { useMutation } from "@apollo/client";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom"
import { SIGN_UP } from "./gql";

export default function SignUp() {
    const navigate = useNavigate()
    const [signupMutation, { loading }] = useMutation(SIGN_UP);


    const onSignUp = async (e: any) => {
        e.preventDefault()
        const form = (e.target as HTMLButtonElement).form;

        if (form) {
            // Lấy giá trị của trường nhập liệu username và password từ form
            const username = form.username.value;
            const password = form.password.value;
            const confirmPassword = form.confirmPassword.value;
            if (password !== confirmPassword) {
                message.warning("Mật khẩu và xác nhận mật khẩu không giống nhau")
            }
            try {
                const res = await signupMutation({
                    variables: { signupInput: { username, password } },
                });
                if (res.data.signup.error) {
                    message.warning(res.data.signup.error)
                }
                localStorage.setItem('accessToken', res.data.signup.accessToken);
                message.success("Đăng ký thành công")
                navigate("/dashboard")
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
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Xác nhận mật khẩu
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                        </div>

                        <div>
                            <Button
                                onClick={onSignUp}
                                loading={loading}
                                htmlType="submit"
                                type="primary"
                                className="w-full"
                            >
                                Đăng ký
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
