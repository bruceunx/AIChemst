"use client";
import { signIn } from "next-auth/react";
import { Flex, Text, Heading, Button, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormInput = {
  username: string;
  password: string;
};

export default function Profile() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    //eslint-disable-next-line
  } = useForm<FormInput>();

  //eslint-disable-next-line
  const onSubmit = async (values: any) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/profile",
    });
    if (!res?.error) {
      router.push("/profile");
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
            <label htmlFor="username" className="w-14">用户名:</label>
            <TextField.Input
              type="text"
              id="username"
              {...register("username", {
                required: "必须要有",
              })}
              placeholder="输入用户名"
            />
          </Flex>
          {errors.username && (
            <Text size="1" color="red">
              {errors.username.message}
            </Text>
          )}
          <Flex direction="row" gap="3">
            <label htmlFor="password" className="w-14">密码:</label>
            <TextField.Input
              id="password"
              {...register("password", {
                required: "必须要有的字段",
                minLength: {
                  value: 6,
                  message: "长度最少为6",
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
          <Button className="bg-teal-700 w-64" type="submit">
            登陆
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
