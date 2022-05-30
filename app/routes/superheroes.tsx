import React, { useEffect } from "react";
import type { FC } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useTransition, Link, useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import { writeToStore } from "~/utils/writeToStore";
import { readFromStore } from "~/utils/readFromStore";

export interface Superhero {
  id: string;
  title: string;
  name: string;
}

export const loader: LoaderFunction = async (): Promise<
  Array<Partial<Superhero>>
> => {
  const data = await readFromStore();
  return Promise.resolve(data.map(({ id, title }) => ({ id, title })));
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData) as Omit<Superhero, "id">;
  await writeToStore({
    id: values.title.toLocaleLowerCase().split(" ").join("_"),
    ...values,
  });
  return null;
};

const Superheroes: FC = () => {
  const superheroes = useLoaderData() as Array<Partial<Superhero>>;
  const { submission } = useTransition();
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    if (!submission) {
      formRef.current?.reset();
    }
  }, [submission]);

  return (
    <main className="container">
      <h1>Superheroes</h1>

      <ul>
        {superheroes.map((hero) => {
          return (
            <li key={hero.id}>
              <Link key={hero.id} to={`/${hero.id}`} prefetch="intent">
                {hero.title}
              </Link>
            </li>
          );
        })}
        {
          <li>
            <Form method="post" ref={formRef}>
              <input type="text" name="title" placeholder="title" />
              &nbsp;
              <input type="text" name="name" placeholder="name" />
              &nbsp;
              <button type="submit" disabled={!!submission}>
                {submission ? "Creating ..." : "Create"}
              </button>
            </Form>
          </li>
        }
      </ul>
    </main>
  );
};

export default Superheroes;
