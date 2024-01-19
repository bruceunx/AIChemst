"use client";
import { signIn } from "next-auth/react";
import { Flex, Text, Heading, Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../../../i18nConfig";

type FormInput = {
  username: string;
  password: string;
};

export default function Profile() {
  const locale = useCurrentLocale(i18nConfig);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    //eslint-disable-next-line
  } = useForm<FormInput>();

  //eslint-disable-next-line
  const onSubmit = async (values: any) => {
    let url = "/profile";
    if (locale == "en") url = "/en/profile";

    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: url,
    });
    console.log(res)
    if (!res?.error) {
      router.push(url);
    } else {
      console.log("error");
    }
  };

  return (
    <Flex
      className="w-1/2 mx-auto m-7 p-2 rounded-xl border-solid border-2 border-gray-700"
      direction="column"
      gap="4"
    >
      <Heading align="center">登陆</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction="column"
          width="100%"
          justify="center"
          align="center"
          gap="4"
          pb="3"
        >
          <Flex direction="row" gap="3">
            <label htmlFor="username" className="w-20">
              {locale === "en" ? "Username:" : "用户名:"}
            </label>
            <TextField.Input
              type="text"
              id="username"
              {...register("username", {
                required: `${locale === "en" ? "Required" : "必须要有"}`,
              })}
              placeholder={`${
                locale === "en" ? "please enter your username" : "请输入用户名"
              }`}
            />
          </Flex>
          {errors.username && (
            <Text size="1" color="red">
              {errors.username.message}
            </Text>
          )}
          <Flex direction="row" gap="3">
            <label htmlFor="password" className="w-20">
              {locale === "en" ? "Password:" : "密码:"}
            </label>
            <TextField.Input
              id="password"
              {...register("password", {
                required: `${locale === "en" ? "Required" : "必须要有"}`,
                minLength: {
                  value: 6,
                  message: `${locale === "en" ? "Too short" : "长度不能小于6"}`,
                },
              })}
              type="password"
            />
          </Flex>
          {errors.password && (
            <Text size="1" color="red">
              {errors.password.message}
            </Text>
          )}
          <Text size="2" color="gray">
            {locale === "en" ? "TestUser ->" : "测试用户->"} test：test123
          </Text>
          <Button className="bg-teal-700 w-64" type="submit">
            {locale === "en" ? "Login" : "登陆"}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
